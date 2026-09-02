import { z } from "zod";

export const bookSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(200, "Title cannot exceed 200 characters"),

    author: z
      .string()
      .trim()
      .min(1, "Author is required")
      .max(150, "Author cannot exceed 150 characters"),

    status: z
      .enum(["WANT_TO_READ", "READING", "FINISHED"])
      .default("WANT_TO_READ"),

    rating: z
      .number()
      .int()
      .min(1)
      .max(5)
      .nullable()
      .optional(),

    notes: z
      .string()
      .trim()
      .max(1000, "Notes cannot exceed 1000 characters")
      .nullable()
      .optional(),
  })
  .refine(
    (book) => book.status === "FINISHED" || book.rating == null,
    {
      message: "Only finished books can have a rating",
      path: ["rating"],
    }
  );