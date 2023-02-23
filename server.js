import express, { json } from 'express';
import cors from 'cors';
import { handleProjectCreation } from './createProjectHandler.js';
import bodyParser from 'body-parser'


const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(json());
app.use(cors())
app.use(express.text())

app.post('/create/project', async (req, res) => {
  console.log('create project', req);
  const variables = req.body;
  console.log(variables);
  try {
    const response = await handleProjectCreation(JSON.parse(variables))
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
