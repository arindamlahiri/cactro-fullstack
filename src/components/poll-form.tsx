"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { createPoll } from "@/server/actions";
import Link from "next/link";

export function PollForm() {
  const [options, setOptions] = useState<string[]>(["", ""]);
  const [question, setQuestion] = useState("");
  const [pollId, setPollId] = useState<string | null>(null);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = options.filter((opt) => opt.trim());

    if (question.trim() && validOptions.length > 1) {
      const pollId = await createPoll({
        question,
        optionTitles: validOptions,
      });
      setPollId(pollId);
      setQuestion("");
      setOptions(["", ""]);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full space-y-4 rounded-lg border p-4 md:w-1/2"
      >
        <div className="space-y-2">
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Enter your question"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Options</Label>
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                required
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOption(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={addOption}>
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
          <Button type="submit">Create Poll</Button>
        </div>
      </form>
      {pollId && (
        <p className="mt-4">
          Poll created! Click{" "}
          <Link
            href={`/poll/${pollId}`}
            target="_blank"
            className="text-blue-400 underline"
          >
            here
          </Link>{" "}
          to vote and see results.
        </p>
      )}
    </>
  );
}
