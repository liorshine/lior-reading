// app/api/stories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import Story from "@/models/storyModel"

connect()

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const story = await Story.findById(params.id)
    if (!story) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true, story })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const story = await Story.findByIdAndUpdate(params.id, body, { new: true })
    if (!story) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true, story })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const story = await Story.findByIdAndDelete(params.id)
    if (!story) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    return NextResponse.json({ success: true, message: "Deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
