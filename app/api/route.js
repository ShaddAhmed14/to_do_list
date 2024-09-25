import { NextResponse } from "next/server";
import {ConnectDB} from '@/lib/config/db'
import TodoModel from "@/lib/models/todo"
import { mongo } from "mongoose";

const loadDB = async () => {
    await ConnectDB()
}

loadDB()

export async function GET(request){
    const todos = await TodoModel.find({})
    return NextResponse.json({todos: todos})
}

export async function POST(request){
    const {title, description} = await request.json()
    console.log(title, description)
    await TodoModel.create({title, description})

    return NextResponse.json({msg: "ToDo created"})
}

export async function DELETE(request){
    const mongoID = await request.nextUrl.searchParams.get('mongoId')
    await TodoModel.findByIdAndDelete(mongoID)

    return NextResponse.json({msg: "ToDo Deleted"})
}

export async function PUT(request){
    console.log("link", await request.nextUrl)
    const mongoID = await request.nextUrl.searchParams.get('mongoId')
    console.log("mongoID", mongoID)
    await TodoModel.findByIdAndUpdate(mongoID, {

        $set:{isCompleted: true}
    })

    return NextResponse.json({msg: "ToDo Completed"})
}