import Task from "../models/task.js";

// get all tasks that exist in db as a home which is visible to all users

const getAll=async(req,res)=>{
    try {
        
        // pagination 
        const page = Number(req.query.page) || 1;
        const limit= Number(req.query.limit) || 5;

        // skip data of previous pages from current 
        const skip=(page-1)*limit;

        // find
        const task= await Task.find()
        .skip(skip)
        .limit(limit)
        .populate('createdBy',('name -_id '))
        .select('-_id ');

        // const total=task.length;

        res.status(200).json({task});

    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}

// get all tasks of a user
const getAllTasks=async(req,res)=>{
    try {
        
        // pagination 
        const page = Number(req.query.page) || 1;
        const limit= Number(req.query.limit) || 5;

        // skip data of previous pages from current 
        const skip=(page-1)*limit;

        // find
        const task= await Task.find({createdBy:req.user.id})
        .skip(skip)
        .limit(limit)
        .select('-createdBy');

        // const total=task.length;
        res.status(200).json({task});
    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}

// create task
const createTask=async(req,res)=>{
    try {
        const {title,description}= req.body;

        const newTask= new Task({
            title,
            description,
            createdBy:req.user.id
        });

        const task= await newTask.save();

        res.status(201).json(task);
    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}


// get specific task
const getSpecificTask=async(req,res)=>{
    try {
        const id=req.params.id;
        const task= await Task.findById(id);

        // no task found
        if(!task){
            return res.status(404).json({message:"No task with this id"});
        }

        res.status(200).json(task);
    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}

// update task
const updateTask=async(req,res)=>{
    try {

        const {title,description}=req.body;
        const id=req.params.id;

        const task= await Task.findByIdAndUpdate(id,{title,description, createdBy:req.user.id},{new:true});
        // no task found
        if(!task){
            return res.status(404).json({message:"No task with this id"});
        }

        res.status(200).json(task);
    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}

// delete a speicific task
const delteTask=async(req,res)=>{
    try {
        const id=req.params.id;

        const task= await Task.findByIdAndDelete(id);
        // no task found
        if(!task){
            return res.status(404).json({message:"Unable to delete!No task with this id"});
        }

        res.status(204).json({message:"deleted"});
    } 
    catch (error) {
        res.status(500).json({message:`Server Error! ${error}`});
    }
}

export {getAll,createTask,getAllTasks,getSpecificTask,updateTask,delteTask}