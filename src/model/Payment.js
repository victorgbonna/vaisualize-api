const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reqAddedSchema = new Schema(
    {
        req_id: { type: String , required:true},
        proof:{type: String, required:true},
        status:{ type: String, enum:["suspended", "active", "deleted", "break"], default:"break" },
    },{
        id: false
    }
)
const PaymentSchema = new Schema(
  {
    nick_name: {
        type: Array,
        required:true
    },
    access_code:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        lowercase: true,
        unique:true,
    },
    requests: [reqAddedSchema],
    status: { 
        type: String, 
        enum:["suspended", "active", "deleted", "break"],
        default:"active"
    },
    
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("payment", PaymentSchema);

module.exports = Payment;
