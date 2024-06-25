require("dotenv").config();
require("../Database/database");
const express = require("express");
const ads = express.Router();
const AdsModel = require("../Models/Ads");
const UserModel = require("../Models/user");

ads.post("/add-ads/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const user = await UserModel.findOne({email});
    if(!user){
        res.status(404).json({
            succuss: false,
            message: "User not found."
        })
        return 
    }

    if(user.role != "admin"){
        res.status(404).json({
            succuss: false,
            message: "Only admin add ads."
        })
        return 
    }
    const {title, description, video,link} = req.body;
    console.log(title,description,video,link)

    if(!title || !description || !video || !link){
        res.status(404).json({
            succuss: false,
            message: "All fields are required."
        })
        return 
    }
   
    const result = await AdsModel.create({
        title, description, video,link
    })
    res.status(201).json({
        success: true,
        message: "ads create successfully"
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});


ads.get("/all-ads", async (req, res) => {
    
    try {
      const email = req.query.email;
      console.log(email)
      const user = await UserModel.findOne({email});
      if(!user){
          res.status(404).json({
              succuss: false,
              message: "User not found."
          })
          return 
      }
  
      if(user.role != "admin"){
          res.status(404).json({
              succuss: false,
              message: "Only admin gets all ads."
          })
          return 
      }
      
     
      const result = await AdsModel.find()
      res.status(200).json({
          sucess: true,
          ads: result
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  });



  ads.get("/get-ads", async (req, res) => {
    try {
      const email = req.query.email;
      const user = await UserModel.findOne({email});
      
      
     
      const result = await AdsModel.find()
      const random = Math.floor(Math.random() * result.length)

      // result[random].views = result[random].views + 1;
      // result[random].CTR = calculateCTR(result[random].views,result[random].click)
      // await result[random].save();
      res.status(200).json({
          sucess: true,
          ads: result[random]
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  });


  function calculateCTR(viewsCount, clickCount) {
      if (viewsCount === 0) {
          return 0;
      }
      let ctr = (clickCount / viewsCount) * 100;
      return ctr;
  }

  ads.put("/update-ads/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const {views,click} = req.body;
      
      
     
      const result = await AdsModel.findById(id);
      if(!result){
        res.status(404).json({
            succuss: false,
            message: "Invalid Id."
        })
        return 
      }

      if(views){
        result.views = result.views + 1;
      }

      if(click){
        result.click = result.click + 1;
      }

      result.CTR = calculateCTR(result.views,result.click)
      result.save()

      res.status(200).json({
          sucess: true,
          message: "Add successfully."
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  });




module.exports = ads;
