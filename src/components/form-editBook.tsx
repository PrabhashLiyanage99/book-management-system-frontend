"use client";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";

const UPDATE_BOOK_MUTATION = gql`
mutation UpdateBook(
    $id: Int!, 
    $title: String!, 
    $author: String!, 
    $publishedYear: String!, 
    $genre: String!, 
    $coverImage: String
) {
    updateBook(
        id: $id, 
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

interface EditBookFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    book: {
        id: string;
        title: string;
        author: string,
        publishedYear: string;
        genre: string;
        coverImage?: string;
    };
}

 const EditBookForm = ({ open, onClose, book, onSuccess }: EditBookFormProps) => {
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);
    const [publishedYear, setPublishedYear] = useState(book.publishedYear);
    const [coverImage, setCoverImage] = useState(book.coverImage || "");
    const [updateBook, {loading, error}] = useMutation(UPDATE_BOOK_MUTATION);

    const handleSubmit = async () => {
        try {
            console.log({ id: book.id, title, author, publishedYear, genre, coverImage });
            await updateBook({
                variables: { id: book.id, title, author, publishedYear, genre, coverImage}

            });
            onClose();
            onSuccess();
        }catch (err) {
            console.error("Error updating book:",err);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>Edit Book</DialogTitle>
          <DialogContent>
            <TextField 
            autoFocus
            margin="dense"
            label="Book Title" 
            fullWidth 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            />
            <TextField 
            autoFocus
            margin="dense"
            label="Author" 
            fullWidth 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            />
            <TextField 
            autoFocus
            margin="dense"
            label="Genre" 
            fullWidth 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)} 
            />
            <TextField 
            autoFocus
            margin="dense"
            label="Published Year" 
            fullWidth 
            value={publishedYear} 
            onChange={(e) => setPublishedYear(e.target.value)} 
            />
            <TextField 
            autoFocus
            margin="dense"
            label="Cover Image URL" 
            fullWidth 
            value={coverImage} 
            onChange={(e) => setCoverImage(e.target.value)} />
            {loading && <p>Submitting...</p>}
            {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>Update</Button>
          </DialogActions>
        </Dialog>
      );
    };

export default EditBookForm;