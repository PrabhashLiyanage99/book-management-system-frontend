"use client";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Box, TextField, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import Logo from "../../accets/readmate-logo.png"
import Image from "next/image";
import { useState } from "react";
import AddBookForm from "@/components/form-addBook";
import AuthWrapper from "@/components/AuthWrapper";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logoutButton";


export default function HomePage() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const router = useRouter();

  return (
    <AuthWrapper>
    <div>
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex">
        <Button color="inherit" sx={{marginRight: '50px'}} >
                <Image src={Logo} alt="Read Mate Logo" style={{ height: 40, width: 150}}/>
            </Button>
            <Button color="primary">Home</Button>
            <Button color="primary">Browse</Button>
            <Button color="primary">Categories</Button>
            <Button color="primary">About</Button>
          </Box>
          <LogoutButton/>
        </Toolbar>
      </AppBar>

     
      <Box sx={{ background: "linear-gradient(to right, #ad79e1, #0099f2)", color: "white", textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight="bold">Welcome to Your Digital Library</Typography>
        <Typography>Discover millions of books, manage your collection, and connect with readers worldwide.</Typography>
      </Box>

      <Container sx={{ mt: 5 , backgroundColor: "#fff"}}>
        <Grid container spacing={3}>
          {[
            { icon: <SearchIcon />, title: "Search Books", desc: "Find your next read from our vast collection" },
            { icon: <CategoryIcon />, title: "Browse Categories", desc: "Explore books by genre and topic" },
            { icon: <LibraryBooksIcon />, title: "View Library", desc: "Access your personal book collection", onclick: () => router.push("/bookList") },
            { icon: <AddIcon />, title: "Add New Book", desc: "Add book to your personal book collection", onclick:() => setIsFormVisible(true) },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
                <Button onClick={item.onclick ? item.onclick : undefined} sx={{ textDecoration: "none" }}>
                    <Card sx={{ textAlign: "center", p: 2, boxShadow: 1 }}>
                        <CardContent>
                            <Box sx={{ fontSize: 40 }}>{item.icon}</Box>
                            <Typography variant="h6" fontWeight="bold">{item.title}</Typography>
                            <Typography variant="body2">{item.desc}</Typography>
                        </CardContent>
                    </Card>
              </Button>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mt: 5 }}>
          <Grid item={true} xs={12} sm={6} md={4} component="div">
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">Recent Activities</Typography>
                <Typography variant="body2">📖 Added "The Great Gatsby" (2 hours ago)</Typography>
                <Typography variant="body2">⭐ Rated "1984" (5 hours ago)</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">Library Statistics</Typography>
                <Typography variant="body2">📚 2,451 Total Books</Typography>
                <Typography variant="body2">📂 32 Categories</Typography>
                <Typography variant="body2">⭐ 4.8 Avg Rating</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">Notifications</Typography>
                <Typography variant="body2">🔔 New book recommendations available</Typography>
                <Typography variant="body2">📢 Reading goal reminder: 2 books away</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Footer */}
        <Box sx={{ mt: 5, textAlign: "center", py: 3, bgcolor: "#f5f5f5" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Typography fontWeight="bold">ABOUT</Typography>
              <Typography variant="body2">About Us | Careers | Contact</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography fontWeight="bold">SUPPORT</Typography>
              <Typography variant="body2">Help Center | Terms of Service | Privacy Policy</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography fontWeight="bold">SOCIAL</Typography>
              <Typography variant="body2">Twitter | Facebook | Instagram</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <AddBookForm open={isFormVisible} onClose={() => setIsFormVisible(false)} />
    </div>
    </AuthWrapper>
  );
}
