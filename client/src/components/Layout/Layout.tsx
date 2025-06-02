import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { Box, Container } from "@mui/material";
const Layout = () => {
  return (
    <Box>
      <Navbar />
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Container>
    </Box>
  );
};

export default Layout;
