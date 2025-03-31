import React from 'react';
import { AppBar, Toolbar, Box, Button } from '@mui/material';
import Image from 'next/image';
import Logo from '../accets/readmate-logo.png'; 
import LogoutButton from './logoutButton';
import { useRouter } from "next/navigation"; 

const Header: React.FC = () => {
    const router = useRouter();
  return (
    <AppBar position="static" sx={{ backgroundColor: "oklch(0.21 0.034 264.665)", color: "#000", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex">
          <Button color="inherit" sx={{ marginRight: '50px' }} onClick={() => router.push('/home')}>
            <Image src={Logo} alt="Read Mate Logo" style={{ height: 40, width: 150 }} />
          </Button>
          <Button color="primary" onClick={() => router.push('/home')}>Home</Button>
          <Button color="primary" onClick={() => router.push('/bookList')}>Library</Button>
        </Box>
        <LogoutButton />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
