import mongoose, { Schema } from "mongoose";

const taskSchema=new mongoose.Schema({
    "title": {type:String, required:true},

    "description": {type:String , required:true},

    "createdBy": {type:Schema.Types.ObjectId, ref: 'user'}
});

const Task= mongoose.model('task',taskSchema);


export default Task;