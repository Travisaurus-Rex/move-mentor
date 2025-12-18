'use client'

import { useState } from 'react'

export default function NewWorkoutPage() {
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    console.log({
      date,
      notes,
    })
  }

  return (
    <main style={{ padding: 24, maxWidth: 600 }}>
      <h1>Create Workout</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            Date
            <br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label>
            Notes
            <br />
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </label>
        </div>

        <button type="submit">Save Workout</button>
      </form>
    </main>
  )
}
