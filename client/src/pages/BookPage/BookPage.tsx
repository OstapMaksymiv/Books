import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import type { Book } from "../../redux/types";
import axios from "axios";
import "./bookPage.scss";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import Loader from "../../components/Loader/Loader";
const BookPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [isSlowLoading, setIsSlowLoading] = useState<boolean>(false);

  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`http://localhost:3400/api/books/${id}`);
      setBook(res.data);
    };
    fetchBook();
  }, [id]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!book) setIsSlowLoading(true);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [book]);
  return book !== null ? (
    <>
      <Button
        onClick={() => setModalOpen(true)}
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "5%",
          margin: "0",
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <CreateIcon
          sx={{
            width: "50px",
            height: "50px",
            bgcolor: "rgba(188, 201, 217, 0.5)",
            borderRadius: "50%",
            color: "#000",
            padding: "10px",
            transition: ".5s",
            "&:hover": {
              backgroundColor: "#7EBCEB",
            },
          }}
        />
      </Button>
      <AddBookModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        mode="edit"
        initialData={book}
        setBook={setBook}
      />
      <Box
        sx={{
          display: "flex",
          height: "calc(100vh - 120px)",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            minWidth: "1150px",
            justifyContent: "space-between",
            display: "flex",
            gap: "20px",
          }}
        >
          <Box>
            <Box style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <Typography
                component="li"
                sx={{
                  padding: "5px 10px",
                  border: 1,
                  color: "black",
                  borderRadius: 5,
                }}
              >
                {" "}
                ● Author:{" "}
                {book.author.length > 25
                  ? `${book.author.slice(0, 25)}...`
                  : book.author}
              </Typography>

              <Typography
                component="li"
                sx={{
                  padding: "5px 10px",
                  border: 1,
                  color: "black",
                  borderRadius: 5,
                }}
              >
                {" "}
                ● Was published in {book.published}
              </Typography>
            </Box>

            <Typography component="h1" variant="h1" sx={{ fontSize: "3.5rem" }}>
              {book.title.length > 23
                ? `${book.title.slice(0, 23)}...`
                : book.title}
            </Typography>

            <Grid container spacing={2} mb={2}>
              <Grid size={4}>
                <Typography
                  variant="h3"
                  sx={{
                    backgroundColor: "rgba(126, 188, 235, 0.5)",
                    padding: "10px 20px",
                    borderRadius: 4,
                    boxShadow: "-2px 2px 0px black",
                    fontSize: "1rem",
                  }}
                >
                  {book.category[0].length > 23
                    ? `${book.category[0].slice(0, 23)}...`
                    : book.category[0]}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid size={2}>
                <Typography
                  variant="h3"
                  sx={{
                    backgroundColor: "rgba(126, 188, 235, 0.5)",
                    padding: "10px 20px",
                    borderRadius: 4,
                    boxShadow: "-2px 2px 0px black",
                    fontSize: "1rem",
                  }}
                >
                  {book.category[1].length > 8
                    ? `${book.category[1].slice(0, 8)}...`
                    : book.category[1]}
                </Typography>
              </Grid>
              <Grid size={3}>
                <Typography
                  variant="h3"
                  sx={{
                    backgroundColor: "rgba(126, 188, 235, 0.5)",
                    padding: "10px 20px",
                    borderRadius: 4,
                    boxShadow: "-2px 2px 0px black",
                    fontSize: "1rem",
                  }}
                >
                  {book.category[2].length > 17
                    ? `${book.category[2].slice(0, 17)}...`
                    : book.category[2]}
                </Typography>
              </Grid>
            </Grid>

            <Typography
              component="p"
              sx={{
                marginTop: "20px",
                color: "#000",
                wordBreak: "break-word",
                whiteSpace: "normal",
              }}
            >
              {book.description}
            </Typography>
          </Box>
          <Box
            component="img"
            src={book.image}
            alt="Book cover"
            width={300}
            height={450}
            style={{ objectFit: "cover", borderRadius: 8 }}
          />
        </Box>
      </Box>
    </>
  ) : (
    <Loader isLoading={isSlowLoading} />
  );
};

export default BookPage;
