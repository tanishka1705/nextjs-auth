import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
       const userId = getDataFromToken(request);
        const user = await User.findOne({_id : userId}).select('-password'); //deselect password 
        return NextResponse.json({
            message: 'User Found',
            data: user
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}