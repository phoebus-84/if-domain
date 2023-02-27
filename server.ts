require("dotenv").config({ path: "./.env.local" });
import cors from "cors";
import express from "express";
import { handleProjectCreation } from "./handlers/createProjectHandler";
import verifySignature from "./tools/verifySignature";

const app = express();
app.use(cors());
app.use(express.text());
app.use(async (req, res, next) => {
  const zenflowsId = req.headers["zenflows-id"] as string;
  const zenflowsSign: string = req.headers["zenflows-sign"] as string;
  if (!zenflowsId || !zenflowsSign) {
    res.status(401).send("Unauthorized");
  }

  const itWorks = false;
  if (!itWorks) return next();

  const verifiedSignature = await verifySignature(
    zenflowsId,
    zenflowsSign,
    req.body
  );
  if (!verifiedSignature[0]) {
    res.status(401).send("Unauthorized: Errors:" + verifiedSignature[1]);
  } else {
    next();
  }
});

app.post("/project/create", async (req, res) => {
  let variables;
  variables = JSON.parse(req.body);
  variables.userId = req.headers["zenflows-id"];
  try {
    const response = await handleProjectCreation(variables);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/project/:id/update/relations", async (req, res) => {
  const projectId = req.params.id;
});
app.post("/project/:id/update/main_info", async (req, res) => {});
app.post("/project/:id/update/contributors", async (req, res) => {});
app.post("/project/:id/update/locations", async (req, res) => {});
app.post("/project/:id/update/licenses", async (req, res) => {});
app.post("/project/:id/update/declarations", async (req, res) => {});
app.post("/project/:id/propose/contribution", async (req, res) => {});
app.post("/resource/:id/claim", async (req, res) => {});

app.listen(3000, () => console.log("Server running on port 3000"));
