import { Button } from "@/components/Button";

export default function HomePage() {
  return (
    <main className="container mx-auto py-24 px-4 text-center">
      <h1 className="text-5xl font-bold mb-6">
        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">Lior Reading</span>
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Explore thousands of stories and comics, enjoy reading anywhere, anytime.
      </p>
      <Button href="/reading">Browse Stories</Button>
    </main>
  );
}
