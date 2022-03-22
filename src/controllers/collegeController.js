const { json } = require("express/lib/response");
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");


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
      res.status(400).send({status:false,msg:"plz enter the name of college"});
    }
    let findcollege = await collegeModel.findOne(collegeName).select({isDeleted: 0});
    console.log(findcollege);
    const finalcollege = JSON.parse(JSON.stringify(findcollege));
    console.log(finalcollege)
    if (!findcollege) {
      res.status(404).send({status:false,msg:"plz enter the valid college Name"});
    }

    let id = findcollege._id;
    let internDetails = await internModel.find({ collegeId: id });
    
    if (!internDetails) {
      res.status(404).send({msg:"Your college have no interns till now"});
    }
    finalcollege.interns =[...internDetails]
    res.status(201).send({ status:true, data: finalcollege });
  } catch (err) {
    return res.status(500).send({ status: false, ERROR: err.message });
  }
};

module.exports.createCollege = createCollege;
module.exports.collegeDetails = collegeDetails;
