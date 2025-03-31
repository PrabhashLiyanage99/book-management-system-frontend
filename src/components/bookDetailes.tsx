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
                    src={selectedBook.coverImage}
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
                Harry Potter, a young boy raised by his cruel aunt and uncle, discovers on his 11th birthday that he is a wizard and has been accepted into Hogwarts School of Witchcraft and Wizardry. At Hogwarts, he befriends Ron Weasley and Hermione Granger, learns magic, and uncovers secrets about his past. He finds out that his parents were murdered by the dark wizard Lord Voldemort, who mysteriously failed to kill baby Harry, leaving him with a lightning-shaped scar. Over the years, Harry faces numerous challenges, including the mystery of the Philosopher’s Stone, the deadly Chamber of Secrets, and the return of Voldemort, who seeks to regain power and take over the wizarding world.
                </Typography>
                <Typography variant="body1" paragraph>
                As Voldemort rises again, Harry learns of a prophecy that foretells his role in the final battle against the Dark Lord. With the help of his friends and mentors like Dumbledore, he searches for Horcruxes, objects containing pieces of Voldemort’s soul, to defeat him. In a climactic battle at Hogwarts, Harry ultimately destroys the last Horcruxes and defeats Voldemort once and for all. After the war, peace is restored, and Harry goes on to build a family of his own. His journey from an orphaned boy to the hero of the wizarding world cements his legacy as one of the greatest wizards in history.
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