const mongooseRezerwacja = require("mongoose");
const SchemaRezerwacja = mongooseRezerwacja.Schema;

let rezerwacjaSchema = new SchemaRezerwacja(
  {
    stolik: [
      {
        type: SchemaRezerwacja.Types.ObjectArray,
        ref: "Stolik",
      },
    ],
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
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
