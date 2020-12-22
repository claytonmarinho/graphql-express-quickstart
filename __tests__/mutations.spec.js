import { initializeService, destroyService, API_URL } from "./__utils";
import { GraphQLClient } from "graphql-request";

let service;
let client;

const init = async () => {
  service = await initializeService();
  client = new GraphQLClient(API_URL, { headers: {} });
};

const destroy = () => destroyService(service);

describe("Mutations", () => {
  beforeAll(init);
  afterAll(destroy);

  it("Gets mutation response", async () => {
    const response = await client.request(
      `
      mutation($name: String!) {
        foo(name: $name)
      }
    `,
      {
        name: "clayton",
      }
    );

    expect(response).toEqual({
      foo: "clayton",
    });
  });
});
