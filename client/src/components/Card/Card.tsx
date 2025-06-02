import { Box, Button, Grid, Typography } from "@mui/material";
import { type FC } from "react";
import type { Book } from "../../redux/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 } from "uuid";
import { useAppDispatch } from "../../redux/hooks";
import { deleteBook } from "../../redux/booksSlice";
import { Link } from "react-router-dom";
interface CardBook {
  book: Book;
}
const Card: FC<CardBook> = ({ book }) => {
  const dispatch = useAppDispatch();
  return (
    <Grid
      size={6}
      sx={{
        position: "relative",
        display: "flex",
        border: "2px solid black",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "#7EBCEB 5px 5px 0px",
        wordBreak: "break-word",
        whiteSpace: "normal",
      }}
    >
      <Box component="img" className="book-img" src={book.image} alt=""></Box>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography variant="h6" component="h4" sx={{ fontSize: "1.3rem" }}>
          {book.title}
        </Typography>
        <ul className="book-categories">
          {book.category.map((cat) => (
            <Typography key={v4()} component="li">
              {cat.length > 10 ? `${cat.slice(0, 10)}...` : cat}
            </Typography>
          ))}
        </ul>
        <Typography component="p" sx={{ fontSize: "0.9rem" }}>
          {book.description.length > 200
            ? `${book.description.slice(0, 200)}...`
            : book.description}
        </Typography>
        <Link to={`/book/${book.id}`} className="book-link">
          Explore
        </Link>
      </Box>
      <Button
        onClick={() => dispatch(deleteBook(book.id))}
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          transition: "0.5s",
          "&:hover": {
            backgroundColor: "transparent",
            transform: "scale(1.1)",
          },
        }}
      >
        <DeleteIcon
          sx={{
            color: "black",
            width: "40px",
            height: "40px",
            bgcolor: "rgba(220, 220, 220, 0.33)",
            borderRadius: "50%",
            padding: "10px",
            transition: "0.8s",
            "&:hover": {
              bgcolor: "#7EBCEB",
            },
          }}
        />
      </Button>
    </Grid>
  );
};

export default Card;
