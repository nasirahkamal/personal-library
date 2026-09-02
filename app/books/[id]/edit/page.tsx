"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BookForm, {
  BookFormValues,
} from "@/component/BookForm";

export default function EditBookPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [initialValues, setInitialValues] =
    useState<BookFormValues | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        const response = await fetch(`/api/books/${params.id}`);

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message || "Unable to retrieve book"
          );
        }

        setInitialValues({
          title: responseData.title,
          author: responseData.author,
          status: responseData.status,
          rating: responseData.rating,
          notes: responseData.notes,
        });
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    loadBook();
  }, [params.id]);

  async function handleSubmit(values: BookFormValues) {
    setSaving(true);
    setError("");

    try {
      const response = await fetch(`/api/books/${params.id}`, {
        method: "PATCH",
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
            responseData.error ||
            responseData.message ||
            "Unable to update book"
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

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-6 py-10">
        Loading book...
      </main>
    );
  }

  if (!initialValues) {
    return (
      <main className="mx-auto max-w-xl px-6 py-10 text-red-600">
        {error || "Book not found"}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-emerald-700">
          Personal Library
        </p>

        <h1 className="text-3xl font-bold tracking-tight">
          Edit book
        </h1>

        <p className="mt-2 text-stone-600">
          Update the book information and reading progress.
        </p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
        <BookForm
          initialValues={initialValues}
          submitLabel="Save Changes"
          saving={saving}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}