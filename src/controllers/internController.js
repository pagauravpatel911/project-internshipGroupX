const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");

const createIntern = async function (req, res) {
  try{
    const data = req.body
    if (!data.collegeName){
        return res.status(400).send({status: false, msg: "Enter college name"})
    }
    const collage = await collegeModel.findOne({fullName: data.collegeName})
    if (!collage){
        return res.status(404).send({status: false, msg: "Enter valid college name"})
    }
    data.collegeId = collage._id
    const intern = await internModel.create(data)
    return res.status(200).send({status: true, data: intern})
}catch(e){
    return res.status(400).send({status: false, msg: e.message})
}
};





module.exports.createIntern = createIntern;

