import Hapi from "@hapi/hapi";
import { routesBook } from "./routesBook.js";

const init = async () => {
  const server = Hapi.server({
    host: "0.0.0.0",
    port: process.env.PORT || 9000,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routesBook);
  await server.start();
  console.log(`Server Berjalan pada port: ${server.info.uri}`);
};

init();
