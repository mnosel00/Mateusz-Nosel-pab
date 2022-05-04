import { timeStamp } from "console";

const mongooseRezerwacja = require("mongoose");
const SchemaRezerwacja = mongooseRezerwacja.Schema;

let rezerwacjaSchema = new SchemaRezerwacja(
  {
    stolik: String ,
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    klient: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Rezerwacja = mongooseRezerwacja.model("Rezerwacja", rezerwacjaSchema);
module.exports = Rezerwacja;
