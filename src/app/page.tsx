import { PollForm } from "@/components/poll-form";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Quick Poll</h1>
        <PollForm />
      </div>
    </main>
  );
}
