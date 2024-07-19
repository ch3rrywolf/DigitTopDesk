const mongoose = require('mongoose');

const routerPermissionSchema = new mongoose.Schema({

    router_endpoint:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        requied:true
    },
    permission:{
        type:Array,
        required:true
    }

});

module.exports = mongoose.model('RouterPermission', routerPermissionSchema);