"use client";
import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, CircularProgress, Paper, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem, TablePagination, Grid, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookPopup from "@/components/bookDetailes";
import EditBookForm from "@/components/form-editBook";
import DeleteBookButton from "@/components/deleteButton";
import Header from "@/components/Header";
import { GET_BOOKS_QUERY } from "@/graphql/mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Button } from "@mui/material";
import { Route } from "@mui/icons-material";
import { useRouter } from "next/router";

interface Book {
    id: string;
    title: string;
    author: string;
    publishedYear: string;
    genre: string;
    coverImage?: string;
}

const BookList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [titleFilter, setTitleFilter] = useState("");
    const [authorFilter, setAuthorFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    
    const { loading, error, data, refetch } = useQuery(GET_BOOKS_QUERY, {
        variables: { page: page + 1, pageSize: rowsPerPage, title: titleFilter, author: authorFilter, genre: genreFilter },
        fetchPolicy: "network-only"
    });

    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedEditBook, setSelectedEditBook] = useState<Book | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuBookId, setMenuBookId] = useState<string | null>(null);
    const [descriptionOpen, setDescriptionOpen] = useState(false);

    useEffect(() => {
        refetch();
    }, [page, rowsPerPage, titleFilter, authorFilter, genreFilter, refetch]);

    if (loading) return
     <Container sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
    </Container>;

    if (error) return <Container sx={{ mt: 4 }}><Typography color="error">Error loading books: {error?.message}</Typography></Container>;

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, filterType: string) => {
        const value = e.target.value;
        if (filterType === "title") setTitleFilter(value);
        else if (filterType === "author") setAuthorFilter(value);
        else if (filterType === "genre") setGenreFilter(value);
    };

    const handleRowClick = (book: Book) => {
      setSelectedBook(book);
      setDescriptionOpen(true);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, bookId: string) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
      setMenuBookId(bookId);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
      setMenuBookId(null);
    }

    const handleDeleteSuccess = (deletedBookId: string) => {
      const updatedBooks = data?.getAllBooks?.books.filter((book: Book) => book.id !== deletedBookId);
      refetch();
      toast.success("Book deleted successfully!");
    }
    const handleEditSuccess = () => {
      toast.success("Book edited successfully!");
      setOpen(false);
      refetch();
  };

    return (
        <div>
            <Header />
            <Container>
              
                <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginTop: "20px" }}>Book List</Typography>
                <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
                    <Grid item xs={12} sm={4}><TextField label="Title" fullWidth value={titleFilter} onChange={(e) => handleFilterChange(e, "title")} variant="outlined" /></Grid>
                    <Grid item xs={12} sm={4}><TextField label="Author" fullWidth value={authorFilter} onChange={(e) => handleFilterChange(e, "author")} variant="outlined" /></Grid>
                    <Grid item xs={12} sm={4}><TextField label="Genre" fullWidth value={genreFilter} onChange={(e) => handleFilterChange(e, "genre")} variant="outlined" /></Grid>
                </Grid>
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
                            {data?.getAllBooks?.books.length > 0 ? (
                                data.getAllBooks.books.map((book: Book) => (
                                    <TableRow key={book.id} hover sx={{ cursor: "pointer" }}>
                                        <TableCell>{book.coverImage ? <img src={book.coverImage} alt={book.title} width={140} height={175} /> : <Typography>No Image</Typography>}</TableCell>
                                        <TableCell onClick={(event) =>{event.stopPropagation; handleRowClick(book)}}>{book.title}</TableCell>
                                        <TableCell onClick={(event) =>{event.stopPropagation; handleRowClick(book)}}>{book.author}</TableCell>
                                        <TableCell onClick={(event) =>{event.stopPropagation; handleRowClick(book)}}>{book.publishedYear}</TableCell>
                                        <TableCell onClick={(event) =>{event.stopPropagation; handleRowClick(book)}}>{book.genre}</TableCell>
                                        <TableCell align="right">
                                          <IconButton onClick={(event) => handleMenuOpen(event, book.id) }>
                                            <MoreVertIcon/>
                                          </IconButton>
                                          <Menu anchorEl={anchorEl} open={Boolean(anchorEl && menuBookId === book.id)} onClose={handleMenuClose}>
                                            <MenuItem onClick={(event) => {event.stopPropagation(); setSelectedEditBook(book); setOpen(true); }}>Edit</MenuItem>
                                            <MenuItem onClick={(event) => {event.stopPropagation();}}>
                                              <DeleteBookButton bookId={book.id} OnSuccess={() => { handleMenuClose(); handleDeleteSuccess(book.id)}} />
                                            </MenuItem>
                                          </Menu>
                                        </TableCell>
                                    </TableRow>
                                  ))
                            ) : (
                                <TableRow><TableCell colSpan={5} style={{ textAlign: "center" }}>No books available</TableCell></TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" 
                  count={data?.getAllBooks?.totalCount || 0} 
                  rowsPerPage={rowsPerPage} 
                  page={page} 
                  onPageChange={(_, newPage) => setPage(newPage)} 
                  onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))} 
                />
                {selectedBook && <BookPopup open={descriptionOpen} onClose={() => setDescriptionOpen(false)} selectedBook={selectedBook} />}
                {selectedEditBook && <EditBookForm open={open} onClose={() => setOpen(false)} book={selectedEditBook} onSuccess={handleEditSuccess} />}
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
            </Container>
        </div>
    );
};

export default BookList;
