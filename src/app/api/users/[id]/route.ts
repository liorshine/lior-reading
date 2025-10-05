import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { username, email, role } = await req.json();
  const updatedUser = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
  return NextResponse.json({ success: true, user: updatedUser });
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  await User.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
