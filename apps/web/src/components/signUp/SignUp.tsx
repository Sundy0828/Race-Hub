import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import styles from "./SignUp.module.scss";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { useState } from "react";
import { isStrongPassword, isValidEmail } from "@/utility/authUtility";

const SignUp = ({
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const signUp = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!isStrongPassword(password)) {
      alert(
        "Password must be at least 8 characters long and include lowercase, uppercase, number, and special character."
      );
      return;
    }

    signInWithEmail(email, password)
      .then(() => {
        console.log("Sign in successful");
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        alert("Error signing in. Please try again.");
      })
      .finally(() => {
        onCloseForm();
      });
  };

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
      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        variant="outlined"
        onChange={(confirmPassword) =>
          setConfirmPassword(confirmPassword.target.value)
        }
      />
      <Button fullWidth variant="contained" onClick={signUp}>
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

export default SignUp;
