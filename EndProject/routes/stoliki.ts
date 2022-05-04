import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { appendFile } from "fs";

const Stolik = require("../models/stolikSchema");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Stolik.find()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

router.get("/getSingle/:id", (req: Request, res: Response) => {
  Stolik.findById(req.params.id)
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      res.send("Nie mamy stolika o takim id w bazie");
    });
});

router.post("/addNew", (req: Request, res: Response) => {
  let stolik = new Stolik({
    nazwa: req.body.nazwa,
    iloscOsob: req.body.iloscOsob,
    status: req.body.status,
  });

  stolik
    .save()
    .then((result: any) => {
      res.send(result);
    })
    .catch((error: any) => {
      res.send("Błędne dane stolika, proszę poprawić status oraz sprawdzić format wprowadzonych danych");
    });
});

router.put("/updateSingle/:id", (req: Request, res: Response) => {
  Stolik.findByIdAndUpdate(req.params.id, req.body, {new:true})
    .then((result: any) => {
      res.send(result);
    })
    .catch((error: any) => {
      res.send("Nie mamy stolika o takim id w bazie")
    });
});

router.delete("/deleteSingle/:id", (req: Request, res: Response) => {
  Stolik.findByIdAndRemove(req.params.id)
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      res.send("stolika o takim id nie ma w bazie lub został wcześniej usunięty")
    });
});

export default router;
