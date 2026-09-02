"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBookPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("WANT_TO_READ");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [rating, setRating] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          status,
          notes: notes || null,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to add book");
      }

      router.push("/books");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl p-8">
      <h1 className="mb-6 text-3xl font-bold">Add Book</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="mb-1 block font-medium">
            Title
          </label>

          <input
            id="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="author" className="mb-1 block font-medium">
            Author
          </label>

          <input
            id="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            className="w-full rounded border p-2"
          />
        </div>

        <div>
          <label htmlFor="status" className="mb-1 block font-medium">
            Status
          </label>

          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full rounded border p-2"
          >
            <option value="WANT_TO_READ">Want to Read</option>
            <option value="READING">Reading</option>
            <option value="FINISHED">Finished</option>
          </select>
        </div>

        <div>
          <label htmlFor="notes" className="mb-1 block font-medium">
            Notes
          </label>

          <textarea
            id="notes"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Book"}
        </button>
      </form>
    </main>
  );
}