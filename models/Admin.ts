import { model, models, Schema } from "mongoose";

export type AdminType = {
  loginId: string;
  password: string;
};

const adminSchema = new Schema<AdminType>(
  {
    loginId: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Admin || model("Admin", adminSchema);
