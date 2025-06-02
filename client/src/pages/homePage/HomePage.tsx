import "./homePage.scss";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          maxWidth: "500px",
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        <Box
          component="img"
          className="books-img"
          src="/books-img.svg"
          alt=""
        />
        <Typography
          variant="h1"
          component="h1"
          sx={{ textAlign: "center", marginY: "10px" }}
        >
          Where books find their readers.
        </Typography>
        <Typography sx={{ fontSize: "0.9rem" }}>
          Join a thriving library of books, explore exclusive-staning one, and
          fuel your passion for reading every day.
        </Typography>
        <Button
          variant="contained"
          sx={{
            borderRadius: "9px",
            bgcolor: "#2689E0",
            padding: "10px 15px",
            color: "#fff",
            textTransform: "none",
            margin: "20px 0",
          }}
        >
          <Link to="/library">Find that one</Link>
        </Button>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            component="img"
            className="reviewers-img"
            src="/reviewers.svg"
            alt=""
          />
          <Typography sx={{ fontSize: ".8rem" }}>
            Trusted by thousands of readers and authors
          </Typography>
        </Stack>
      </Box>
      <Box component="section">
        <Box
          sx={{
            position: "relative",
            overflowY: "hidden",
            height: "321px",
            width: "865px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              height: "350px",
            }}
          >
            <Card
              sx={{
                padding: "15px",
                borderRadius: "15px",
                background: "linear-gradient(to bottom, #2689E0, #7EBCEB)",
                width: "270px",
                position: "relative",
                transform: "rotate(-4deg)",
                zIndex: 1,
              }}
            >
              <CardContent>
                <CalendarTodayIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    bgcolor: "rgba(220, 220, 220, 0.33)",
                    marginBottom: "40px",
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
                <Typography sx={{ color: "rgba(250, 250, 250, 0.8)" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600 }}
                    component="span"
                  >
                    Discover signing events
                  </Typography>
                  <br />
                  Easily find upcoming book signings and literary events near
                  you.
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                padding: "15px",
                borderRadius: "15px",
                bgcolor: "#869CAE",
                width: "270px",
              }}
            >
              <CardContent>
                <PeopleIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    bgcolor: "rgba(220, 220, 220, 0.33)",
                    marginBottom: "40px",
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
                <Typography sx={{ color: "rgba(250, 250, 250, 0.8)" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600 }}
                    component="span"
                  >
                    Preorder Books
                  </Typography>
                  <br />
                  Secure your favorite books early to avoid missing limited
                  editions, exclusive offers.
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                padding: "15px",
                borderRadius: "15px",
                bgcolor: "#BCC9D9",
                width: "270px",
                transform: "rotate(4deg)",
              }}
            >
              <CardContent>
                <ShoppingCartIcon
                  sx={{
                    width: "40px",
                    height: "40px",
                    bgcolor: "rgba(220, 220, 220, 0.33)",
                    marginBottom: "40px",
                    color: "white",
                    borderRadius: "50%",
                    padding: "10px",
                  }}
                />
                <Typography sx={{ color: "rgba(250, 250, 250, 0.8)" }}>
                  <Typography
                    sx={{ color: "#fff", fontWeight: 600 }}
                    component="span"
                  >
                    Stay Connected
                  </Typography>
                  <br />
                  Follow your favorite authors and get updates on event
                  appearances and exclusives
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;
