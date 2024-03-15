require("dotenv").config();
const { AUTH_EMAIL } = process.env;
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const axios = require("axios");
const OTP = require("./models/otp");
const sendEmail = require("./models/sendEmail");
const courseSchema = require("./models/courseadd");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { spawn } = require("child_process");
const path = require("path");

const workingDirectory = path.join(__dirname, "../server-inator/");

app.use(cors());
app.use(express.json());

async function refreshData() {
  try {
    await User.deleteMany({});
    await courseSchema.deleteMany({});
    await OTP.deleteMany({});
    console.log("All data in the User collection has been deleted.");
  } catch (error) {
    console.error("Error deleting data:", error);
  }
}
allCourses = new Object();
mongoose
  .connect(process.env.LOCAL_MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });
// refreshData();

app.post("/api/register", async (req, res) => {
  const { name, email, password, userid, schoolid, selectedRole } = req.body;
  try {
    function getRandomNumber() {
      const randomNumber = Math.random();
      const scaledNumber = Math.floor(randomNumber * 9);
      return scaledNumber;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      userid: req.body.userid,
      schoolid: req.body.schoolid,
      selectedRole: req.body.selectedRole,
      courseList: [],
      picn: getRandomNumber(),
    });

    const otpApiUrl = "http://localhost:1337/api/otp";
    const requestData = {
      email: req.body.email,
      subject: "Email Verification",
      message: "Your OTP code is:",
      duration: 1,
    };
    axios
      .post(otpApiUrl, requestData)
      .then((response) => {
        console.log("Success");
      })
      .catch((error) => {
        console.error("API Error:", error.message);
      });
    console.log("reached this point");
    res.json({ status: "ok", message: "Registration successful" });
  } catch (err) {
    res.json({ status: err, error: "Duplicate email" });
  }
});

app.post("/api/otp", async (req, res) => {
  try {
    const { email, subject, message, duration } = req.body;
    const generateOTP = async () => {
      return Math.floor(1000 + Math.random() * 9000);
    };
    let generatedOTP = await generateOTP();
    generatedOTP = String(generatedOTP);
    const sendOTP = async ({ email, subject, message, duration = 1 }) => {
      await OTP.deleteOne({ email });
      const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: subject,
        html: `<p>${message}</p><p style="color:tomato;font-size:25px;letter-spacing:2px;"
      <b>${generatedOTP}</b></p>
      <p> This code<b> expires in ${duration} hour(s)</b></p>`,
      };
      await sendEmail(mailOptions);
      const hashedOTP = await bcrypt.hash(generatedOTP, 10);
      const newOTP = await new OTP({
        email,
        otp: hashedOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000 * +duration,
      });
      const createdOTPRecord = await newOTP.save();
    };
    const createdOTP = await sendOTP({
      email,
      subject,
      message,
      duration,
    });
    res.status(200).json(createdOTP);
  } catch (error) {
    console.log("api error", error);
    res.status(400).send(error.message);
  }
});

app.post("/api/verify", async (req, res) => {
  try {
    let { email, otp } = req.body;
    console.log(email);
    const matchedOTPRecord = await OTP.findOne({ email });
    if (!matchedOTPRecord) {
      console.log("NO OTP FOUND");
      throw Error("NO OTP FOUND");
    }
    const { expiresAt } = matchedOTPRecord;
    if (expiresAt < Date.now()) {
      await OTP.deleteOne({ email });
      throw Error("OTP Expired");
    }
    const hashedOTP = matchedOTPRecord.otp;
    const validOTP = await bcrypt.compare(String(req.body.otp), hashedOTP);
    if (validOTP) {
      return res.status(200).json({ valid: true });
    } else {
      return res.status(200).json({ valid: false });
    }
  } catch (error) {
    console.log("error somewhere", error);
    return res.status(400).send(error.message);
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.json({ status: "error", error: "Invalid login" });
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret123"
    );
    const detl = {
      name: user.name,
      userid: user.userid,
      schoolid: user.schoolid,
      selectedRole: user.selectedRole,
      courseList: user.courseList,
      picn: user.picn,
    };
    return res.json({ status: "ok", user: token, det: detl });
  } else {
    return res.json({ status: "error", error: "Invalid password" });
  }
});

app.post("/api/add_course", async (req, res) => {
  const {
    title,
    description,
    syllabus,
    associatedResources,
    studentsList,
    teacher,
    courseid,
  } = req.body;
  try {
    const studentIdsArray = req.body.studentsList.split(" ");
    const studentIds = studentIdsArray.map((id) => parseInt(id));
    const createdCourse = await courseSchema.create({
      title: req.body.title,
      description: req.body.description,
      syllabus: req.body.syllabus,
      associatedResources: req.body.associatedResources,
      studentsList: studentIds,
      teacher: req.body.teacher,
      courseid: req.body.courseid,
    });
    const user = await User.findOne({
      name: req.body.teacher,
    });
    user.courseList.push({
      courseid: req.body.courseid,
      teacher: req.body.teacher,
      title: req.body.title,
      syllabus: req.body.syllabus,
      description: req.body.description,
    });
    await user.save();

    await Promise.all(
      studentIds.map(async (studentid) => {
        const student = await User.findOne({ schoolid: studentid });
        student.courseList.push({
          courseid: req.body.courseid,
          teacher: req.body.teacher,
          title: req.body.title,
          syllabus: req.body.syllabus,
          description: req.body.description,
        });
        await student.save();
      })
    );
    res.json({
      status: "ok",
      message: "Course added successful",
      lis: user.courseList,
    });
  } catch (err) {
    res.json({
      status: err,
      error: "Error in course creation",
      message: "Error in coourse creation",
    });
  }
});

app.get("/api/sites/:coord", async (req, res) => {
  try {
    const coord = req.params.coord;
    const part = coord.split(",");
    console.log(coord);
    console.log(part);
    const latitude = part[0];
    const longitude = part[1];
    process.chdir(workingDirectory);
    const pythonScript = path.join(
      __dirname,
      "../server-inator/siteSearcher.py"
    );

    const processp = spawn("python", [pythonScript, latitude, longitude]);

    let hell;

    processp.stdout.on("data", (data) => {
      test = data.toString();
    });

    processp.stderr.on("data", (data) => {
      console.log("err results: %j", data.toString("utf8"));
    });

    processp.on("error", (err) => {
      console.error("Failed to start subprocess.", err);
    });

    await new Promise((resolve, reject) => {
      processp.stdout.on("end", () => {
        hell = JSON.parse(test);
        console.log(hell);
        resolve();
      });
    });

    console.log(hell);
    return res.json(hell);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/coursefind/:courseid", async (req, res) => {
  try {
    const courseid = req.params.courseid;
    const course = await courseSchema.findOne({ courseid: courseid });
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const courseDet = {
      title: course.title,
      description: course.description,
      syllabus: course.syllabus,
      associatedResources: course.associatedResources,
      teacher: course.teacher,
    };

    return res.json({ courseDet });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/hello", (req, res) => {
  console.log("GET request received for /hello");
  res.send("hello world");
});

const port = process.env.PORT || 1337 || 80 || 443;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
