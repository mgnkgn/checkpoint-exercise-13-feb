import express from "express";
import { Request, Response } from "express";

import cors from "cors";

const app: express.Application = express();
app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const port: number = 3001;

interface Text {
  id: number;
  text: string;
  timestamp: number;
}

let myDb: Text[] = [
  { id: 1, text: "Dummy text", timestamp: Date.now() },
  { id: 2, text: "Dummy text 2", timestamp: Date.now() },
];

const getAll = (req: Request, res: Response) => {
  res.json(myDb);
};

const create = (req: Request, res: Response) => {
  console.log(req.body);
  const receivedText = req.body.text;

  myDb.push({ id: myDb.length + 1, text: receivedText, timestamp: Date.now() });
  console.log(myDb);

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
  const incomingText: string = req.body.text;
  myDb = myDb.map((el) =>
    el.id === +receivedId ? { ...el, text: incomingText } : el
  );
};

app.get("/api/posts", getAll);

app.post("/api/posts", create);

app.delete("/api/posts/:id", deleteById);

app.put("/api/posts/:id", updateById);

app.listen(3001, () => {
  console.log(`Server running on http://localhost:3001/`);
});
