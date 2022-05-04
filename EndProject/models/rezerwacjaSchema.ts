const mongooseRezerwacja = require("mongoose");
const SchemaRezerwacja = mongooseRezerwacja.Schema;

let rezerwacjaSchema = new SchemaRezerwacja(
  {
    stolik: [
      {
        type: SchemaRezerwacja.Types.ObjectId,
        ref: "Stolik",
      },
    ],
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
