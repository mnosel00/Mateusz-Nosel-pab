import { notStrictEqual } from "assert";
import express from "express";
import { Request, Response } from "express";
import { title } from "process";

const app = express();

app.use(express.json());

interface Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: any[];
  id?: number;
}

let notatka: Note[] = [
  {
    title: "a",
    content: "a",
    createDate: "16-02-2022",
    tags: ["a", "b", "c"],
    id: 1,
  },
  {
    title: "b",
    content: "b",
    createDate: "17-02-2022",
    tags: ["d", "e", "f"],
    id: 2,
  },
];

app.get("/note/:id", function (req: Request, res: Response) {
  
    var ID = req.params.id;
    const IDnumber = +ID;

    for (const item of notatka) {
      if (item.id == IDnumber) {
        res.status(200).send(item);
      }
    }
 
});

app.post("/note", function (req: Request, res: Response) {
 
    // var counter = 1;
    // for (var i = 0; i < notatka.length; i++) {
    //   counter++;
    // }
    const note = req.body;
    const date = new Date()
    date.toISOString();
    note.date = date
    note.id = Date.now().toString()
    notatka.push(note);
    //res.send(note.id)
    res.status(200).send(note.id);
  
});

app.delete("/note/:id", (req, res) => {
  const { id } = req.params;
  const ID = +id;

  notatka = notatka.filter((note) => note.id !== ID); //true trzyma w tablicy

  res.send("poszedł w piach");
});

app.put("/note/:id", (req, res) => {
  const { id } = req.params;
  const ID = +id;

  const { title, content, createDate, tags } = req.body;

  const note = notatka.find((note) => note.id === ID);

  function validateToken(note: any) {
    return note;
  }

  validateToken(note as any);

  if (title) {
    note!.title = title;
  }

  if (content) {
    note!.content = content;
  }

  if (createDate) {
    note!.createDate = createDate;
  }

  if (tags) {
    note!.tags = tags;
  }

  res.send(note);
});

app.listen(3000);
