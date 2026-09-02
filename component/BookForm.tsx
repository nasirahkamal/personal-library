"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export type BookFormValues = {
  title: string;
  author: string;
  status: "WANT_TO_READ" | "READING" | "FINISHED";
  rating: number | null;
  notes: string | null;
};

type BookFormProps = {
  initialValues?: BookFormValues;
  submitLabel: string;
  saving: boolean;
  error: string;
  onSubmit: (values: BookFormValues) => Promise<void>;
};

const emptyValues: BookFormValues = {
  title: "",
  author: "",
  status: "WANT_TO_READ",
  rating: null,
  notes: null,
};

export default function BookForm({
  initialValues = emptyValues,
  submitLabel,
  saving,
  error,
  onSubmit,
}: BookFormProps) {
  const [title, setTitle] = useState(initialValues.title);
  const [author, setAuthor] = useState(initialValues.author);
  const [status, setStatus] =
    useState<BookFormValues["status"]>(initialValues.status);
  const [rating, setRating] = useState(
    initialValues.rating?.toString() ?? ""
  );
  const [notes, setNotes] = useState(initialValues.notes ?? "");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit({
      title,
      author,
      status,
      rating:
        status === "FINISHED" && rating
          ? Number(rating)
          : null,
      notes: notes.trim() || null,
    });
  }

  return (
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
          maxLength={200}
          className="w-full rounded-lg border border-stone-300 bg-white p-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
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
          maxLength={150}
          className="w-full rounded-lg border border-stone-300 bg-white p-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      <div>
        <label htmlFor="status" className="mb-1 block font-medium">
          Status
        </label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as BookFormValues["status"])
          }
          className="w-full rounded-lg border border-stone-300 bg-white p-3"
        >
          <option value="WANT_TO_READ">Want to Read</option>
          <option value="READING">Reading</option>
          <option value="FINISHED">Finished</option>
        </select>
      </div>

      {status === "FINISHED" && (
        <div>
          <label htmlFor="rating" className="mb-1 block font-medium">
            Rating
          </label>

          <select
            id="rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            className="w-full rounded-lg border border-stone-300 bg-white p-3"
          >
            <option value="">No rating</option>
            <option value="1">1 – Poor</option>
            <option value="2">2 – Fair</option>
            <option value="3">3 – Good</option>
            <option value="4">4 – Very good</option>
            <option value="5">5 – Excellent</option>
          </select>
        </div>
      )}

      <div>
        <label htmlFor="notes" className="mb-1 block font-medium">
          Notes
        </label>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          maxLength={1000}
          rows={5}
          className="w-full rounded-lg border border-stone-300 bg-white p-3 outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving ? "Saving..." : submitLabel}
      </button>

        <Link
            href="/books"
            className="rounded-lg border border-stone-300 bg-white px-5 py-3 font-medium text-stone-700 hover:bg-stone-100"
        >
            Back
        </Link>
    </form>
  );
}