import express, { Request, Response, urlencoded, NextFunction } from "express";
import { router } from "./routes/index";
import { PORT } from "./config";
import { APIError } from "./utilities/APIError";
import { NOT_FOUND } from "./utilities/errorConstants";
import { errorHandler } from "./middlewares/errorMiddleware";
const app = express();


app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new APIError(404, NOT_FOUND));
});

app.use(errorHandler);
 
app.listen(PORT, (): void => {
  console.log(`server started on the port ${PORT}`)
});

