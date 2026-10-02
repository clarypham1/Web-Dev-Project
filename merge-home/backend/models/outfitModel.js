import mongoose from "mongoose";

const outfitSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    image: { type: String, default: "" },
    weather: { type: String, default: "" },
    destination: { type: String, default: "" },
    style: { type: String, default: "" },
    usageCount: { type: Number, default: 0, min: 0 },

    // the wardrobe items that make up the outfit (for the AI outfit part later)
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
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
