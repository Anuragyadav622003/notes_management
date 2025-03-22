const express=require("express");
const usercontroller = require("../Controller/userController");
const router=express.Router();

router.route("/register").post(usercontroller.register)

module.exports=router;