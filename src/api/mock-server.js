import { createServer, Model, RestSerializer } from "miragejs";
import { data } from "../Database/data";
export const initialiseMockServer = () => {
  createServer({
    serializers: {
      application: RestSerializer
    },
    models: {
      video: Model
    },
    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("videos");
    },
    seeds(server) {
      data.forEach((item) => {
        server.create("video", item);
      });
    }
  });
};
