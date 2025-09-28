// app/api/stories/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connect } from "@/dbConfig/dbConfig"
import Story from "@/models/storyModel"

connect()

// Lấy tất cả stories
export async function GET() {
  try {
    const stories = await Story.find()
    return NextResponse.json({ success: true, stories })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

// Tạo mới story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, author, type, description, coverImage, content, images } = body

    if (!title || !author || !type) {
      return NextResponse.json(
        { success: false, error: "Title, author and type are required" },
        { status: 400 }
      )
    }

    const story = new Story({
      title,
      author,
      type,
      description,
      coverImage,
      content,
      images,
    })

    const savedStory = await story.save()

    return NextResponse.json({ success: true, story: savedStory }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
