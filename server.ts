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

app.post("/create/project", async (req, res) => {
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

app.post("/update/project/relations", async (req, res) => {});
app.post("/update/project/informations", async (req, res) => {});
app.post("/update/project/contributors", async (req, res) => {});
app.post("/update/project/locations", async (req, res) => {});
app.post("/update/project/licenses", async (req, res) => {});

app.listen(3000, () => console.log("Server running on port 3000"));
