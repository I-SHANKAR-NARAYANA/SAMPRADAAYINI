const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userid: { type: String, required: true, unique: true },
    schoolid: { type: Number, required: true, unique: true },
    selectedRole: { type: String, required: true },
    courseList: [
      {
        courseid: { type: Number, required: true },
        teacher: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        syllabus: { type: String, required: true },
      },
    ],
    picn: { type: Number, required: true },
    attendance: {
      type: Object,
      default: {},
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
