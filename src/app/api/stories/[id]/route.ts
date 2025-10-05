// app/api/stories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import Story from "@/models/storyModel"

connect()

// Helper type để code gọn hơn
type RouteContext = { params: Promise<{ id: string }> }

export async function GET(request: NextRequest, context: RouteContext) {
  const { id } = await context.params

  try {
    const story = await Story.findById(id)
    if (!story) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, story })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { id } = await context.params

  try {
    const body = await request.json()
    const story = await Story.findByIdAndUpdate(id, body, { new: true })
    if (!story) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, story })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { id } = await context.params

  try {
    const story = await Story.findByIdAndDelete(id)
    if (!story) {
      return NextResponse.json({ success: false, error: "Not found" }, { status: 404 })
    }
    return NextResponse.json({ success: true, message: "Deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
