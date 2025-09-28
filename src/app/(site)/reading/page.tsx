// src/app/reading/page.tsx
import { storyData, StoryWithChapters } from "@/components/data/Storydata";

interface StorySummary {
  id: string;
  title: string; // storyTitle
  type: "TEXT" | "COMIC";
  description?: string;
}

export default function ReadingPage() {
  const stories: StorySummary[] = Object.entries(storyData).map(([id, story]) => {
    const chapters = story.chapters;
    const firstChapter = chapters[Object.keys(chapters)[0]];

    const hasImageOnly = firstChapter.blocks.every(block => block.type === "image");

    const description = hasImageOnly
      ? undefined
      : firstChapter.blocks
          .filter(block => block.type === "text")
          .map(block => block.content)
          .join(" ")
          .slice(0, 100) + "...";

    return {
      id,
      title: story.storyTitle,
      type: hasImageOnly ? "COMIC" : "TEXT",
      description,
    };
  });

  return (
    <main className="container mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Stories</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stories.map(({ id, title, description, type }) => (
          <a
            key={id}
            href={`/stories/${id}`}
            className="block p-6 border rounded-xl shadow hover:shadow-lg transition hover:scale-105 duration-200"
          >
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              ({type === "TEXT" ? "Truyện chữ" : "Truyện tranh"})
            </p>
            {description && <p className="mt-2 text-gray-700">{description}</p>}
          </a>
        ))}
      </div>
    </main>
  );
}
