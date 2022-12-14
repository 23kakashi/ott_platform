import { App } from "./app";

//connection
const PORT = process.env.NODE_ENV === "test" ? 3000 : process.env.PORT;
const server = new App();
server.connection.listen(PORT, async () => {
  try {
    // log.info(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    // log.error("Internal Server Error");
  }
});
