import mongoose, { model, Schema } from "mongoose";

interface ISettings {
  ownerId: string;
  businessName: string;
  supportEmail: string;
  knowledge: string;
}

const settingSchema = new Schema<ISettings>(
  {
    ownerId: {
      type: String,
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
    },
    supportEmail: {
      type: String,
    },
    knowledge: {
      type: String,
    },
  },
  { timestamps: true },
);

// if previous model created then use this otherwise create new one
const Settings = mongoose.models.Settings || model("Settings", settingSchema);
export default Settings;
