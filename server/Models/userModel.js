import { Schema ,model } from "mongoose";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();
import crypto from 'crypto'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    fullName : {
        type: String,
        required:[true, 'Name must be Required'],
        minLength: [5,'Name Must be 5 Character'],
        lowercase: true,
        trim: true

    },
    email : {
        type: String,
        required: [true,'Email Must be Required'],
        lowercase: true,
        trim: true,
        unique: true
    },
    password : {
        type: String,
        required:[true,'Password must be Required'],
        minLength:[8,'Password Must be 8 Character'],
        select: false
    },
    avater: {
        public_id : {
            type: String,
        },
        secure_url: {
            type: String
        }
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordExpiry: {
        type: Date
    },
    role: {
        type: String,
        enum: ['USER','ADMIN'],
        default: 'USER',
    },
    subscription: {
        id: String,
        status: String
    }


},{timestamps: true});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods = {
    generateJWTToken: function() {
        return jwt.sign(
        {
            id: this._id,
            email: this.email,
            subscription: this.subscription, 
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '60d'
        }
       )
    },
    comparePassword: async function(plainTextPassword){
        return await bcrypt.compare(plainTextPassword,this.password)
    },
    generatePasswordResetToken: async function(){
        const resetToken = crypto.randomBytes(20).toString("hex");

        this.forgotPasswordToken = await crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex")
        this.generateJWTToken = resetToken;
        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000 // 15 Minutes from now

        return resetToken;
    }
}



const User = model('User',userSchema);

export default User;