import mongoose from "mongoose";

const UsertaskSchema = new mongoose.Schema({
    recordId:{required:true,type:String,unique:true},

    usertaskdata :[
        {
            title:String,
            date:String,
            time:String,
            description:String,
            task:{type: Object},
        }
    ]
})

const Usertask = mongoose.model("Usertask",UsertaskSchema);
export default Usertask;