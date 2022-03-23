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




const createIntern = async function (req, res) {
  try {


    let data = req.body;
    if (!isValidRequestBody(req.body)){
      return res.status(400).send({status:false, message: "Invalid request"})
    }
    let name = req.body.name;
    if (isValid(name)){
      return res.status(400).send({status:false, message: "Please Enter Your Name"})
    
    }
    let id = data.collegeId;
    let valid = await collegeModel.findById(id);
    if (!valid) {
      return res
        .status(404)
        .send({ status: false, msg: "please enter a valid college id" });
    }
    if (data) {
      let internCreated = await internModel.create(data);

      if (data.isDeleted === true) {
        let mainBlog = await internCreated.findOneAndUpdate(
          { _id: internCreated._id },
          { $set: { deletedAt: Date.now() } },
          { new: true }
        );
        return res.status(201).send({ status: true, data: mainBlog });
      }
      return res.status(201).send({ status: true, data: internCreated });
    } else {
      res.status(400).send("BAD REQUEST");
    }
  } catch (err) {
    return res.status(500).send({ status: false, ERROR: err.message });
  }
};

module.exports.createIntern = createIntern;
