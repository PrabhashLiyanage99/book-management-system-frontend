"use client";
import { AppBar, Toolbar, Typography, Button, Container, Card, CardContent, Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import AddBookForm from "@/components/form-addBook";
import AuthWrapper from "@/components/AuthWrapper";
import { useRouter } from "next/navigation";
import Layout from "../../layout/layout";
import { useQuery } from "@apollo/client";
import { GET_BOOK_COUNT } from "../../graphql/mutations"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function HomePage() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const router = useRouter();
    

    const { data, loading, error, refetch } = useQuery(GET_BOOK_COUNT, {
        variables: { page: 1, pageSize: 10 }, 
     
    });
    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error fetching data</Typography>;

    const handleAddSuccess = () => {
    toast.success("Book Added successfully!");
    refetch();
    };


  return (
    <AuthWrapper>
      <Layout>
    <Box>
      <Box sx={{ background: "linear-gradient(to right, #ad79e1, #0099f2)", color: "white", textAlign: "center", py: 5 }}>
        <Typography variant="h4" fontWeight="bold">Welcome to Your Digital Library</Typography>
        <Typography>Discover books and manage your collection.</Typography>
      </Box>

      <Container sx={{ mt: 5 , backgroundColor: "#fff"}}>
        <Grid container spacing={3} justifyContent={"space-between"} display="flex">
          {[ 
            { icon: <LibraryBooksIcon />, title: "View Library", desc: "Access your personal book collection", onclick: () => router.push("/bookList") },
            { icon: <AddIcon />, title: "Add New Book", desc: "Add book to your personal book collection", onclick:() => setIsFormVisible(true) },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} maxWidth={600}>
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

          <Grid container spacing={3} sx={{ mt: 5 }}>
            <Grid item xs={12} sm={6} md={4} maxWidth={500}>
              <Card sx={{ p: 2, width: 400 }} >
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">Library Statistics</Typography>
                  <Typography variant="h4">{data?.getAllBooks?.totalCount} Total Books</Typography> 
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <AddBookForm open={isFormVisible} onClose={() => setIsFormVisible(false)} onSuccess={handleAddSuccess} />
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </Box>
    </Layout>
    </AuthWrapper>
  );
}
