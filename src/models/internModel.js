const mongoose = require('mongoose')
const match = require('nodemon/lib/monitor/match')

const internSchema = new mongoose.Schema({
    name : {
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ]},
    mobile:{
        type:Number,
        required:true,
        unique:true,
        trim:true,
        match: [/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
        "Please fill a valid Mobile Number"
    ]
    },
    collegeId:{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"college"

    },
    isDeleted:{
        type:Boolean,
        default:false
    }, deletedAt:{
        type:Date
    }
    
},{timestamps:true})



module.exports = mongoose.model('intern', internSchema)