import "./navbar.scss";
import { Box, Typography } from "@mui/material";
import { NavLink, Link } from "react-router-dom";
const Navbar = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/library", label: "Library" },
    { to: "/contacts", label: "Contacts" },
  ];
  return (
    <nav className="navigation">
      <Link className="navigation-leftSide" to="/">
        <Box component="img" src="/logo.svg" alt=""></Box>
        <Typography variant="h3">Books</Typography>
      </Link>
      <Box sx={{ flex: 3 }}>
        <Box className="navigation-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) =>
                isActive
                  ? {
                      boxShadow: "0 0 0",
                      transform: "translateY(2px)",
                    }
                  : undefined
              }
            >
              {label}
            </NavLink>
          ))}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
