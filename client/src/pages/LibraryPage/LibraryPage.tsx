import {
  Box,
  Button,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useMemo, useState } from "react";
import "./library.scss";
import AddBookModal from "../../components/AddBookModal/AddBookModal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBooks } from "../../redux/booksSlice";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import type { Book } from "../../redux/types";
const LibraryPage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.books);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage: number = 6;
  const paginationItems = useMemo((): Book[] => {
    return items.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [items, currentPage]);
  const totalPages: number = Math.ceil(items.length / rowsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "40px",
        marginY: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Typography
          component="h1"
          sx={{ fontSize: "2rem", textAlign: "center", marginBottom: "20px" }}
        >
          another book - another chance{" "}
          <Typography
            variant="h3"
            component="p"
            sx={{
              color: "#000",
              fontSize: "3rem",
              lineHeight: "2rem",
              filter: "drop-shadow(5px 5px 0px #7EBCEB)",
            }}
          >
            {" "}
            to make history.
          </Typography>
        </Typography>

        <Button
          sx={{
            backgroundColor: "#fff",
            borderRadius: "12px",
            color: "#121212",
            fontSize: "1rem",
            fontWeight: 400,
            lineHeight: 1,
            padding: "10px 15px",
            transition: ".4s",
            border: "2px solid black",
            textTransform: "none",
            userSelect: "none",
            touchAction: "manipulation",
            "&:hover": {
              boxShadow: "0 0 0",
            },
          }}
          onClick={() => setModalOpen(true)}
        >
          Add yours now!
        </Button>
      </Box>
      <AddBookModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        mode="add"
      />
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "row",
          width: "1200px",
          margin: "50px auto 0 auto",
          borderRadius: "20px",
          padding: "1.4rem 2rem",
          border: "2px solid black",
        }}
      >
        <TextField
          placeholder="Search Book"
          variant="standard"
          fullWidth
          slotProps={{
            input: {
              disableUnderline: true,
              sx: {
                color: "#000000",
                fontSize: "1.3rem",
                lineHeight: "2rem",

                "& input::placeholder": {
                  color: "#2689E0",
                  opacity: 1,
                },
              },
            },
          }}
        />

        <Button
          sx={{
            color: "#7881A1",
            fontSize: "2rem",
            lineHeight: "2rem",
            verticalAlign: "middle",
            transition: "color .25s",
          }}
        >
          <SearchIcon sx={{ color: "black", width: "50px" }} />
        </Button>
      </Box>
      {error ? (
        <Typography
          textAlign="center"
          component="p"
          color="error"
          fontWeight="bold"
        >
          Sorry we have error <br /> {error}
        </Typography>
      ) : loading ? (
        <Loader isLoading={loading} />
      ) : items.length === 0 ? null : (
        <>
          <Grid
            container
            spacing={2}
            sx={{ gap: "25px 15px", minWidth: "100%" }}
          >
            {paginationItems.map((book) => (
              <Card key={book.id} book={book} />
            ))}
          </Grid>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => handlePageChange(page)}
              shape="rounded"
              color="primary"
            />
          </Stack>
        </>
      )}
    </Box>
  );
};

export default LibraryPage;
