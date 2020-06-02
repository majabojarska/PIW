import {
  NewClientQueueParamsEvent,
  ClerkCreateEvent,
  NewGenerationParamsEvent,
  ClerkAvailableEvent,
} from "/js/events.js";

// Create global variables
let clientGeneratorWorker;
let clientQueueWorker;
let clerkAWorker;
let clerkBWorker;
let clerkCWorker;

let clerkWorkerJobCache;

let clerkWorkerPriorityOrder;
let idToClerkWorkerMap;

let clientJobAcceptedCount;
let clientJobRejectedCount;
let clientJobHandledCount;

// Start simulation on load
window.addEventListener("load", () => {
  init();
});

// Listeners
document.getElementById(
  "input-queue-capacity"
).onchange = updateClientQueueParams;

function updateClientQueueParams() {
  const domElement = document.getElementById("input-queue-capacity");
  var newCapacity = parseFloat(domElement.value);
  console.log(newCapacity);

  if (isNaN(newCapacity) || !Number.isInteger(newCapacity)) {
    alert("Niepoprawna wartość pojemności kolejki, podaj liczbę całkowitą.");
  } else {
    clientQueueWorker.postMessage(
      new NewClientQueueParamsEvent({ capacity: newCapacity })
    );
  }
}

document.getElementById("input-normal-dist-mean").onchange = updateMean;

function updateMean() {
  const domElement = document.getElementById("input-normal-dist-mean");
  const newMean = parseFloat(domElement.value);
  if (isNaN(newMean)) {
    alert("Niepoprawna wartość średniej, podaj liczbę.");
  } else {
    clientGeneratorWorker.postMessage(
      new NewGenerationParamsEvent({ mean: newMean })
    );
  }
}

document.getElementById("input-normal-dist-stddev").onchange = updateStddev;

function updateStddev() {
  const domElement = document.getElementById("input-normal-dist-stddev");
  const newStddev = parseFloat(domElement.value);
  if (isNaN(newStddev)) {
    alert("Niepoprawna wartość odchylenia standardowego, podaj liczbę.");
  } else {
    clientGeneratorWorker.postMessage(
      new NewGenerationParamsEvent({ stddev: newStddev })
    );
  }
}

document.getElementById("input-exp-dist-lambda").onchange = updateLambda;

function updateLambda() {
  const domElement = document.getElementById("input-exp-dist-lambda");
  const newLambda = parseFloat(domElement.value);
  if (isNaN(newLambda)) {
    alert("Niepoprawna wartość lambda, podaj liczbę.");
  } else {
    clientGeneratorWorker.postMessage(
      new NewGenerationParamsEvent({ lambda: newLambda })
    );
  }
}

function init() {
  // Initialize workers
  clientGeneratorWorker = new Worker("/js/client_generator.js", {
    type: "module",
  });
  updateMean();
  updateStddev();
  updateLambda();

  clientQueueWorker = new Worker("/js/client_queue.js", {
    type: "module",
  });
  updateClientQueueParams();

  clerkAWorker = new Worker("/js/clerk.js", { type: "module" });
  clerkBWorker = new Worker("/js/clerk.js", { type: "module" });
  clerkCWorker = new Worker("/js/clerk.js", { type: "module" });

  clerkAWorker.postMessage(new ClerkCreateEvent("A"));
  clerkBWorker.postMessage(new ClerkCreateEvent("B"));
  clerkCWorker.postMessage(new ClerkCreateEvent("C"));

  // Attach workers to EventBroker
  clientGeneratorWorker.onmessage = handleEvent;
  clientQueueWorker.onmessage = handleEvent;
  clerkAWorker.onmessage = handleEvent;
  clerkBWorker.onmessage = handleEvent;
  clerkCWorker.onmessage = handleEvent;

  // Initialize clerkAvailabilityCache
  clerkWorkerJobCache = new ClerkWorkerJobCache();

  clerkWorkerPriorityOrder = [clerkAWorker, clerkBWorker, clerkCWorker];
  clerkWorkerPriorityOrder.forEach((clerk) => {
    clerkWorkerJobCache.setJob(clerk, undefined);
  });
  idToClerkWorkerMap = new Map();
  idToClerkWorkerMap.set("A", clerkAWorker);
  idToClerkWorkerMap.set("B", clerkBWorker);
  idToClerkWorkerMap.set("C", clerkCWorker);

  clientJobAcceptedCount = 0;
  clientJobRejectedCount = 0;
  clientJobHandledCount = 0;

  updateClerksUI(clerkWorkerJobCache);

  console.log("Initialization finished.");
}

// Functions

