import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { MenuItem, IconButton, CircularProgress, Button, Dialog, DialogContentText, DialogTitle, DialogContent, DialogActions, colors} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DELETE_BOOK_MUTATION = gql`
mutation DeleteBook($id: Int!) {
    deleteBook(id: $id){
        id
    }
}`;

interface DeleteBookButtonProps {
    bookId: string;
    OnSuccess: () => void;
}

const DeleteBookButton: React.FC<DeleteBookButtonProps> = ({ bookId, OnSuccess }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK_MUTATION, {
        variables: { id: bookId },
        onCompleted: OnSuccess
    });

    const handleDelete = () => {
        deleteBook();
        setOpenDialog(false);
    }

    return (
        <>
        <Button variant="contained" color="error" startIcon={loading? <CircularProgress size={20} color='inherit'/> : <DeleteIcon/>}
        onClick={() => setOpenDialog(true)} disabled={loading}>
        {loading ? "Deleting...": "Delete"}
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Delete Book</DialogTitle>
            <DialogContent>Are you sure you want to delete this book</DialogContent>
            <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel          
            </Button>
            <Button onClick={handleDelete} color="error" variant='contained'>
            Delete
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
};

export default DeleteBookButton;