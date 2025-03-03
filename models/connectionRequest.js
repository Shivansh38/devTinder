const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:'string',
        required:true,
        status: {
            value:["ignore","intersted","pending","rejected"],
            message: `{VALUE} is incorrect status type`
        }
    },

},{
    timestamps:true,
});

const connectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports = connectionRequestModel;