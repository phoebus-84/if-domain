import console from "console";
import cors from "cors";
import express from "express";
import acceptContributionHandler from "./handlers/acceptContributionHandler";
import claimHandler from "./handlers/claimHandler";
import { handleProjectCreation } from "./handlers/createProjectHandler";
import declineContributionHandler from "./handlers/declineContributionHandler";
import {
  updateContributors,
  updateDeclarations,
  updateLicenses,
  updateRelations,
} from "./handlers/updateProjectHandler";
import verifyOwnership from "./tools/verifyOwnership";
import verifySignature from "./tools/verifySignature";
require("dotenv").config({ path: "./.env.local" });

const app = express();
app.use(cors());
app.use(express.text());
app.use(async (req, res, next) => {
  const zenflowsId = req.headers["zenflows-id"] as string;
  const zenflowsSign: string = req.headers["zenflows-sign"] as string;
  if (!zenflowsId || !zenflowsSign) {
    res.status(401).send("Unauthorized");
  }

  const itWorks = true;
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

app.post("/project/:id/update/licenses", async (req, res) => {
  let variables;
  variables = JSON.parse(req.body);
  const projectId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  const ownership = await verifyOwnership(projectId, userId);
  if (!ownership[0]) {
    res.status(401).send("Unauthorized: Errors:" + ownership[1]);
  }
  // variables.userId = "0637V2EY26ZPWK87EZMJTF0034";
  try {
    const response = await updateLicenses(projectId, variables, userId);
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
app.post("/project/:id/update/declarations", async (req, res) => {
  let declarations;
  declarations = JSON.parse(req.body);
  const projectId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  const ownership = await verifyOwnership(projectId, userId);
  if (!ownership[0]) {
    res.status(401).send("Unauthorized: Errors:" + ownership[1]);
  }

  try {
    const response = await updateDeclarations(projectId, declarations, userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/project/:id/update/contributors", async (req, res) => {
  let contributors;
  contributors = JSON.parse(req.body);
  const projectId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  const ownership = await verifyOwnership(projectId, userId);
  if (!ownership[0]) {
    res.status(401).send("Unauthorized: Errors:" + ownership[1]);
  }
  try {
    const response = await updateContributors(projectId, contributors, userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/project/:id/update/relations", async (req, res) => {
  let relations;
  relations = JSON.parse(req.body);
  const projectId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  const ownership = await verifyOwnership(projectId, userId);
  if (!ownership[0]) {
    res.status(401).send("Unauthorized: Errors:" + ownership[1]);
  }
  try {
    const response = await updateRelations(projectId, relations, userId);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/project/:id/update/locations", async (req, res) => {});
app.post("/project/:id/propose/contribution", async (req, res) => {
  const projectId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  try {
    const response = await proposeContributionHandler(
      projectId,
      userId,
      req.body
    );
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/resource/:id/claim", async (req, res) => {
  const resource = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  try {
    const response = await claimHandler(resource, userId, req.body);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
app.post("/proposal/:id/accept", async (req, res) => {
  const proposalId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  try {
    const response = await acceptContributionHandler(proposalId, userId);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.post("/proposal/:id/decline", async (req, res) => {
  const proposalId = req.params.id;
  const userId = req.headers["zenflows-id"] as string;
  try {
    const response = await declineContributionHandler(proposalId, userId);
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
function proposeContributionHandler(
  projectId: string,
  userId: string,
  body: any
) {
  throw new Error("Function not implemented.");
}
