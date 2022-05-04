import express from "express";
import { Request, Response } from "express";
import bodyParser from "body-parser";
import stolikiRoutes from "../routes/stoliki";
import restauracjeRoutes from "../routes/restauracje"
import pracownikRoutes from "../routes/pracownik"

const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

const dbURI =
  "mongodb+srv://mnosel00:tnTpYzbhZl4KLelk@endapp.mznzj.mongodb.net/EndAppDb?retryWrites=true&w=majority";

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result:any) => console.log("Connected to Mongoose: " + app.listen(3000)))
    .catch((err:any) => console.log("Failed to connect to Mongoose: " + err))

app.use(bodyParser.json());

app.use("/stoliki", stolikiRoutes);
app.use("/restauracje", restauracjeRoutes);
app.use("/pracownicy", pracownikRoutes);


app.get("/", function (req: Request, res: Response) {
  res.send("Witaj w API restauracji");
});


