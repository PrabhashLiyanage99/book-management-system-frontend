import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

interface AddBookFormProps{
  open:boolean;
  onClose: () => void;
}

export default function AddBookForm({ open, onClose }: AddBookFormProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Book</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Book Title" fullWidth />
        <TextField margin="dense" label="Author" fullWidth />
        <TextField margin="dense" label="Category" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="primary">Submit</Button>
      </DialogActions>
    </Dialog>
  );
}