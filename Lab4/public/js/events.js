// Events

class GenericEvent {
  constructor() {}
  setName(name) {
    this.name = name;
  }
}

export class NewClientQueueStateEvent extends GenericEvent {
  constructor(clientQueue) {
    super();
    this.setName(this.constructor.name);
    this.clientQueue = clientQueue;
  }
}

export class NewClientJobGeneratedEvent extends GenericEvent {
  constructor(clientJob) {
    super();
    this.setName(this.constructor.name);
    this.clientJob = clientJob;
  }
}

export class ClientRejectedEvent extends GenericEvent {
  constructor(client) {
    super();
    this.setName(this.constructor.name);
    this.client = client;
  }
}

export class ClientAcceptedEvent extends GenericEvent {
  constructor(client) {
    super();
    this.setName(this.constructor.name);
    this.client = client;
  }
}

export class NewClientQueueParamsEvent extends GenericEvent {
  constructor(queueParams) {
    super();
    this.setName(this.constructor.name);
    this.queueParams = queueParams;
  }
}

export class NewGenerationParamsEvent extends GenericEvent {
  constructor(generationParams) {
    super();
    this.setName(this.constructor.name);
    this.generationParams = generationParams;
  }
}

export class ClerkCreateEvent extends GenericEvent {
  constructor(clerkId) {
    super();
    this.setName(this.constructor.name);
    this.clerkId = clerkId;
  }
}

export class ClerkAvailableEvent extends GenericEvent {
  constructor(clerk, finishedClientJob = undefined) {
    super();
    this.setName(this.constructor.name);
    this.clerk = clerk;
    this.finishedClientJob = finishedClientJob;
  }
}
export class ClerkBusyEvent extends GenericEvent {
  constructor(clerk, clientJob = undefined) {
    super();
    this.setName(this.constructor.name);
    this.clerk = clerk;
    this.clientJob = clientJob;
  }
}

export class SentClientJobToHandleEvent extends GenericEvent {
  constructor(clientJob) {
    super();
    this.setName(this.constructor.name);
    this.clientJob = clientJob;
  }
}
