"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { votePoll } from "@/server/actions";
import { redirect } from "next/navigation";

interface Poll {
  id: string;
  question: string;
  options: {
    id: number;
    pollId: string;
    text: string;
    votes: number;
  }[];
}

interface PollVoteProps {
  pollId: string;
}

export function PollVote({ pollId }: PollVoteProps) {
  const [poll, setPoll] = useState<Poll | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [hasVoted, setHasVoted] = useState(false);

  const fetchPoll = useCallback(async () => {
    const response = await fetch(`/api/polls/${pollId}`);
    const data = (await response.json()) as Poll;
    setPoll(data);
  }, [pollId]);

  useEffect(() => {
    void fetchPoll();
    const interval = setInterval(() => void fetchPoll(), 5000);
    return () => clearInterval(interval);
  }, [fetchPoll, pollId]);

  const handleVote = async () => {
    if (selectedOption && poll) {
      await votePoll(poll.id, parseInt(selectedOption));
      setHasVoted(true);
      await fetchPoll();
    }
  };

  if (!poll?.id) {
    redirect("/");
  }

  const totalVotes = poll.options.reduce(
    (sum, option) => sum + option.votes,
    0,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{poll.question}</CardTitle>
      </CardHeader>
      <CardContent>
        {!hasVoted ? (
          <>
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="space-y-4"
            >
              {poll.options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={option.id.toString()}
                      id={option.id.toString()}
                    />
                    <Label htmlFor={option.id.toString()}>{option.text}</Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
            <Button
              className="mt-4"
              onClick={handleVote}
              disabled={!selectedOption}
            >
              Vote
            </Button>
          </>
        ) : (
          <div className="space-y-4">
            {poll.options.map((option) => (
              <div key={option.id} className="space-y-2">
                <Label>{option.text}</Label>
                <div className="relative h-2 rounded-full bg-secondary">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary transition-all duration-500"
                    style={{
                      width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {option.votes} votes (
                  {totalVotes > 0
                    ? Math.round((option.votes / totalVotes) * 100)
                    : 0}
                  %)
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
