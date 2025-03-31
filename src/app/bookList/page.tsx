"use client";
import React, { useState, useEffect} from "react";
import { gql, useQuery } from "@apollo/client";
import { Container, CircularProgress, Paper, TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, IconButton, Menu, MenuItem, TablePagination } from "@mui/material";
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
  query GetAllBooks($page: Int, $pageSize: Int) {
    getAllBooks (page: $page, pageSize: $pageSize){
    books{
      id
      title
      author
      publishedYear
      genre
      coverImage
    }
      totalCount
    }
  }
`;
const BookList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(0);
    const { loading, error, data , refetch} = useQuery(GET_BOOKS_QUERY, {
      variables: { page: page + 1, pageSize: rowsPerPage},
      fetchPolicy: "network-only"
    });
    const [open, setOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuBookId, setMenuBookId] = useState<string | null>(null);
    const [selectedEditBook, seSelectedEditBook] = useState<Book | null>(null)
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
      if (data?.getAllBooks?.books) {
        setBooks(data.getAllBooks.books);
        setTotalCount(data.getAllBooks.totalCount);
      }
    }, [data]);
    

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
      const updatedBooks = books.filter((book) => book.id !== deletedBookId);
      refetch();
    }

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      const maxPage = Math.ceil(totalCount / rowsPerPage) -1;
      if (newPage >= 0 && newPage <= maxPage) {
        setPage(newPage);
      }
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
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
                {books.length >= 0 ? (
                  books.map((book) => (
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

          <TablePagination
          rowsPerPageOptions={[5,10,25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {selectedBook && (
            <BookPopup open={open} onClose={() => setOpen(false)} selectedBook={selectedBook}  />
          )}
          {selectedEditBook && (
            <EditBookForm open={open} onClose={() => setOpen(false)} book={selectedEditBook} />
          )}
        </Container>
      );
    };
    
    export default BookList;