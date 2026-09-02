"use client";

import Link from "next/link";
import { useEffect, useState } from "react";



type Book = {
  id: number;
  title: string;
  author: string;
  status: "WANT_TO_READ" | "READING" | "FINISHED";
  rating: number | null;
  notes: string | null;
};

const statusDetails = {
  WANT_TO_READ: {
    label: "Want to Read",
    className: "bg-amber-100 text-amber-800",
  },
  READING: {
    label: "Reading",
    className: "bg-blue-100 text-blue-800",
  },
  FINISHED: {
    label: "Finished",
    className: "bg-emerald-100 text-emerald-800",
  },
};

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    async function loadBooks() {
      try {
        const response = await fetch("/api/books");

        if (!response.ok) {
          throw new Error("Failed to retrieve books");
        }

        const data: Book[] = await response.json();
        setBooks(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Something went wrong"
        );
      } finally {
        setLoading(false);
      }
    }

    loadBooks();
  }, []);

  <Link
    href={'/books/${book.id}/edit'}
    className="mr-2 inline-block rounded bg-blue-600 px-3 py-2 text-sm text-white"
    >
    Edit
    </Link>

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
        "Are you sure you want to delete this book?"
    );
 
    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`/api/books/${id}`, {
        method: "DELETE",
        });

        if (!response.ok) {
        throw new Error("Unable to delete book");
        }

        setBooks((currentBooks) =>
        currentBooks.filter((book) => book.id !== id)
        );
    } catch (error) {
        setError(
        error instanceof Error ? error.message : "Something went wrong"
        );
    }
    }

    const filteredBooks = books.filter((book) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
        book.title.toLowerCase().includes(searchText) ||
        book.author.toLowerCase().includes(searchText);

    const matchesStatus =
        statusFilter === "ALL" || book.status === statusFilter;

    return matchesSearch && matchesStatus;
    });

  
  const summary = {
    total: books.length,
    wantToRead: books.filter(
      (book) => book.status === "WANT_TO_READ"
    ).length,
    reading: books.filter(
      (book) => book.status === "READING"
    ).length,
    finished: books.filter(
      (book) => book.status === "FINISHED"
    ).length,
  };
  
  if (loading) {
    return <main className="p-8">Loading books...</main>;
  }

  if (error) {
    return <main className="p-8 text-red-600">{error}</main>;
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
    <div className="mb-6 flex items-center justify-between">
    </div>

    <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">Total</p>
        <p className="mt-1 text-2xl font-bold">{summary.total}</p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">Want to Read</p>
        <p className="mt-1 text-2xl font-bold">
          {summary.wantToRead}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">Reading</p>
        <p className="mt-1 text-2xl font-bold">
          {summary.reading}
        </p>
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-sm text-gray-500">Finished</p>
        <p className="mt-1 text-2xl font-bold">
          {summary.finished}
        </p>
      </div>
    </section>

    <div className="mb-6 grid gap-3 sm:grid-cols-2">
    <input
        type="search"
        placeholder="Search by title or author"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        className="rounded border p-2"
    />

    <select
        value={statusFilter}
        onChange={(event) => setStatusFilter(event.target.value)}
        className="rounded border p-2"
    >
        <option value="ALL">All statuses</option>
        <option value="WANT_TO_READ">Want to Read</option>
        <option value="READING">Reading</option>
        <option value="FINISHED">Finished</option>
    </select>
    </div>

      {filteredBooks.length === 0 ? (
        <p>No books match your search or filter.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredBooks.map((book) => (
            <article
                key={book.id}
                className="rounded-lg border border-gray-200 p-5 shadow-sm"
                >
                <h2 className="text-xl font-semibold">{book.title}</h2>

                <p className="mt-1 text-gray-600">by {book.author}</p>

                <span
                className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                  statusDetails[book.status].className
                }`}
              >
                {statusDetails[book.status].label}
              </span>

                {book.rating !== null && (
                    <p className="mt-2">Rating: {book.rating}/5</p>
                )}

                {book.notes && (
                    <p className="mt-3 text-gray-700">{book.notes}</p>
                )}

                <div className="mt-4 flex gap-2">
                    <Link
                    href={`/books/${book.id}/edit`}
                    className="rounded bg-blue-600 px-3 py-2 text-sm text-white"
                    >
                    Edit
                    </Link>

                    <button
                    type="button"
                    onClick={() => handleDelete(book.id)}
                    className="rounded bg-red-600 px-3 py-2 text-sm text-white"
                    >
                    Delete
                    </button>
                </div>
                </article>
          ))}
        </div>
      )}
    </main>
  );
}