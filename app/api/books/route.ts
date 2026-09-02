import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { bookSchema } from "@/lib/validations/book";

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(books);
  } catch {
    return NextResponse.json(
      { message: "Unable to retrieve books" },
      { status: 500 }
    );
  }
  
}

export async function POST(request: Request) {
  try {
    const body = await request.json();


    const result = bookSchema.safeParse(body);

    if (!result.success) {
    return NextResponse.json(
        {
        message: "Invalid book data",
        errors: result.error.issues,
        },
        { status: 400 }
    );
    }

    const book = await prisma.book.create({
        data: result.data,
    });

    return NextResponse.json(book, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unable to create book" },
      { status: 500 }
    );
  }
}