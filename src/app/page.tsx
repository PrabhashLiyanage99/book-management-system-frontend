'use client'
import React, {useState} from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, Link, Divider, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from '../styles/login.module.css'
import Image from "next/image";
import Background from '../accets/login-background.jpg';
import LoginImage from '../accets/login-form-image.png';
import FormBackground from '../accets/login-form-background.jpg';
import { useMutation } from "@apollo/client";
import { LOGIN_MUTATION } from "@/graphql/mutations";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email: string; password: string }>({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    try {
      const { data } = await login({ variables: { email, password } });

      if (data?.login) {
        localStorage.setItem('token', data.login);
        router.push('/home');
      } else {
        alert('Invalid credentials');
      }
    } catch (err: any) {
      console.error('Login failed:', err);
      alert(err.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundImage: `url(${Background.src})`, backgroundSize: 'cover' }}>
      <Box className={styles.loginBackground}>
      </Box>
      
      <Box className={styles.loginCard} 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'center',
          justifyContent: 'center', 
          backgroundColor: 'white', 
          p: 4, 
          borderRadius: 2,
          boxShadow: 3,
          width: '100%',
          maxWidth: '900px',
          margin: 'auto'
        }}>
        <Box sx={{ flex: 1, display: 'flex', 
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${FormBackground.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '600px',}}>
          <Image 
            src={LoginImage} 
            alt="Login Image" 
            width={400} 
            height={400} 
            className={styles.logo} 
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </Box>
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom className={styles.welcomeText}>
            Welcome Back!
          </Typography>

          <Typography variant="subtitle1" gutterBottom className={styles.subtitle}>
            Login to your account
          </Typography>

          <form onSubmit={handleSubmit} className={styles.form}>
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
                )
              }}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              className={styles.loginButton}>
              Login
            </Button>

            <Divider className={styles.divider}>or</Divider>

            <Button
              variant="outlined"
              fullWidth
              className={styles.createAccountButton}
              onClick={() => router.push('/signup')}>
              Create Account
            </Button>
          </form>

          <Typography variant="body2" className={styles.footerText}>
            vnejrvnekjnvkjervn
          </Typography>
          
          <Typography variant="caption" className={styles.credit}>
            ReadMate
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
export default LoginPage;