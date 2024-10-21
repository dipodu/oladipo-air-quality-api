import express from "express";
import router from "./routes";
import { handleParsing } from "./middlewares/handleParsing";

const app = express();

app.use(express.json());
app.use(handleParsing);

app.use("/api", router);

export default app;
