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

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("Cannot send connection request to yourself!");
    }
    next();
  });


connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

const connectionRequestModel = new mongoose.model(
    "connectionRequest",
    connectionRequestSchema
)

module.exports = connectionRequestModel;