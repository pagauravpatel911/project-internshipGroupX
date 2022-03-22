const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const intenController = require("../controllers/internController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



router.post("/createCollege" , collegeController.createCollege);
router.post("/createIntern", intenController.createIntern );
router.get("/collegeDetails", collegeController.collegeDetails);





module.exports = router;

    




 






