import app from "./app";
import { server_log } from "./utils/logger";

//connection
const PORT = process.env.NODE_ENV === "test" ? 3000 : process.env.PORT;

app.listen(PORT, async () => {
  try {
    server_log.info(`Listening on Port ${PORT}`);
  } catch (error: any) {
    server_log.error(error);
  }
});
