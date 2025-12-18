import mongoose from "mongoose";

const sopSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    subtitle: {
      type: String,
      default: "",
    },

    items: [
      {
        type: String,
      },
    ],

    colorItems: [
      {
        color: {
          type: String,
        },
        text: {
          type: String,
        },
      },
    ],

    note: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const SOP = mongoose.model("sops", sopSchema);
export default SOP;
