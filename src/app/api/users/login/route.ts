import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json();
        const { email, password } = reqBody;
        console.log(reqBody);

        //check if the user already exists - if yes then login if no then error
        const user = await User.findOne({ email }); //searching in db
        if (!user) {
            return NextResponse.json({ error: 'User Does not exists' }, { status: 400 })
        }

        //check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password); //compares password coming from request to password in db

        //Handling wrong password
        if(!validPassword){
            return NextResponse.json({error : 'Invalid Password'}, {status: 400})
        }

        //create Token Data
        const tokenData ={
            id: user._id,
            username : user.username,
            email: user.email,
        }

        //create token using jwt
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        //response
        const response = NextResponse.json({
            message: 'Login successfull',
            success: true
        })
         response.cookies.set('token', token, {
            httpOnly: true
         })
         return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}