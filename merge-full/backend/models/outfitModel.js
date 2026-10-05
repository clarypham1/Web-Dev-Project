import mongoose from "mongoose";

// one saved outfit = one card on the History page
const outfitSchema = new mongoose.Schema(
  {

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true },
    image: { type: String, default: "" },
    weather: { type: String, default: "" },
    destination: { type: String, default: "" },
    style: { type: String, default: "" },
    usageCount: { type: Number, default: 0, min: 0 },
    comboKey: { type: String, index: true },
    lastWornAt: { type: Date },

    items: [
      {
        itemId: { type: String },
        name: { type: String },
        category: { type: String },
        color: { type: String },
        image: { type: String },
        _id: false,
      },
    ],
  },
  { timestamps: true }
);


outfitSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Outfit = mongoose.model("Outfit", outfitSchema);

export default Outfit;