function handleEvent(e) {
  console.log("Broker received: " + JSON.stringify(e.data));
  switch (e.data.name) {
    case "NewClientJobGeneratedEvent":
      clientQueueWorker.postMessage(e.data);
      break;
    case "SentClientJobToHandleEvent":
      {
        const availableClerkWorker = getAvailableClerkWorkerByPriority();
        availableClerkWorker.postMessage(e.data);
      }
      break;
    case "NewQueueParamsEvent":
      clientQueueWorker.postMessage(e.data);
      break;
    case "NewClientQueueStateEvent":
      updateClientQueueUI(e.data.clientQueue);
      break;
    case "ClerkAvailableEvent":
      {
        if (e.data.finishedClientJob !== undefined) {
          clientJobHandledCount++;
        }
        clerkWorkerJobCache.setJob(
          idToClerkWorkerMap.get(e.data.clerk.id),
          undefined
        );
        updateStatusUI(
          clientJobAcceptedCount,
          clientJobRejectedCount,
          clientJobHandledCount
        );
        updateClerksUI(clerkWorkerJobCache);

        clientQueueWorker.postMessage(e.data);
      }
      break;
    case "ClerkBusyEvent":
      {
        clerkWorkerJobCache.setJob(
          idToClerkWorkerMap.get(e.data.clerk.id),
          e.data.clientJob
        );
        updateClerksUI(clerkWorkerJobCache);
      }
      break;
    case "ClientRejectedEvent":
      {
        clientJobRejectedCount++;
        updateStatusUI(
          clientJobAcceptedCount,
          clientJobRejectedCount,
          clientJobHandledCount
        );
      }
      break;
    case "ClientAcceptedEvent":
      {
        clientJobAcceptedCount++;
        updateStatusUI(
          clientJobAcceptedCount,
          clientJobRejectedCount,
          clientJobHandledCount
        );
        if (getAvailableClerkWorkerByPriority() !== undefined) {
          clientQueueWorker.postMessage(
            new ClerkAvailableEvent(undefined, undefined)
          );
        }
      }
      break;
    case "NewGenerationParamsEvent":
      clientGeneratorWorker.postMessage(event);
      break;
    default:
      break;
  }
}

class ClerkWorkerJobCache {
  constructor() {
    this.clerkWorkerToJobMap = new Map();
  }

  setJob(clerkWorker, clientJob) {
    this.clerkWorkerToJobMap.set(clerkWorker, clientJob);
  }

  getJob(clerkWorker) {
    return this.clerkWorkerToJobMap.get(clerkWorker);
  }
}

function getAvailableClerkWorkerByPriority() {
  for (let i = 0; i < clerkWorkerPriorityOrder.length; i++) {
    const clerkWorker = clerkWorkerPriorityOrder[i];
    const jobOfClerkWorker = clerkWorkerJobCache.getJob(clerkWorker);
    if (jobOfClerkWorker == undefined) {
      return clerkWorker;
    }
  }
}

function updateClientQueueUI(clientQueue) {
  const listGroupItemArray = [];
  clientQueue.array.forEach((client) => {
    const durationRounded = Math.round(100 * client.duration) / 100;
    const itemHtml = `<div class="list-group-item">
    <h4 class="list-group-item-heading">Klient ${client.clientId}</h4>
    <p class="list-group-item-text">Czas obsługi: ${durationRounded}s</p>
  </div>\n`;
    listGroupItemArray.unshift(itemHtml);
  });
  document.getElementById(
    "client-list-group"
  ).innerHTML = listGroupItemArray.join("");
}

function updateClerksUI(clerkJobCache) {
  const elemIdToClientMap = new Map();
  elemIdToClientMap.set(
    "current_client_clerk_a",
    clerkJobCache.getJob(clerkAWorker)
  );
  elemIdToClientMap.set(
    "current_client_clerk_b",
    clerkJobCache.getJob(clerkBWorker)
  );
  elemIdToClientMap.set(
    "current_client_clerk_c",
    clerkJobCache.getJob(clerkCWorker)
  );
  for (const [domId, clientJob] of elemIdToClientMap) {
    const domElement = document.getElementById(domId);
    if (clientJob === undefined) {
      domElement.innerText = "Brak";
    } else {
      domElement.innerText = "Klient " + clientJob.clientId;
    }
  }
}

function updateStatusUI(acceptedCount, rejectedCount, handledCount) {
  const totalCount = acceptedCount + rejectedCount;
  document.getElementById(
    "status-client-count-total"
  ).innerText = totalCount.toString();
  document.getElementById(
    "status-client-count-rejected"
  ).innerText = rejectedCount.toString();
  document.getElementById(
    "status-client-count-handled"
  ).innerText = handledCount.toString();
  document.getElementById(
    "status-client-count-accepted"
  ).innerText = acceptedCount.toString();
}
