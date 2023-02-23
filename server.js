import cors from "cors";
import express from "express";
import { handleProjectCreation } from "./handlers/createProjectHandler.js";

const app = express();
app.use(cors());
app.use(express.text());

app.post("/create/project", async (req, res) => {
  const variables = req.body;
  console.log(variables);
  try {
    const response = await handleProjectCreation(JSON.parse(variables));
    res.send(response);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
