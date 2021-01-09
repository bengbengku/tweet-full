const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MapsSchema = new Schema(
  {
    name: { type: String },
    jumlahPenduduk: { type: Number, required: true, default: 0 },
    jumlahKorban: { type: Number, required: true, default: 0 },
    luasWilayah: { type: Number, required: true, default: 0 },
    jarakWilayah: { type: Number, required: true, default: 0 },
    location: {
      type: String,
      default: "Point",
      coordinates: { type: [Number], default: [0, 0] },
    },
  },
  { timestamps: true }
);

var Maps = mongoose.model("Maps", MapsSchema);
module.exports = Maps;

