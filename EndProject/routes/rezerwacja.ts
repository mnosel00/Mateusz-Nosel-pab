import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import { appendFile } from "fs";

const Rezerwacja = require("../models/rezerwacjaSchema");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Rezerwacja.find()
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

router.get("/getSingle/:id", (req: Request, res: Response) => {
  Rezerwacja.findById(req.params.id)
    .then((result: any) => {
      res.send(result);
    })
    .catch((err: any) => {
      res.send("Nie mamy rezerwacji o takim id w bazie");
    });
});

router.post("/addNew", (req: Request, res: Response) => {

    
    let rezerwacja = new Rezerwacja({
      stolik:req.body.stolik,
      klient:req.body.klient
      
    });
  
    rezerwacja
      .save()
      .then((result: any) => {
          
        res.send(result);
      })
      .catch((error: any) => {
        res.send("Błędne dane rezerwacji, stolik jest już zajęty" + error);
      });
  });

  export default router;