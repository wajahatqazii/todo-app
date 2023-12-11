// const Account = require("../Accounts");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema(
  {
    first_name: { type: String, required: true, trim: true, index: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, trim: true, set: helper.encrypt, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: null },
    updated_by: { type: Schema.Types.ObjectId, ref: "Account", default: null },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", AccountSchema);
