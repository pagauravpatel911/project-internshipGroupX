const { json } = require("express/lib/response");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


const isValidRequestBody = function (reqBody){
  return Object.keys(reqBody).length > 0
};
const isValid = function (value) {
  if (typeof value === "undefined" || typeof value === null) return false;
  if (typeof value === "string" || value.trim().length === 0 ) return false
   return true;
};

const createCollege = async function (req, res) {
  try {
    let data = req.body;
    if (!isValidRequestBody(data)){
      return res.status(400).send({status:false, message: "Invalid request"})
    }
    let name = req.body.name;
    if (isValid(name)){
      return res.status(400).send({status:false, message: "Please Enter Your college Name"})
    
    }
    if (data) {
      let collegecreted = await collegeModel.create(data);

      if (data.isDeleted === true) {
        let mainBlog = await collegeModel.findOneAndUpdate(
          { _id: collegecreted._id },
          { $set: { deletedAt: Date.now() } },
          { new: true }
        );
        return res.status(201).send({ status: true, data: mainBlog });
      }
      return res.status(201).send({ status: true, data: collegecreted });
    } else {
      res.status(400).send("BAD REQUEST");
    }
  } catch (err) {
    return res.status(500).send({ status: false, ERROR: err.message });
  }
};

let collegeDetails = async function (req, res) {
  try {
    let collegeName = req.query;

    if (!collegeName) {
      res
        .status(400)
        .send({ status: false, msg: "plz enter the name of college" });
    }
    let findcollege = await collegeModel
      .findOne(collegeName)
      .select({ isDeleted: 0 });

    const finalcollege = JSON.parse(JSON.stringify(findcollege));

    if (!findcollege) {
      res
        .status(400)
        .send({ status: false, msg: "plz enter the valid college Name" });
    }

    let id = findcollege._id;
    let internDetails = await internModel.find({ collegeId: id });
    console.log(internDetails);

    if (!internDetails) {
      res.status(404).send({ msg: "Your college have no interns till now" });
    }
    if (internDetails.length == 0){
      [...internDetails] = [ "Your college have no interns till now"]
    }
    finalcollege.interns = [...internDetails];
    res.status(201).send({ status: true, data: finalcollege });
  } catch (err) {
    return res.status(500).send({ status: false, ERROR: err.message });
  }
};

module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails;
