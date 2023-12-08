import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect()

//USER SIGNUP

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })
        if (user) {
          return NextResponse.json({ error : 'User Already Exists'} , {status : 500})
        }

        //hashPassword
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword =  await bcryptjs.hash(password, salt)

        //creating & saving user
        const newUser = new User({
            username,
            email,
            password : hashedPassword,
        })

        const savedUser = await newUser.save();
        console.log(savedUser);
    
        //return response
        return NextResponse.json({
            message : 'User created Successfully', 
            success: true,
            savedUser,
        })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}