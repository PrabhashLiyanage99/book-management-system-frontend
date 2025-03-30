"use client";
import React from "react";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, CircularProgress, Paper, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import BookPopup from "@/components/bookDetailes";

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
    const { loading, error, data } = useQuery<{ getAllBooks: Book[] }>(GET_BOOKS_QUERY);
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

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
                    <TableRow key={book.id} hover onClick={() => handleRowClick(book)}
                    sx={{ cursor: "pointer" , '&:hover': { backgroundColor: 'action.hover', boxShadow: 1 } }}>
                      <TableCell>
                        {book.coverImage ? (
                          <img src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781408855713.jpg" alt={book.title} width={140} height={175} />
                        ) : (
                          <Typography>No Image</Typography>
                        )}
                      </TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.publishedYear}</TableCell>
                      <TableCell>{book.genre}</TableCell>
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