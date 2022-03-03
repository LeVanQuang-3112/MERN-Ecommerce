import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios"
import Swal from 'sweetalert2';


const theme = createTheme();

export default function Login() {
  const [user, setUser] = React.useState({
    email: "", password: ""
  })

  const handleChange = (event) => {
     const {name, value} = event.target
     setUser({...user, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/user/login', {...user})
      localStorage.setItem('Login', true)
      window.location.href = "/"
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: err.response.data.msg,
        icon: "error",
        button: "OK",
      });
    }
  }

  return (
    <div className="main">
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xxs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h3">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            // variant="h4"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{fontSize: "1.8rem"}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  <h4>
                  Forgot password?
                  </h4>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  <h4>
                  {"Don't have an account? Sign Up"}
                  </h4>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
}