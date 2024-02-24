const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/StudentDatabase")

  .then(() => console.log("database connected successfully"))

  .catch((e) => console.log("not connected", e));

const academicRecordsSchema = new mongoose.Schema({
  studentID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  grades: {
    math: {
      type: Number,
      min: 0,
      max: 100,
    },
    science: {
      type: Number,
      min: 0,
      max: 100,
    },
    history: {
      type: Number,
      min: 0,
      max: 100,
    },
    // Add more subjects as needed
  },
  subjects: {
    type: [String],
    required: true,
  },
  // Add any other pertinent academic information here
});

const coCurricularActivitiesSchema = new mongoose.Schema({
  studentID: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  activityType: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  achievements: {
    type: [String],
  },
  // Add any other fields as needed
});

// Model for Academic Records
const AcademicRecordsModel = mongoose.model(
  "AcademicRecords",
  academicRecordsSchema
);

const CoCurricularActivitiesModel = mongoose.model(
  "CoCurricularActivities",
  coCurricularActivitiesSchema
);

const academicRecordSample = new AcademicRecordsModel({
  studentID: 1,
  name: "John Doe",
  grades: {
    math: 85,
    science: 90,
    history: 78,
  },
  subjects: ["math", "science", "history"],
  // Add any other pertinent academic information here
});

// Save the document to the Academic Records collection
academicRecordSample
  .save()
  .then(() => console.log("Academic Records Document saved successfully"))
  .catch((error) =>
    console.error("Error saving Academic Records Document:", error)
  );

const coCurricularActivitySample = new CoCurricularActivitiesModel({
  studentID: 1,
  name: "John Doe",
  activityType: "Sports",
  duration: "2 years",
  achievements: ["Football Champion 2023", "Basketball MVP 2024"],
  // Add any other fields as needed
});

// Save the document to the Co-Curricular Activities collection
coCurricularActivitySample
  .save()
  .then(() =>
    console.log("Co-Curricular Activities Document saved successfully")
  )
  .catch((error) =>
    console.error("Error saving Co-Curricular Activities Document:", error)
  );

// Read Academic Records
AcademicRecordsModel.find()
  .then((records) => console.log("All Academic Records:", records))
  .catch((error) => console.error("Error reading Academic Records:", error));

// Read Co-Curricular Activities
CoCurricularActivitiesModel.find()
  .then((activities) =>
    console.log("All Co-Curricular Activities:", activities)
  )
  .catch((error) =>
    console.error("Error reading Co-Curricular Activities:", error)
  );

// Update Academic Record
AcademicRecordsModel.updateOne(
  { studentID: 1 },
  { $set: { "grades.math": 88 } }
)
  .then(() => console.log("Academic Record updated successfully"))
  .catch((error) => console.error("Error updating Academic Record:", error));

// Update Co-Curricular Activity
CoCurricularActivitiesModel.updateOne(
  { studentID: 1, activityType: "Sports" },
  { $set: { duration: "3 years" } }
)
  .then(() => console.log("Co-Curricular Activity updated successfully"))
  .catch((error) =>
    console.error("Error updating Co-Curricular Activity:", error)
  );

// Delete Academic Record
AcademicRecordsModel.deleteOne({ studentID: 1 })
  .then(() => console.log("Academic Record deleted successfully"))
  .catch((error) => console.error("Error deleting Academic Record:", error));

// Delete Co-Curricular Activity
CoCurricularActivitiesModel.deleteOne({ studentID: 1, activityType: "Music" })
  .then(() => console.log("Co-Curricular Activity deleted successfully"))
  .catch((error) =>
    console.error("Error deleting Co-Curricular Activity:", error)
  );
