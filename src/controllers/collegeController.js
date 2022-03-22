const collegeModel = require("../models/collegeModel");

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    if (data) {
      let collegecreted = await collegeModel.create(data);
   console.log(collegecreted);
      if (data.isDeleted === true) {
        let mainBlog = await collegeModel.findOneAndUpdate(
          { _id: collegecreted._id },
          { $set: { deletedAt: Date.now() } },
          { new: true }
        );
        return res.status(201).send({ status:true, data: mainBlog });
      }
      return res.status(201).send({ status:true, data: collegecreted });
    } else {
      res.status(400).send("BAD REQUEST");
    }
  } catch (err) {
    return res.status(500).send({status:false, ERROR: err.message });
  }
};











module.exports.createCollege = createCollege;