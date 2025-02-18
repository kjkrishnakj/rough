import mongoose from "../../middleware/mongoose"; // Ensure you have a MongoDB connection file
import Book from "../../models/Book"; // Import your Mongoose model

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  try {
    await mongoose();
    const { slug } = req.body;

    // Now update the book and return the updated version
    const book = await Book.findOneAndUpdate(
      { slug },
      { $inc: { availableQty: -1 } },
      { new: true }
    );

    if (!book) {
      console.log("No book found for slug:", slug);
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("After update:", book);  // Log the updated book

    res.status(200).json({ success: true, availableQty: book.availableQty });
  } catch (error) {
    console.error("Error occurred during update:", error); // Log detailed error
    res.status(500).json({ error: "Internal Server Error" });
  }
}
