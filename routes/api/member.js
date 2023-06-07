const express =require('express');
const uuid=require('uuid');
const router =express.Router();
const members=require('../../members')

// geting all members
router.get('/',(req,res)=>res.json(members));

router.get('/:id',(req,res)=>
{
   // res.send(req.params.id);
   const found=members.some(members=>members.id===parseInt(req.params.id));
   if(found)
    res.json(members.filter(members=>members.id===parseInt(req.params.id)));
    else
    {
        res.status(400).json({msg:`No Member prsent in this id ${req.params.id}`});
    }
});

// add new member

router.post('/',(req,res)=>
{
    const newMember=
    {
        id:uuid.v4(),
        name:req.body.name,
        email:req.body.email,
        status:'active'
    };
    if(!newMember.name||!newMember.email)
    {
        return res.status(400).json({msg:'please include name and email'});
    }
members.push(newMember);
//res.json(members);
res.redirect('/');
});

//update 
router.put('/:id',(req,res)=>
{
   // res.send(req.params.id);
   const found=members.some(member=>member.id===parseInt(req.params.id));
   if(found)
   {
    const udMember=req.body;
    members.forEach(member=>
    {
      if(member.id===parseInt(req.params.id))
      {
        member.name=udMember.name?udMember.name:member.name;
        member.email=udMember.email?udMember.name:member.email;

        res.json({msg:" member updated" ,member})
      }
    });
   }
    else
    {
        res.status(400).json({msg:`No Member prsent in this id ${req.params.id}`});
    }
});

// delete

router.delete('/:id',(req,res)=>
{
   // res.send(req.params.id);
   const found=members.some(member=>member.id===parseInt(req.params.id));
   if(found)
    {
        res.json(
            {
                msg:"Member Deleted ",
                members:members.filter(members=>members.id!==parseInt(req.params.id))
            });
    }
    else
    {
        res.status(400).json({msg:`No Member prsent in this id ${req.params.id}`});
    }
});


module.exports=router;