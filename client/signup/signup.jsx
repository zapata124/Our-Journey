import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';
// import UserService from '@services/user';
const image =
  'https://goingawesomeplaces.com/wp-content/uploads/2020/04/world-maps-with-pins-pinworld.webps://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.123rf.com%2Fphoto_147188443_the-beige-cat-is-playing-the-flute-the-big-green-cat-snake-is-getting-out-of-a-sack-with-american-do.html&psig=AOvVaw2JPlyPH8B9gb-1JydlubKA&ust=1625165535746000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCKDiz8eDwPECFQAAAAAdAAAAABAD';
// import { UserContext } from '@contexts/user';
// import { AuthContext } from '@contexts/auth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Our Journey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = {
  paperContainer: {
    backgroundImage: `url(${image})`,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(https://goingawesomeplaces.com/wp-content/uploads/2020/04/world-maps-with-pins-pinworld.webp)`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  // const { handleSubmit, control, errors: fieldsErrors, reset } = useForm();
  const [signedUp, setSignedUp] = useState(false);
  const [username, setUsername] = useState('');
  const [emailadd, setEmailadd] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpw, setConfirmpw] = useState('');

  let history = useHistory();
  const onSubmit = () => {
    console.log(username, emailadd, password, confirmpw);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        email: emailadd,
        password: password,
      }),
    };
    fetch('/user/signup', requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("I'm here!!!!!!");
        console.log(data);
        if (!data.success) {
          console.log('username already exists');
        }
        console.log("We're here!!!");
        return data;
      })
      .then((data) => {
        // setSignedUp(true);
        history.push('/dashboard');
      });
  };

  if (signedUp) {
    return <SignInSide />;
  }
  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          className={classes.image}
          style={styles.paperContainer}
        >
          {/* <img src="/Assets/plant.png" /> */}
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            {/* <form className={classes.form} noValidate> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="Username"
              label="Username"
              name="username"
              //   autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="EmailAddress"
              label="Email Address"
              name="email"
              //   autoComplete="email"
              autoFocus
              value={emailadd}
              onChange={(e) => setEmailadd(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              //   autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              value={confirmpw}
              onChange={(e) => setConfirmpw(e.target.value)}
              //   autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Agree to terms and conditions"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2"></Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            {/* </form> */}
          </div>
        </Grid>
      </Grid>
    </div>
    //     </div>
    //   </div>
    // </div>
  );
}
