import cors from "cors";
import express from "express";
import { handleProjectCreation } from "./handlers/createProjectHandler.js";
import {zenroom_exec} from "zenroom";
import {verifyGraphql} from "./zenflows-crypto/verifyGraphql.js";

const app = express();
app.use(cors());
app.use(express.text());
app.use((req, res, next) => {
  const zenflowsId = req.headers["zenflows-id"];
  const zenflowsSign = req.headers["zenflows-sign"];
  if (!zenflowsId || !zenflowsSign) {
    res.status(401);
    res.send("Unauthorized");
  } 
  const zenroomVariables = {
    gql: req.body,
    zenflowsSign: zenflowsSign,
  };
  const check = zenroom_exec(verifyGraphql, zenroomVariables);
  if (check !== "1") {
    res.status(401);
    res.send("Unauthorized");
  }
  next();
});

app.post("/create/project", async (req, res) => {
  const variables = req.body;
  try {
    const response = await handleProjectCreation(JSON.parse(variables));
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500);
    res.send(error);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
