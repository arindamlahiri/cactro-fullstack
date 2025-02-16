import { PollVote } from "@/components/poll-vote";

interface PollPageProps {
  params: Promise<{
    pollId: string;
  }>;
}

export default async function PollPage({ params }: PollPageProps) {
  const { pollId } = await params;
  return (
    <div className="container mx-auto py-8">
      <PollVote pollId={pollId} />
    </div>
  );
}
