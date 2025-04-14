import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import styles from "./SignIn.module.scss";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { useState } from "react";

const SignIn = ({
  onCloseForm,
  onToggleForm,
}: {
  onCloseForm: () => void;
  onToggleForm: () => void;
}) => {
  const {
    signInWithGoogle,
    signInWithFacebook,
    signInWithTwitter,
    signInWithEmail,
  } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Box className={styles.container}>
      <TextField
        label="Email"
        fullWidth
        variant="outlined"
        onChange={(email) => setEmail(email.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        variant="outlined"
        onChange={(password) => setPassword(password.target.value)}
      />
      <Button
        fullWidth
        variant="contained"
        onClick={() => {
          signInWithEmail(email, password);
          onCloseForm();
        }}
      >
        Sign In
      </Button>

      <Typography variant="body2" align="center">
        Don’t have an account?{" "}
        <Link onClick={onToggleForm} className={styles.linkHover}>
          Sign Up
        </Link>
      </Typography>

      <Divider className={styles.divider} />

      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          signInWithGoogle();
          onCloseForm();
        }}
      >
        Sign in with Google
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          signInWithFacebook();
          onCloseForm();
        }}
      >
        Sign in with Facebook
      </Button>
      <Button
        fullWidth
        variant="outlined"
        onClick={() => {
          signInWithTwitter();
          onCloseForm();
        }}
      >
        Sign in with X
      </Button>
    </Box>
  );
};

export default SignIn;
