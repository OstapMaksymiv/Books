import prisma from "../prisma/prisma.js";
export const getBooks = async (_req, res) => {
    const books = await prisma.book.findMany();
    res.json(books);
};
export const getBook = async (req, res) => {
    const book = await prisma.book.findUnique({
        where: { id: req.params.id },
    });
    if (book)
        res.json(book);
    else
        res.status(404).json({ error: "Not found" });
};
export const addBook = async (req, res) => {
    const { title, author, published, description, category, image } = req.body;
    const newBook = await prisma.book.create({
        data: {
            title,
            author,
            published: Number(published),
            description,
            category,
            image,
        },
    });
    res.status(201).json(newBook);
};
export const updateBook = async (req, res) => {
    const { id } = req.params;
    const {id: _id, ...updateDate} = req.body;
    const updated = await prisma.book.update({
        where: { id },
        data: updateDate,
    });
    res.json(updated);
};
export const deleteBook = async (req, res) => {
    const { id } = req.params;
    await prisma.book.delete({ where: { id } });
    res.status(204).end();
};