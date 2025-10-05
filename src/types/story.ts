export interface Chapter {
  _id?: string
  title: string
  content?: string      // nội dung text (cho novel)
  images?: string[]     // ảnh minh họa hoặc truyện tranh
  createdAt?: string
  updatedAt?: string
}

export interface Story {
  _id: string
  title: string
  author: string
  type: "comic" | "novel"
  description?: string
  chapters?: Chapter[]
  thumbnail?: string    // ảnh bìa
  status?: "draft" | "published"
  createdAt?: string
  updatedAt?: string
}
