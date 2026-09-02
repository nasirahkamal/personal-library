import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const bookId = Number(id);

    if (Number.isNaN(bookId)) {
      return NextResponse.json(
        { message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book) {
      return NextResponse.json(
        { message: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error("GET /api/books/:id failed:", error);

    return NextResponse.json(
      { message: "Unable to retrieve book" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const bookId = Number(id);
    const body = await request.json();

    if (Number.isNaN(bookId)) {
      return NextResponse.json(
        { message: "Invalid book ID" },
        { status: 400 }
      );
    }

    if (!body.title || !body.author) {
      return NextResponse.json(
        { message: "Title and author are required" },
        { status: 400 }
      );
    }

    const book = await prisma.book.update({
    where: {
        id: bookId,
    },
    data: result.data,
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error("PATCH /api/books/:id failed:", error);

    return NextResponse.json(
      { message: "Unable to update book" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params;
    const bookId = Number(id);

    if (Number.isNaN(bookId)) {
      return NextResponse.json(
        { message: "Invalid book ID" },
        { status: 400 }
      );
    }

    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    return NextResponse.json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/books/:id failed:", error);

    return NextResponse.json(
      { message: "Unable to delete book" },
      { status: 500 }
    );
  }
}