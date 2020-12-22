import { initializeService, destroyService, API_URL } from "./__utils";
import { GraphQLClient } from "graphql-request";

let service;
let client;

const init = async () => {
  service = await initializeService();
  client = new GraphQLClient(API_URL, { headers: {} });
};

const destroy = () => destroyService(service);

describe("Queries", () => {
  beforeAll(init);
  afterAll(destroy);

  it("Gets query response", async () => {
    const response = await client.request(
      `
      query {
        hello
      }
    `
    );

    expect(response).toEqual({
      hello: "world",
    });
  });
});
