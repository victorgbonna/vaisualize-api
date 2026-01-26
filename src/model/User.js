const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
    },
    medium:{
      type: String,
      enum:['normal', 'google', 'github', 'linkedin'],
      default:'normal',
      required:true,
    },
    password: {
      type: String
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    imageUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "suspended", "deleted", "pending", "rejected"],
      default: "pending",
    },
    initials:{
        type:String,
        required:false
    },
    refId: {
      type: String
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {

    const potential_initials= (this.firstName[0]+this.lastName[0]).toLowerCase()
    const slugCount = await mongoose.models.User.countDocuments({
      initials: potential_initials,
    });
    if (slugCount) {
      const count=parseInt(slugCount)
      let new_refId= potential_initials+(count<10?'00'+(count+1):count<100?'0'+(count+1):count+1);
      this.refId = new_refId.toLowerCase()
    } else {
      const potential_refId= potential_initials+"001"
      this.refId = potential_refId;
    }
    this.initials= potential_initials
    
    next();
  });
const User = mongoose.model("User", UserSchema);

module.exports = User;
