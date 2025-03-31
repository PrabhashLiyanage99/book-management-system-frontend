"use client";
import React from "react";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, CircularProgress, Paper, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BookPopup from "@/components/bookDetailes";
import EditBookForm from "@/components/form-editBook";
import DeleteBookButton from "@/components/deleteButton";
interface Book {
    id: string;
    title: string;
    author: string;
    publishedYear: string;
    genre: string;
    coverImage?: string;
}

const GET_BOOKS_QUERY = gql`
  query GetAllBooks {
    getAllBooks {
      id
      title
      author
      publishedYear
      genre
      coverImage
    }
  }
`;
const BookList = () => {
    const { loading, error, data , refetch} = useQuery<{ getAllBooks: Book[] }>(GET_BOOKS_QUERY);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuBookId, setMenuBookId] = useState<string | null>(null);
    const [selectedEditBook, seSelectedEditBook] = useState<Book | null>(null)
    const [books, setBooks] = useState<Book[]>([]);


    if (loading) return (
       <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <CircularProgress />
        </Container>
    )

    if(error) return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">Error loading books: {error?.message}</Typography>
      </Container>
    );

    const handleRowClick = (book: Book) => {
        setSelectedBook(book);
        setOpen(true);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, bookId: string) => {
      setAnchorEl(event.currentTarget);
      setMenuBookId(bookId);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setMenuBookId(null);
    }

    const handleDeleteSuccess = (deletedBookId: string) => {
      const updatedBooks = data?.getAllBooks.filter((book) => book.id !== deletedBookId);
      refetch();
    }

    return (
        <Container>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: "20px" }}>
            Book List
          </Typography>
          <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cover</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Author</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Genre</TableCell>
                </TableRow>
              </TableHead> 
              <TableBody>
                {data?.getAllBooks?.length || 0 > 0 ? (
                  (data?.getAllBooks ?? []).map((book) => (
                    <TableRow key={book.id} hover 
                    sx={{ cursor: "pointer" , '&:hover': { backgroundColor: 'action.hover', boxShadow: 1 } }}>
                      <TableCell>
                        {book.coverImage ? (
                          <img src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781408855713.jpg" alt={book.title} width={140} height={175} />
                        ) : (
                          <Typography>No Image</Typography>
                        )}
                      </TableCell>
                      <TableCell onClick={() => handleRowClick(book)}>{book.title}</TableCell>
                      <TableCell onClick={() => handleRowClick(book)}>{book.author}</TableCell>
                      <TableCell onClick={() => handleRowClick(book)}>{book.publishedYear}</TableCell>
                      <TableCell onClick={() => handleRowClick(book)}>{book.genre}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={(event) => handleMenuOpen(event, book.id) }>
                          <MoreVertIcon/>
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl && menuBookId === book.id)} onClose={handleMenuClose}>
                          <MenuItem onClick={() => { seSelectedEditBook(book); setOpen(true); }}>Edit</MenuItem>
                          <DeleteBookButton bookId={book.id} OnSuccess={() => { handleMenuClose(); handleDeleteSuccess(book.id)}} />
                        </Menu>
                        {selectedEditBook && (
                        <EditBookForm open={open} onClose={() => setOpen(false)} book={selectedEditBook} />
                          )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: "center" }}>
                      No books available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {selectedBook && (
            <BookPopup open={open} onClose={() => setOpen(false)} selectedBook={selectedBook}  />
          )}
        </Container>
      );
    };
    
    export default BookList;