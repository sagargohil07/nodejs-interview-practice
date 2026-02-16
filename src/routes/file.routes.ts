import { Router } from "express";

import fileController from "../controller/files.controller";

const fileRoutes = Router();

fileRoutes.get("/", (_req, res) => {
  res.send("File router root works!");
});

fileRoutes.get("/csv/insert-records", fileController.cvsImporting);

export default fileRoutes;
