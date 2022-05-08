const mongooseProdukt = require("mongoose");
const SchemaProdukt = mongooseProdukt.Schema;

let produktSchema = new SchemaProdukt(
  {
    nazwa: {
      type: String,
      required: true,
    },
    cena: {
      type: String,
      required: true,
    },
    ilosc: {
      type: Number,
      required: true,
    },
    jednostkaMiaru: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Produkt = mongooseProdukt.model("Produkt", produktSchema);
module.exports = Produkt;
