"use client";

import { useState } from "react";
import { createWorkout } from "../actions";
import { redirect } from "next/navigation";
import { Card } from "@/app/components/Card";
import { Button } from "@/app/components/Button";

export default function NewWorkoutPage() {
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = await createWorkout({ date, notes });
    redirect(`/workouts/${id}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-xl p-10">
        <h1 className="text-2xl font-semibold text-gray-900 mb-8">
          Create Workout
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="
                w-full
                rounded-lg
                bg-[var(--bg-dark)]
                px-4 py-3
                text-gray-900
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="
                w-full
                rounded-lg
                bg-[var(--bg-dark)]
                px-4 py-3
                text-gray-900
                shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                resize-none
              "
            />
          </div>

          <div className="pt-4">
            <Button className="w-full" variant="blue" type="submit">
              Save Workout
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
