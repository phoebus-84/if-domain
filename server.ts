import cors from "cors";
import express from "express";
import { zenroom_exec } from "zenroom";
import { handleProjectCreation } from "./handlers/createProjectHandler";
import verifyGraphql from "./zenflows-crypto/src/verifyGraphql";

const app = express();
app.use(cors());
app.use(express.text());
app.use(async (req, res, next) => {
  const zenflowsId = req.headers["zenflows-id"];
  const zenflowsSign = req.headers["zenflows-sign"];
  if (!zenflowsId || !zenflowsSign) {
    res.status(401).send("Unauthorized");
  }
  // const zenflowsPublicKey = "2S8qn196efFgyrC1dYms6UkkhCnweYM6DJhLgd3kuPEm";

  // const zenroomData = JSON.stringify({
  //   gql: Buffer.from(req.body, "base64"),
  //   "eddsa signature": zenflowsSign,
  //   "eddsa public key": zenflowsPublicKey,
  // });
  // const keys = JSON.stringify({ "eddsa public key": zenflowsPublicKey });
  // const check = await zenroom_exec(verifyGraphql, {
  //   data: zenroomData,
  //   keys: keys,
  // });
  // if (check.logs.length > 0) {
  //   console.log(check.logs);
  //   res.status(500).send("zenroom error: " + check.logs);
  // }
  // if (check.result !== "1") {
  //   res.status(401).send("Unauthorized");
  // }
  next();
});

app.post("/create/project", async (req, res) => {
  const variables = req.body;
  try {
    const response = await handleProjectCreation(JSON.parse(variables));
    res.send(response);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
