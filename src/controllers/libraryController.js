import Book from "../models/bookmodel.js";

export const addBook = async (req, res) => {
  try {
     const user= req.user;
    if (req.params.docType !== "books") {
      return res.status(400).json({
        success: false,
        message: "Invalid docType",
      });
    }
    const {
      title,
      author,
      branch,
      status,
      isbn,
      edition,
      shelf,
      copiesTotal,
      description,
    } = req.body;

  const images = req.files.map((file, index) => ({
  uri: file.path,
  publicId: file.filename,
  label:
    index === 0
      ? "Front cover"
      : index === 1
      ? "Back cover"
      : "Photo",
}));

    const book = await Book.create({
        userId: user._id,
      title,
      author,
      branch,
      status,
      isbn,
      edition,
      shelf,
      copiesTotal: Number(copiesTotal),
      copiesAvailable: Number(copiesTotal),
      rating: 0,
      description,
      images,
    });

    return res.status(201).json({
      success: true,
      book,
    });
  } catch (err) {
  console.log(err);
  console.log(err.errors);

  return res.status(500).json({
    success: false,
    message: err.message,
  });
}
};


export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      books,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
