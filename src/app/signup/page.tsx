'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, Link, Divider, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from '../../styles/login.module.css'
import Image from "next/image";
import Background from '../../accets/login-background.jpg';
import LoginImage from '../../accets/signup-form-image.png';
import FormBackground from '../../accets/login-form-background.jpg';
import { useMutation } from "@apollo/client";
import { SIGNUP_MUTATION } from "@/graphql/mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const SignupPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION);
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let valid = true;
      const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!name) {
        newErrors.name = "Name is required";
        valid = false;
      }
      if (!email) {
        newErrors.email = "Email is required";
        valid = false;
      }else if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
        valid = false;
      }
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
        valid = false;
      }
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
        valid = false;
      }
  
      setErrors(newErrors);
      if (!valid) return;
  
      try {
        const { data } = await signup({ variables: { name, email, password } });
        if (data?.signup) {
          toast.success("Account created successfully!");
          setTimeout(() => {
          router.push("/");
        },2000);
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Signup failed")
      }
    };
  
    return (
      <div
        className={styles.loginContainer}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundImage: `url(${Background.src})`,
          backgroundSize: "cover",
        }}
      >
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        <Box
          className={styles.loginCard}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
            p: 4,
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: "900px",
            margin: "auto",
          }}
        >
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: `url(${FormBackground.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "600px",
            }}
          >
            <Image src={LoginImage} alt="Signup Image" width={400} height={400} className={styles.logo} />
          </Box>
          <Box sx={{ flex: 1, p: 3 }}>
            <Typography  variant="h4" gutterBottom>
              Create Your Account
            </Typography>
            <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
              Sign up to Read Mate
            </Typography>
  
            <form onSubmit={handleSubmit} className={styles.form}>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                className={styles.inputField}
              />
  
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                className={styles.inputField}
              />
  
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
                className={styles.inputField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
  
              <TextField
                label="Confirm Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                className={styles.inputField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>  
                    </InputAdornment>
                  ),
                }}
              />
  
              <Button variant="contained" type="submit" fullWidth className={styles.loginButton} disabled={loading}>
                {loading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
  
            {error && <Typography color="error" sx={{marginTop: 3}}>{error.message}</Typography>}
  
            <Typography sx={{marginTop: 2}} variant="caption" className={styles.credit}>
              ReadMate
            </Typography>
            <Button
              variant="outlined"
              fullWidth
              className={styles.backButton}
              onClick={() => router.push("/")} 
              sx={{ mt: 2 }}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default SignupPage;