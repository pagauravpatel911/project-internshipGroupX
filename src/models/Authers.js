const mongoose = require('mongoose');

const Authorschema = new mongoose.Schema( {
    author_id: {
         type  :Number,
         required: true
       
    },
    author_name: String,
    age: Number,
    address:String
    // isIndian: Boolean,
    // parentsInfo: {
    //     motherName: String,
    //     fatherName: String,
    //     siblingName: String
    // },
    // cars: [ String  ]
}, { timestamps: true });

module.exports = mongoose.model('Auther', Authorschema) //users



// String, Number
// Boolean, Object/json, array