import express, { Router } from "express";
import { createValidator, ExpressJoiInstance } from "express-joi-validation";
import { insertRecordValidator,createNotesValidator,createUsersValidator } from "../validators/Zoho.validator";
import { insertRecordController,createNotesController,createUsersController } from "../controllers/Zoho.controller";

const validator: ExpressJoiInstance = createValidator({});

const zohoRouter: Router = express.Router();

zohoRouter.post(
  "/insert/record",
  validator.body(insertRecordValidator),
  insertRecordController
);


zohoRouter.post(
  "/create/notes/:record_id",
  validator.body(createNotesValidator),
  createNotesController
);


zohoRouter.post(
  "/create/user",
  validator.body(createUsersValidator),
  createUsersController
);

export default zohoRouter;
