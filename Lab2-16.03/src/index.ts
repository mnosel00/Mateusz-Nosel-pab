import { notStrictEqual } from "assert";
import express from "express";
import e, { Request, Response } from "express";
import { write } from "fs";
import { title } from "process";


require("dotenv").config();
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

interface Tag {
  id?: number;
  name: string;
}

interface Note {
  title: string;
  content: string;
  createDate?: string;
  tags?: Tag[];
  id?: number;
  //user?: Login[];
}

interface Login {
  login: string;
  password: string;

  id?: number;
}

let tags: Tag[] = [];
let notatka: Note[] = [];

let users: Login[] = [
  {
    login: "a",
    password: "1"
  },
  {
    login: "b",
    password:"2"
  }
 
];
async function Read(): Promise<void> {
  var fs = require("fs");

  var data = await fs.readFileSync("./data/notatka.json");
  var data2 = await fs.readFileSync("./data/tag.json");

  notatka = JSON.parse(data);
  tags = JSON.parse(data2)

  //console.log(notatka);
  //console.log(tags)
}

async function Write(): Promise<void> {
  var fs = require("fs");

 await  fs.writeFileSync("./data/notatka.json", JSON.stringify(notatka));
  await fs.writeFileSync("./data/tag.json", JSON.stringify(tags));
}



app.get("/users",auth,function (req, res) {
  
  res.send(users.filter(x => x.login === req.body.login));
});

app.post("/login", async function (req, res) {
  const login = req.body.login;
  const password = req.body.password;

  let user:Login = {
    login:login,
    password:password
  }

    const token = jwt.sign(user,process.env.JWT_KEY)
    res.send({token:token});
  
});

function auth(req:any,res:any,next:any) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]

  if (token==null) 
  {
    return res.sendStatus(401);
  }

  jwt.verify(token,process.env.JWT_KEY, (err:any,user:any) =>{
    if(err)
    {
      return res.sendStatus(403)
    }
    req.user = user;
    next();
  })
}





//////////////////////////////// API do Tag
app.get("/tags", function (req, res) {
  Read();
  res.send(tags);
});

app.post("/tag", async function (req, res) {
  await Read();
  if (req.body.name) {
    const name = req.body.name.toLowerCase();
    var a = name.toLowerCase();

    const tagFind = tags.find((name) => name.name === a);

    if (tagFind) {
      res.status(404).send("Notatka o taiej nazwie już istnieje");
    } else {
      let tag: Tag = {
        name: req.body.name,
        id: Date.now(),
      };

      tags.push(tag);
      res.status(200).send(tag);
      await Write();
    }
  } else {
    res.status(404).send("nie utworzono ");
  }

  //}
});

app.delete("/tag/:id", async function (req, res) {
  await Read();
  const { id } = req.params;
  const ID = +id;
  tags = tags.filter((tag) => tag.id !== ID); //true trzyma w tablicy
  await Write();
  res.send("poszedł w piach");
});

app.put("/tag/:id", async function (req, res) {
  await Read();
  const { id } = req.params;
  const ID = +id;
  const name = req.body.name;

  name.toLowerCase();

  const tag = tags.find((note) => note.id === ID);

  if (name) {
    tag!.name = name;
  }
  res.send(tag);
  await Write();
});

//////////////////////////////// API do Note
app.get("/notes", async function (req, res) {
  await Read();
  res.send(notatka);
});
app.get("/note/:id", async function (req: Request, res: Response) {
  await Read();
  const note = notatka.find((note) => note.id ===parseInt(req.params.id))

  var ID = req.params.id;
  const IDnumber = +ID;

  // for (const item of ) {
  //   if (item.id == IDnumber && ID != null) {
  //     res.status(200).send(item);
  //   } else {
  //     res.status(404).send("Nie ma notatki z takim idkiem");
  //   }
  // }
  if(note){
    res.status(200).send(note);
  }else{
    res.status(404).send("Nie ma notatki z takim idkiem");
  }
});

app.post("/note", async function (req: Request, res: Response) {
  await Read();
  if (req.body.title && req.body.content) {
    let note: Note = {
      title: req.body.title,
      content: req.body.content,
      createDate: new Date().toISOString(),
      tags: req.body.tags,
      id: Date.now(),
    };

    let tag: Tag = {
      id: Date.now(),
      name: req.body.tags,
    };

    var idToString = note.id!.toString();

    if (tag.name === undefined) {
      tag = {
        id: Date.now(),
        name: "Default",
      };
    }

    const name = tag.name.toString().toLowerCase();
    let tagNameToLowerCase = name.toLowerCase();

    const tagFind = tags.find((x) => x.name === tagNameToLowerCase);

    if (tagFind || tagNameToLowerCase === "default") {
      notatka.push(note);
      await Write();
      // res.status(404).send("Notatka o taiej nazwie już istnieje");
    } else {
      tags.push(tag);
      notatka.push(note);

      await Write();
    }

    res.status(200).send(idToString);
  } else {
    res.status(404).send("nie utworzono i elo");
  }
});

app.delete("/note/:id", async (req, res) => {
  await Read();
  const { id } = req.params;
  const ID = +id;

  notatka = notatka.filter((note) => note.id !== ID); //true trzyma w tablicy
  await Write();
  res.send("poszedł w piach");
});

app.put("/note/:id",async (req, res) => {
  await Read();
  const { id } = req.params;
  const ID = +id;

  const { title, content, createDate, tags } = req.body;

  const note = notatka.find((note) => note.id === ID);
  if (note == null) {
    res.status(404).send("nie odnaleziono notatki");
  } else {
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
    await Write();
  }
});

app.listen(3000);
