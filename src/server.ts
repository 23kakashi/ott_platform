import app from "./app";
import { log } from "./utils/logger";

//connection
const PORT = process.env.NODE_ENV === "test" ? 3000 : process.env.PORT;

app.listen(PORT, async () => {
  try {
    log.info(`server is istening on Port ${PORT}`);
  } catch (error) {
    log.error("connection to server failed", error);
  }
});
