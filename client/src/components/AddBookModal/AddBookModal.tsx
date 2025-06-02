import {
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
  Box,
  Chip,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import {
  useCallback,
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { addBook, updateBook } from "../../redux/booksSlice";
import { v4 } from "uuid";
import type { Book } from "../../redux/types";
import { useAppDispatch } from "../../redux/hooks";
import UploadWidget from "../UploadWidget/UploadWidget.tsx";
import React from "react";
interface AddBookModalProps {
  open: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  initialData?: Book;
  setBook?: Dispatch<SetStateAction<Book | null>>;
}

const AddBookModal: FC<AddBookModalProps> = ({
  open,
  onClose,
  mode,
  initialData,
  setBook,
}) => {
  const isEdit: boolean = mode === "edit";
  const dispatch = useAppDispatch();
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [form, setForm] = useState<Book>(
    initialData ?? {
      id: v4(),
      title: "",
      author: "",
      published: 0,
      description: "",
      category: [],
      image: "",
    }
  );

  useEffect(() => {
    setForm(
      initialData ?? {
        id: v4(),
        title: "",
        author: "",
        published: 0,
        description: "",
        category: [],
        image: "",
      }
    );
  }, [initialData, open]);

  const handleChange = useCallback(
    (field: keyof Book) =>
      (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm((prev) => ({
          ...prev,
          [field]:
            field === "published"
              ? Number(event.target.value)
              : event.target.value,
        }));
      },
    []
  );

  const handleAddCategory = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const trimmed: string = categoryInput.trim();
      if (
        trimmed &&
        !form.category.includes(trimmed) &&
        form.category.length < 3
      ) {
        setForm((prev) => ({ ...prev, category: [...prev.category, trimmed] }));
      }
      setCategoryInput("");
    },
    [categoryInput, form.category]
  );

  const handleRemoveCategory = useCallback((cat: string) => {
    setForm((prev) => ({
      ...prev,
      category: prev.category.filter((c) => c !== cat),
    }));
  }, []);
  const handleSubmit = useCallback(async () => {
    const currentYear: number = new Date().getFullYear();
    if (
      !form.title.trim() ||
      !form.author.trim() ||
      (form.published &&
        (form.published < 0 || form.published > currentYear)) ||
      form.description.length === 0 ||
      form.description.length > 940 ||
      form.category.length < 3 ||
      !form.image.trim()
    ) {
      alert("Please fill in the form correctly.");
      return;
    }
    if (mode === "add") {
      dispatch(addBook(form));
    } else {
      const res = await dispatch(updateBook(form));
      if (updateBook.fulfilled.match(res) && setBook) {
        setBook(res.payload);
      }
    }
    onClose();
  }, [form, mode, dispatch, setBook, onClose]);
  const updateForm = useCallback((newData: Partial<Book>): void => {
    setForm((prev) => ({ ...prev, ...newData }));
  }, []);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Book" : "Add Your Book"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={handleChange("title")}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 25 } }}
            required
            helperText={`${form.title.length}/25`}
          />
          <TextField
            label="Author"
            value={form.author}
            onChange={handleChange("author")}
            fullWidth
            slotProps={{ htmlInput: { maxLength: 25 } }}
            required
            helperText={`${form.author.length}/25`}
          />
          <TextField
            label="Published Year"
            type="number"
            required
            value={form.published || ""}
            slotProps={{ htmlInput: { maxLength: 4, minLength: 4 } }}
            onChange={handleChange("published")}
            fullWidth
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            rows={4}
            slotProps={{ htmlInput: { maxLength: 940 } }}
            helperText={`${form.description.length}/940`}
          />
          <Box>
            <TextField
              label="Add category"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                e.key === "Enter" && handleAddCategory(e)
              }
              fullWidth
            />
            <Stack direction="column" spacing={1} mt={1}>
              {form.category.map((cat: string) => (
                <Chip
                  key={cat}
                  label={cat}
                  onDelete={() => handleRemoveCategory(cat)}
                />
              ))}
            </Stack>
            <Typography variant="caption" color="textSecondary">
              You can add up to 3 categories.
            </Typography>
          </Box>

          <Box>
            <UploadWidget
              uwConfig={{
                multiple: true,
                cloudName: "dg9zhqqmq",
                uploadPreset: "estate",
                clientAllowedFormats: ["jpg", "jpeg", "png", "gif", "webp"],
                folder: "books",
              }}
              setState={updateForm}
            />

            {form.image && (
              <Box mt={2}>
                <Typography variant="caption" color="textSecondary">
                  Preview:
                </Typography>
                <Box
                  component="img"
                  src={form.image}
                  alt="Preview"
                  sx={{
                    width: "100%",
                    maxHeight: 200,
                    objectFit: "contain",
                    borderRadius: 1,
                    mt: 1,
                  }}
                />
              </Box>
            )}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {isEdit ? "Save" : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default React.memo(AddBookModal);
