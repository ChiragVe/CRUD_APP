const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const authenticated = require("../Middleware/authenticated.js");
const Task = require("../Database/task_model.js");
const jwt = require("jsonwebtoken");

//Create task API
router.post("/create", authenticated, async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req?.body;
    const todotask = new Task({
      title,
      description,
      status,
      assignedTo: mongoose.Types.ObjectId(assignedTo),
    });

    await todotask.save();
    res.status(200).send("Task Created Successfully");
  } catch (err) {
    res.status(404).send(`Error: ${err}`);
  }
});

//Get a single task API
router.get("/get/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const token = req.headers.access_token;
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    const { role, id } = verifiedUser;
    let response = {
      message: "Task Fetched Successfully",
    };
    if (role === "user") {
      await Task.findOne(
        { _id: taskId, assignedTo: id },
        function (_err, data) {
          response.data = data;
          res.status(200).send(response);
        }
      );
    } else {
      await Task.findOne({ _id: taskId }, function (_err, data) {
        response.data = data;
        res.status(200).send(response);
      });
    }
  } catch (err) {
    res.status(404).send(`Error: ${err}`);
  }
});

//Get all task API
router.get("/getall", async (req, res) => {
  try {
    const token = req.headers.access_token;
    const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
    const { role, id } = verifiedUser;
    let response = {
      message: "Task Fetched Successfully",
    };
    if (role === "user") {
      await Task.find({ assignedTo: id }, function (_err, data) {
        response.data = data;
        res.status(200).send(response);
      });
    } else {
      await Task.find(function (_err, data) {
        response.data = data;
        res.status(200).send(response);
      });
    }
  } catch (err) {
    res.status(404).send(`Error: ${err}`);
  }
});

//Update task API
router.put("/put/:id", authenticated, async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, status, assignedTo } = req?.body;
    const updatedTask = {
      title,
      description,
      status,
      assignedTo: mongoose.Types.ObjectId(assignedTo),
    };
    await Task.findByIdAndUpdate({ _id: taskId }, updatedTask);
    res.status(200).send("Task Updated Successfully");
  } catch (err) {
    res.status(404).send(`Error: ${err}`);
  }
});

//Delete task API
router.delete("/delete/:id", authenticated, async (req, res) => {
  try {
    const taskId = req.params.id;
    await Task.findByIdAndRemove({ _id: taskId });
    res.status(200).send("Task Deleted Successfully");
  } catch (err) {
    res.status(404).send(`Error: ${err}`);
  }
});

module.exports = router;
