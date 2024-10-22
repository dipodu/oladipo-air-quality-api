import app from "./app";
import { loadData } from "./utils/loadData";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await loadData();
  app.listen(PORT, () => {
    console.log(
      `Magic happening on port ${PORT}! The server is alive... it's ALIVE!`
    );
  });
}

startServer();
