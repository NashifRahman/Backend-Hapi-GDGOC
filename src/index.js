import Hapi from "@hapi/hapi";
import { routesBook } from "./routesBook.js";

const init = async () => {
  const server = Hapi.server({
    host: "localhost",
    port: 9000,
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
