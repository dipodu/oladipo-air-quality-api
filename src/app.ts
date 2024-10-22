import express from "express";
import router from "./routes";
import { handleParsing, errorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(handleParsing);
app.use("/", router);
app.use(errorHandler);

export default app;
