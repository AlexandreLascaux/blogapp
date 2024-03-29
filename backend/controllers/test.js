const Post = require('../models/post')
const fs = require('fs')
exports.createPost = (req,res,next)=>{
    console.log("post test")
    const postObject = req.body
    delete postObject._id;
    const p = new Post({
        ...postObject
    })
    p.save()
        .then(() => res.status(201).json({message : 'ok'}))
        .catch(error => res.status(400).json({ error}))
}

exports.updatePostId =(req,res,next)=>{
    console.log('put test id')
    Post.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
        .then(()=> res.status(200).json({message: 'ok'}))
        .catch(()=> res.status(400).json({ error}))
}

exports.deletePostId =(req,res,next)=>{
    console.log('delete test id')
    Post.findOne({_id:req.param.id})
        .then( post => {
            
                Post.deleteOne({_id: req.params.id})
                    .then(()=> res.status(200).json({message: 'ok'}))
                    .catch(error => res.status(400).json({error}))
        })
        .catch(error => res.status(500).json({error}))  
}

exports.getPostId = (req,res,next)=>{
    console.log('get test id')
    Post.findOne({_id:req.params.id})
        .then(post=> res.status(200).json(post))
        .catch(error => res.status(404).json({error}))
}

exports.getAllPost = (req,res,next)=> {
    console.log('get all test')
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(error=> res.status(400).json({error}));
}