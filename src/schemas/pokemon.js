/*===============================IMPORT MODULES===============================*/
const mongoose = require("mongoose");
/*============================================================================*/

/*===============================POKEMON SCHEMA===============================*/
const pokemon = new mongoose.Schema({
    "Number": {type: String},
    "Name": {type: String},
    "Generation": {type: String},
    "About": {type: String},
    "Types": {type: Array},
    "Resistant": {type: Array},
    "Weaknesses": {type: Array},
    "Fast Attack(s)": {type: Array},
    "Special Attack(s)": {type: Array},
    "NumberAttacks": {type: Number},
    "Weight": {type: Object},
    "Height": {type: Object},
    "Buddy Distance": {type: String},
    "Base Stamina": {type: String},
    "Base Attack": {type: String},
    "Base Defense": {type: String},
    "Base Flee Rate": {type: String},
    "Next Evolution Requirements": {type: Object},
    "Next evolution(s)": {type: Array},
    "MaxCP": {type: Number},
    "MaxHP": {type: Number}
}, { collection: "pokemons" });
/*============================================================================*/

module.exports = mongoose.model("pokemons", pokemon);