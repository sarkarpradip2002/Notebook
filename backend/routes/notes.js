const express=require('express');
const router=express.Router();
const notes = require('../models/Notes');
const authuser=require('../middleware/Auth');
const { body, validationResult } = require('express-validator');

// Get all the notes from the database
router.get('/',authuser,async (req,res)=>{
   const allnotes=await notes.find({user: req.user.id});
   res.send(allnotes);
})

// Add a new note in the database
router.post('/addnote',authuser, [body('title', 'Please provide a title').isLength({ min: 1 }),
body('description', 'Description is must needed').isLength({ min: 5 }),
],async (req,res)=>{
    const errors = validationResult(req);
    const {title,description,tag}=req.body;
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
          const savenotes=new notes({title,description,tag,user:req.user.id});
          savenotes.save().then((Notes)=>{
             res.send(Notes);
          })
      } catch (error) {
          console.error(error.message);
      }
   
})

// Update any note in the database
router.put('/updatenote/:id',authuser,async (req,res)=>{
    const {title,description,tag}=req.body;
    let newnote={};
    if(title) {newnote.title=title}
    if(description) {newnote.description=description}
    if(tag) {newnote.tag=tag}

    let selecteddata= await notes.findById(req.params.id);
    if(!selecteddata)
    {
        req.status(404).json({error: "Note not found"})
    }
    if(req.user.id!==selecteddata.user.toString())
    {
       res.status(404).json({error: "User not valid"})
    }
    else{
       selecteddata= await notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true});
       res.json(selecteddata);
    }

})

// Delete a node from  the user
router.delete('/deletenote/:id',authuser,async (req,res)=>{
    let deletedata= await notes.findById(req.params.id);
    if(!deletedata)
    {
        res.json({error:"There is nothing to delete "})
    }
    try{
    if(req.user.id!==deletedata.user.toString())
    {
        res.json({error: "Invalid user to delete note"});
    }
    else{
         notes.findByIdAndDelete(req.params.id,(err,docs)=>{
            if (err){
               res.json({error:"Note is not deleted "})
            }
            else{
                res.json({error:"Note is deleted successfully "})
            }
        })
    }
}
catch(err){
   console.log(err);
}
})

module.exports = router;