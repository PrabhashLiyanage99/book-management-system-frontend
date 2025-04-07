"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const ADD_BOOK_MUTATION = gql`
  mutation AddBook(
    $title: String!, 
    $author: String!, 
    $publishedYear: String!, 
    $genre: String!, 
    $coverImage: String
  ) {
    addBook(
      title: $title, 
      author: $author, 
      publishedYear: $publishedYear, 
      genre: $genre, 
      coverImage: $coverImage
    ) {
      id
      title
      author
      publishedYear
      genre
      coverImage
    }
  }
`;

interface AddBookFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddBookForm({ open, onClose, onSuccess }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: ""
  });

  const [addBook, { loading, error }] = useMutation(ADD_BOOK_MUTATION);
  const currentYear = new Date().getFullYear();

  const validateForm = () => {
    const newErrors: any = {};
    if (!title) newErrors.title = "Book title is required";
    if (!author) newErrors.author = "Author is required";
    if (!genre) newErrors.genre = "Genre is required";
    if (!publishedYear){ 
      newErrors.publishedYear = "Published year is required";
    }else if (!/^\d{4}$/.test(publishedYear)) {
      newErrors.publishedYear = "This is not a year"
    }else if (+publishedYear < 1000 || +publishedYear > currentYear){
      newErrors.publishedYear = `Wrong year`
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
      await addBook({ 
        variables: {
          title, 
          author, 
          publishedYear, 
          genre, 
          coverImage
        }
      });
      onClose();
      onSuccess();
      setTitle("");
      setAuthor("");
      setGenre("");
      setPublishedYear("");
      setCoverImage("");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <TextField 
          autoFocus 
          margin="dense" 
          label="Book Title" 
          fullWidth 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField 
          margin="dense" 
          label="Author" 
          fullWidth 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          error={!!errors.author}
          helperText={errors.author}
        />
        <TextField 
          margin="dense" 
          label="Genre" 
          fullWidth 
          value={genre} 
          onChange={(e) => setGenre(e.target.value)}
          error={!!errors.genre}
          helperText={errors.genre}
        />
        <TextField 
          margin="dense" 
          label="Published Year" 
          fullWidth 
          value={publishedYear} 
          onChange={(e) => setPublishedYear(e.target.value)}
          error={!!errors.publishedYear}
          helperText={errors.publishedYear}
        />
        <TextField 
          margin="dense" 
          label="Cover Image URL" 
          fullWidth 
          value={coverImage} 
          onChange={(e) => setCoverImage(e.target.value)}
        />
        {loading && <p>Submitting...</p>}
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
