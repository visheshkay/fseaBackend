
const bcryptjs=require('bcryptjs')
const jsonwebtoken=require('jsonwebtoken')
const verifyToken=require("../middlewares/verifyToken")
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()

const exp = require('express')
const facultyApp = exp.Router()

//faculty collection object
facultyApp.use((req,res,next)=>{
    sdpcollection=req.app.get('sdpcollection')
    reviewcollection=req.app.get('reviewcollection')
    next();
});

// upload faculty sdp data
facultyApp.post('/sdpdata',expressAsyncHandler(async(req,res)=>{
    //get new sdp object by faculty
    const sdpdata=req.body;
    //post to sdp collection
    await sdpcollection.insertOne(sdpdata)
    //send res
    res.send({message:"Data Uploaded"})
}))

// upload faculty review data
facultyApp.post('/reviewdata',expressAsyncHandler(async(req,res)=>{
    //get new review object by faculty
    const reviewdata=req.body;
    //post to review collection
    await reviewcollection.insertOne(reviewdata)
    //send res
    res.send({message:"Data Uploaded"})
}))

// get faculty sdp data
facultyApp.get('/sdpdata/:id',expressAsyncHandler(async(req,res)=>{
    // get facultyname
    const fid=req.params.id
    // get all sdp data
    let List=await sdpcollection.find({$and:[{facultyId:fid}]}).toArray()
    // send res
    res.send({message:"List of data",payload:List})
}))

// get faculty review data
facultyApp.get('/reviewdata/:id',expressAsyncHandler(async(req,res)=>{
    // get facultyname
    const fid=req.params.id
    // get all review data
    let List=await reviewcollection.find({$and:[{facultyId:fid}]}).toArray()
    // send res
    res.send({message:"List of data",payload:List})
}))


module.exports=facultyApp