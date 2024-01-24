const mongoose=require('mongoose');
const chatModal=mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true,
        },
        Groupchat:{
            type:Boolean,
            default:false,
        },
        users:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    },
    {timestamps:true}
);
const chat=mongoose.model("Chat",chatModal);
module.exports=chat;



//chatName
//isGroupchat
//users
//latestMessage
//groupAdmin
