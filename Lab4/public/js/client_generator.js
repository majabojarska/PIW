// Generator klientow

import {
  NewGenerationParamsEvent,
  NewClientJobGeneratedEvent,
} from "/js/events.js";

onmessage = function (e) {
  console.log("ClientGenerator received: " + JSON.stringify(e.data));
  switch (e.data.name) {
    case "NewGenerationParamsEvent":
      clientGeneratorWorker.setGenerationParams(e.data.generationParams);
      if (!clientGeneratorWorker.isRunning) {
        console.log("Starting clientGeneratorWorker");
        clientGeneratorWorker.run();
      }
      break;
    default:
      break;
  }
};

class ClientJob {
  constructor(clientId, duration) {
    this.clientId = clientId;
    this.duration = duration;
  }
}

class ClientGenerator {
  constructor() {
    this.isJoinRequested = false;
    this.isRunning = false;
    this.generatedClientCount = 0;
    this.generationParams = {};

  }

  async run() {
    console.log("Called run() in ClientGenerator");
    if (this.isRunning){
        throw "This ClientGenerator is already running.";
    }
    this.isRunning = true;
    while (!this.isJoinRequested) {
      const newClientJob = this.getNewClientJob();
      postMessage(new NewClientJobGeneratedEvent(newClientJob));
      this.generatedClientCount++;

      const sleepTime = this.getRandomSleepDuration();
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
  }

  getRandomSleepDuration() {
    return (
      exponentialDistribution(
        randomUniform(0, 1.0),
        this.generationParams.lambda
      ) * 1000
    );
  }

  getRandomJobDuration() {
    return normalDistribution(
      randomUniform(0, 1.0),
      this.generationParams.mean,
      this.generationParams.stddev
    );
  }

  getNewClientJob() {
    const jobDuration = this.getRandomJobDuration();
    const clientId = this.generatedClientCount;
    const newClientJob = new ClientJob(clientId, jobDuration);
    return newClientJob;
  }

  setGenerationParams(generationParams) {
    if ("mean" in generationParams) {
      this.generationParams.mean = generationParams.mean;
    }
    if ("stddev" in generationParams) {
      this.generationParams.stddev = generationParams.stddev;
    }
    if ("lambda" in generationParams) {
      this.generationParams.lambda = generationParams.lambda;
    }
  }
}

// Helper functions

function randomUniform(min, max) {
  return Math.random() * (max - min) + min;
}

function normalDistribution(x, mean, stddev) {
  const eulerExponent = (-1 * (x - mean) * (x - mean)) / (2 * stddev * stddev);
  const firstBlock = 1 / (stddev * Math.sqrt(2 * Math.PI));
  return firstBlock * Math.exp(eulerExponent);
}

function exponentialDistribution(x, lambda) {
  if (x < 0) {
    return 0;
  }
  return lambda * Math.exp(-1 * lambda * x);
}

let clientGeneratorWorker = new ClientGenerator();
