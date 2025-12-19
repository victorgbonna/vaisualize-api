const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentsSchema = new Schema(
  {
    fullName: {
        type: String,
        required:true
    },
    access_code:{
        type: String,
        required:true,
    },
    email_attached:{
        type: String,
        lowercase: true,
        unique:true,
    },
    whatsapp_line:{
        type: String,
    },
    proof:{
        type: String,
        required:true
    },
    req_id:{
        type: String,
        required:true,
    },
    country:{
        type: String,
    },
    // requests: [reqAddedSchema],
    status: { 
        type: String, 
        enum:["suspended", "active", "deleted", "break","pending",'rejected'],
        default:"pending"
    },
    
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("payments", PaymentsSchema);

module.exports = Payment;
