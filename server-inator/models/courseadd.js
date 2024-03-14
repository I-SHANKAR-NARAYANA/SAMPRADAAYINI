const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    syllabus: { type: String, required: true },
    associatedResources: { type: String },
    studentsList: [{ type: Number, required: true }],
    teacher: { type: String, required: true },
    courseid: { type: Number, required: true },
  },
  { collection: "course-data" }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
