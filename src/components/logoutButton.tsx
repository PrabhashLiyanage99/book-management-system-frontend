"use client";
import { useRouter } from "next/navigation";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import { ExitToApp } from "@mui/icons-material";

const LogoutButton = () => {
    const router = useRouter();
    const client = useApolloClient();
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const handleLogout = async () => {
        setLoading(true);

        try {
            await client.clearStore();
            localStorage.removeItem("token");
            router.push('/');
        } catch (error) {
            console.error("Logout failed",error)
        } finally {
            setLoading(false)
            setOpenDialog(false)
        }
    };

    return (
        <>
        <Button variant="contained" color="error" startIcon={loading? <CircularProgress size={20} color="inherit"/> : <ExitToAppIcon/>}
        onClick={() => setOpenDialog(true)}
        sx={{
            frontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1
        }}
        disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
        </Button>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>Are you sure you want to logout?</DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleLogout} color="error" variant="contained">
                    Logout
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
};

export default LogoutButton;