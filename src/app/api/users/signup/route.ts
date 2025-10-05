import { connect } from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password, role } = reqBody

    console.log("Incoming register request:", reqBody)

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      )
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "reader",
    })

    const savedUser = await newUser.save()
    console.log("✅ User created:", savedUser)

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        role: savedUser.role,
      },
    })
  } catch (error: any) {
    console.error("❌ Error creating user:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
