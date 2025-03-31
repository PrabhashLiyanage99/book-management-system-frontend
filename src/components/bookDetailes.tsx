import { Box, Button, Dialog, DialogActions, DialogContent, Divider, Typography } from "@mui/material";
import React from "react";
import { Book } from "@/interface/bookSInterface";

interface BookPopupProps {
    open: boolean;
    onClose: () => void;
    selectedBook: Book | null;
}

const BookPopup = ({ open, onClose, selectedBook }: BookPopupProps) => {
    
    if (!selectedBook) return null;
    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <Box sx={{ paddingBottom: 0, paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
                <Typography variant="h4" gutterBottom>
                {selectedBook.title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    By {selectedBook.author}
                </Typography>  
            </Box>

            <DialogContent sx={{  paddingTop: 0 }}>
            <Box display="flex" alignItems="flex-end" >
                <Box>
                <Typography variant="body2">
                    Published Year: <strong>{selectedBook.publishedYear}</strong>
                </Typography>
                <Typography variant="body2">
                    Genre: <strong>{selectedBook.genre}</strong>
                </Typography>
                </Box>
                
                <Box sx={{ mt: 2 }} flex={1} display="flex" justifyContent="center" alignItems="flex-end" >
                <img
                    src="https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale,dpr_1.5/jackets/9781408855713.jpg"
                    alt={selectedBook.title}
                    width={200}
                    height={255}
                    style={{ borderRadius: "8px", objectFit: "cover" }}
                />
                </Box>
            </Box>
                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Synopsis
                </Typography>
                <Typography variant="body1" paragraph>
                Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?
                </Typography>
                <Typography variant="body1" paragraph>
                Nora Seed finds herself faced with this decision. Faced with the possibility of changing her life for a new one, following a different career, undoing old breakups, realizing her dreams of becoming a glaciologist; she must search within herself as she travels through the Midnight Library to decide what is truly fulfilling in life, and what makes it worth living in the first place.
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box>
                    <Button variant="contained" color="primary">
                        Mark as Read
                    </Button>

                    <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
                    Add to Wishlist
                    </Button>
                </Box>
            </DialogContent>

            <DialogActions sx={{ padding: 2 }}>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookPopup;