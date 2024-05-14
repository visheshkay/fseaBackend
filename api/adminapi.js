const exp = require('express')
const adminApp = exp.Router()

let facultycollection
let admincollection;
let sdpcollection;
let reviewcollection;

adminApp.use((req,res,next)=>{
    admincollection = req.app.get('admincollection')
    sdpcollection = req.app.get('sdpcollection')
    reviewcollection = req.app.get('reviewcollection')
    facultycollection = req.app.get('facultycollection')
    next()
})

adminApp.get('/get-sdp-records',async (req,res)=>{
    let records;
    records = await sdpcollection.find().toArray();
    res.send({message:"Records Found",payload:records})
})
adminApp.get('/get-sdp-records/:facultyId',async(req,res)=>{
    let fid = (req.params.facultyId);
    let faculty_records = await sdpcollection.find({facultyId:{$eq:fid}}).toArray();
    res.send({message:"Faculty Records Found",payload:faculty_records})
})
adminApp.get('/get-review-records',async (req,res)=>{
    let reviewrecords;
    reviewrecords = await reviewcollection.find().toArray();
    res.send({message:"reviewers data Found",payload:reviewrecords})
})
adminApp.get('/get-review-records/:facultyId',async (req,res)=>{
    let fid = req.params.facultyId;
    let faculty_data = await reviewcollection.find({facultyId:fid}).toArray();
    res.send({message:"Faculty data Found",payload:faculty_data})
})
adminApp.get('/get-all-faculty-records',async (req,res)=>{
    let allfaculty;
    allfaculty = await facultycollection.find().toArray();
    res.send({message:"all faculty data found",payload:allfaculty})
})
module.exports=adminApp