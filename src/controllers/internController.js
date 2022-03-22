const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");



const createIntern = async function (req, res) {
    try {
      let data = req.body;
      if (data) {
        let createIntern = await internModel.create(data);
  
        if (data.isDeleted === true) {
          let mainBlog = await internModel.findOneAndUpdate(
            { _id: collegecreted._id },
            { $set: { deletedAt: Date.now() } },
            { new: true }
          );
          return res.status(201).send({status:true, data: mainBlog });
        }
        return res.status(201).send({status:true ,data: createIntern });
      } else {
        res.status(400).send("BAD REQUEST");
      }
    } catch (err) {
      return res.status(500).send({status:false ,ERROR: err.message });
    }
  };

  let collegeDetails = async function ( req, res) {
     try{let collegeName = req.query;
    
      if(!collegeName){
          res.status(400).send("plz enter the name of college")
      }
      let findcollege = await collegeModel.find(collegeName);
      console.log(findcollege);

      
      let id = findcollege[0]._id;
      let internDetails = await internModel.find({collegeId:id});
      res.status(201).send({data:findcollege, Interns: internDetails})}
      catch (err) {
        return res.status(500).send({status:false ,ERROR: err.message });
      }
  }



  module.exports.createIntern = createIntern;
  module.exports.collegeDetails = collegeDetails;







 