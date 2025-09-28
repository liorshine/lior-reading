import mongoose from "mongoose"

const chapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
)

const storySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    author: {
      type: String,
      required: [true, "Please provide an author"],
    },
    description: {
      type: String,
    },
    thumbnail: {
      type: String, 
    },
    type: {
      type: String,
      enum: ["comic", "novel"],
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    chapters: [chapterSchema],
  },
  { timestamps: true }
)

const Story = mongoose.models.Story || mongoose.model("Story", storySchema)

export default Story
