const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["todo", "in-pending", "in-process", "done"],
      required: true,
      default: "todo",
    },
    account_id: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    updated_by: { type: Schema.Types.ObjectId, ref: "Account", default: null },
  },
  {
    timestamps: true,
  }
);

// When you `populate()` the `author` virtual, Mongoose will find the
// first document in the User model whose `_id` matches this document's
// `authorId` property.
TaskSchema.virtual("user_detail", {
  ref: (doc) => {
    return doc?.userRef;
  },
  localField: "account_id",
  foreignField: "_id",
  justOne: true,
});

TaskSchema.pre("find", function () {
  this.populate("user_detail");
});

TaskSchema.pre("findOne", function () {
  this.populate("user_detail");
});

module.exports = mongoose.model("Task", TaskSchema);
