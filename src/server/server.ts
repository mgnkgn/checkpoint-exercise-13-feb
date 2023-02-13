import express from "express";
import { Request, Response } from "express";

import cors from "cors";

const app: express.Application = express();

app.use(cors());

const port: number = 3001;

const getAll = (req: Request, res: Response) => {
  res.json(myDb);
};

const create = (req: Request, res: Response) => {
  console.log(req.body);
  const receivedText = req.body.text;

  myDb.push({ id: myDb.length + 1, text: receivedText, timestamp: Date.now() });

  res.status(201).json({ msg: "Successfully added." });
};

const deleteById = (req: Request, res: Response) => {
  const receivedId = req.params.id;
  const newDb = myDb.filter((el) => el.id !== +receivedId);
  myDb = newDb;
  console.log(myDb);

  res.json({ msg: "Successfully deleted." });
};

const updateById = (req: Request, res: Response) => {
  const receivedId = req.params.id;
  const incomingText = req.body.text;
  const newDb = myDb.map((el) =>
    el.id === +receivedId ? [...myDb, (el.text = incomingText)] : el
  );
  // myDb = newDb;
};

let myDb = [
  { id: 1, text: "Dummy text", timestamp: Date.now() },
  { id: 2, text: "Dummy text 2", timestamp: Date.now() },
];

app.get("/api/posts", getAll);

app.post("/api/posts", create);

app.delete("/api/posts/:id", deleteById);

app.put("/api/posts/:id", updateById);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
