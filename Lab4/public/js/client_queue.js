// Kolejka klientow
import {
  ClientRejectedEvent,
  NewClientQueueStateEvent,
  ClientAcceptedEvent,
  SentClientJobToHandleEvent,
} from "/js/events.js";

class ClientQueue {
  // FIFO queue

  constructor() {
    this.queueParams = { capacity: 0 };
    this.array = []; // [tail, ..., head]
  }

  push(client) {
    if (this.array.length < this.queueParams.capacity) {
      this.array.unshift(client);
      return true;
    }
    return false;
  }

  pop() {
    return this.array.pop();
  }

  setParams(queueParams) {
    this.queueParams = queueParams;
    this.array = this.array.slice(
      this.array.length - this.queueParams.capacity
    );
  }
}

let clientJobQueue = new ClientQueue();

onmessage = function (e) {
  console.log("ClientQueue received: " + JSON.stringify(e.data));
  switch (e.data.name) {
    case "NewClientJobGeneratedEvent":
      {
        const isClientJobAdded = clientJobQueue.push(e.data.clientJob);
        if (!isClientJobAdded) {
          this.postMessage(new ClientRejectedEvent(e.data.clientJob));
        } else {
          this.postMessage(new ClientAcceptedEvent(e.data.clientJob));
          // }
          this.postMessage(new NewClientQueueStateEvent(clientJobQueue));
        }
      }
      break;
    case "ClerkAvailableEvent":
      {
        const poppedClient = clientJobQueue.pop();
        this.postMessage(new SentClientJobToHandleEvent(poppedClient));
        this.postMessage(new NewClientQueueStateEvent(clientJobQueue));
      }
      break;
    case "NewClientQueueParamsEvent":
      {
        clientJobQueue.setParams(e.data.queueParams);
        this.postMessage(new NewClientQueueStateEvent(clientJobQueue));
      }
      break;
    default:
      break;
  }
};
