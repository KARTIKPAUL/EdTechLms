import mongoose  from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { config  } from 'dotenv';
config();
import crypto from 'crypto'

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: [true, 'Name is required'],
        minLength: [3,'Name must be at least 5 Character'],
        maxLength: [50,'Name at most 50 Character'],
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required'],
        minLength: [8,'Password must be at least 8 Character'],
        select: false
    },
    avater: {
        public_id: {
            type: 'String'
        },
        secure_url: {
            type: 'String'
        }
    },
    forgetPassword: {
        type: String
    },
    forgetPasswordExpiry: {
        type: Date
    },
    role:{
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER'
    }
},{timestamps: true})


//Encrypt Password
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password = await bcrypt.hash(this.password,10)
})


//Generate JWT Token
userSchema.methods = {
    generateJWTToken: async function () {
        return await jwt.sign(
          { 
            id: this._id,
            role: this.role, 
            //subscription: this.subscription 
        },
          process.env.JWT_SECRET,
          
        //   {
        //     expiresIn: process.env.JWT_EXPIRY,
        //   }

        );
      },

      generatePasswordResetToken: async function() {
        const resetToken = crypto.randomBytes(20).toString('hex');
        this.forgetPassword = crypto
        .createhash('sha256')
        .update(resetToken)
        .digest('hex')
        this.forgetPasswordExpiry = Data.now() + 15 * 60 * 1000

        return resetToken;
      }
}






const User = mongoose.model('User',userSchema)

export default User;