const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId
    },
    status:{
        type:'string',
        status: {
            value:["ignore","intersted","pending","rejected"]
        }
    },

})