const mongoose = require("mongoose");

const { Schema } = mongoose;

const plantSchema = new mongoose.Schema({
  pflanzenart: { type: String, required: true },
  anschaffungskosten: { type: Number, required: true }, //Euro
  hoehe: { type: Number, required: true }, //cm
  // anwuchsjahre: { type: Number, default: 3 }, //Jahre
  pflegekostenProJahr: { type: Number, required: true }, //Euro
  pflegejahre: { type: Number, required: true }, //Jahre
  alter: { type: Number, required: true }, //Jahre
  engstand: { type: Number, required: true }, //Prozent
  schaeden: { type: Number, required: true }, //Prozent
  pflegemaengel: { type: Number, default: 5 }, //Prozent
  anschaffungshoehe: { type: Number, required: true }, //cm
  pflanzung: { type: Number, required: true }, //Stunden,
  risiko: { type: Number, required: true }, //Prozent
  lebenserwartung: { type: Number, required: true }, //Jahre
  funktionserfuellung: { type: Number, required: true }, //Jahre
  zwischensumme1: { type: Number }, //wird berechnet55
  zwischensummeKoch: { type: Number }, //wird berechnet
  zeitwert: { type: Number }, //wird berechnet
});

/*

(anschaffungskosten + pflanzungskosten + (pflanzung * 10) + (anwuchskostenProJahr * alter)) - risiko% = Zwischensumme 1

Zwischensumme 1 + 4% jährliche Zinsen = Zwischensumme Koch

Zwischensumme Koch - Engstand% - Pflegemängel% = Zeitwert



 */

module.exports = Plant = mongoose.model("plant", plantSchema);
