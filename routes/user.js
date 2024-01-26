const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;

  await User.create({
    username: username,
    password: password,
  });
  res.status(200).json({
    msg: "user created",
  });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.find({
    username,
    password,
  });
  if (user) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    res.json({
      token,
    });
  }
  else {
    res.status(403).json({
        message:"incorrect email or password"
    })
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courses = await Course.find({});
  res.status(200).json({
    courses
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
    const user = await User.updateOne({
        username: req.username
    },{
        $push:{
            purchasedCourses:req.params.courseId
        }
    });
    res.json({
        msg:"purchsed successfully"
    })

});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
    const username = req.body.username;
    const user = await User.findOne({
        username
    })
    const courses = Courses.find({
        _id:{
            $in: user.purchasedCourses
        }
    })
    if(courses){
        res.status(200).json({
            courses:courses
        })
    }else{
        res.status(403).json({
            msg:"no course found"
        })
    }
});

module.exports = router;
