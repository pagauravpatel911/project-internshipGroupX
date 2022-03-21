const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const AuthorController= require("../controllers/AuthersController");


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


    
router.post("/createAuther",AuthorController.createAuther);
router.post("/createBooks",AuthorController.createBooks);
router.get("/booksByChetanBhagat",AuthorController.booksByChetanBhagat);
router.get("/updatePrice" , AuthorController.upadatePrice1 );
router.get("/pricesBooks", AuthorController.pricesBooks);





//  router.post("/createBookData",AuthorController.createNewBook);
 
//  router.get("/allBooks", AuthorController.allBooks);
// router.get("/updateBookPrice", AuthorController.upadatedBookPrice);
// router.get("/authorsName", AuthorController.authorsName);



 






module.exports = router;