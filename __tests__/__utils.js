import { spawn } from "child_process";
import request from "request";

const PORT = 52012;
const GRAPHQL_ENDPOINT = "/graphql";
export const API_URL = `http://localhost:${PORT + GRAPHQL_ENDPOINT}`;

const pingService = () =>
  new Promise((resolve) => {
    request(
      {
        method: "GET",
        url: API_URL,
      },
      (error, response) => {
        if (error) {
          resolve(false);
        }
        resolve(response && response.body === "GET query missing.");
      }
    );
  });

const awaitServiceInitialize = async () => {
  let testInterval;

  return new Promise((resolve) => {
    testInterval = setInterval(async () => {
      const isServiceInitialized = await pingService();
      if (isServiceInitialized) {
        clearInterval(testInterval);
        resolve();
      }
    }, 1000);
  });
};

export const initializeService = async () => {
  console.log("Starting service...");

  const childProccess = spawn(`node`, ["./build/index.js"], {
    shell: false,
    env: {
      PORT,
      GRAPHQL_ENDPOINT,
    },
  });

  childProccess.stdout.on("data", (data) => console.log(data.toString()));
  childProccess.stderr.on("data", (data) => console.log(data.toString()));

  await awaitServiceInitialize();

  console.log(`Service is running | pid ${childProccess.pid}`);

  return childProccess;
};

export const destroyService = (childProccess) => {
  console.log(`Destroying service | pid ${childProccess.pid}`);
  if (childProccess) {
    childProccess.kill();
  }
};
