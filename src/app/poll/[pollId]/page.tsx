import { PollVote } from "@/components/poll-vote";

interface PollPageProps {
  params: Promise<{
    pollId: string;
  }>;
}

export default async function PollPage({ params }: PollPageProps) {
  const { pollId } = await params;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-4xl font-extrabold tracking-tight">Quick Poll</h1>
        <PollVote pollId={pollId} />
      </div>
    </main>
  );
}
