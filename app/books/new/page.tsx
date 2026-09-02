"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookForm, {
  BookFormValues,
} from "@/component/BookForm";

export default function NewBookPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(values: BookFormValues) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const responseData = await response.json();

      if (!response.ok) {
        const validationMessage = responseData.errors
          ?.map((issue: { message: string }) => issue.message)
          .join(", ");

        throw new Error(
          validationMessage ||
            responseData.message ||
            "Unable to add book"
        );
      }

      router.push("/books");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Personal Library
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Add a new book
        </h1>

        <p className="mt-2 text-stone-600">
          Add a book and choose where it belongs in your reading journey.
        </p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <BookForm
          submitLabel="Add Book"
          saving={saving}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}