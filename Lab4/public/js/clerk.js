// Urzednik
import {
  ClerkAvailableEvent,
  ClerkBusyEvent,
} from "/js/events.js";

onmessage = async function (e) {
  console.log("Clerk ${clerk.id} received: " + JSON.stringify(e.data));
  switch (e.data.name) {
    case "ClerkCreateEvent":
      clerk = new Clerk(e.data.clerkId);
      this.postMessage(new ClerkAvailableEvent(clerk));
      break;
    case "SentClientJobToHandleEvent":
      if (clerk === undefined) {
        throw "NewClientJobGeneratedEvent sent to uninitialized clerk.";
      }
      const job = e.data.clientJob;

      this.postMessage(new ClerkBusyEvent(clerk, job));
      await clerk.handleClientJob(job);
      this.postMessage(new ClerkAvailableEvent(clerk, job));
      break;
    default:
      break;
  }
};

var clerk;

class Clerk {
  constructor(id) {
    this.id = id;
  }

  async handleClientJob(clientJob) {
    await new Promise((r) => setTimeout(r, clientJob.duration * 1000));
  }
}
