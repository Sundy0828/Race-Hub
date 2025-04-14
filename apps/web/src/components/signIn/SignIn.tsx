import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
} from "@mui/material";
import styles from "./SignIn.module.scss";

const SignIn = ({ onToggleForm }: { onToggleForm: () => void }) => (
  <Box className={styles.container}>
    <TextField label="Email" fullWidth variant="outlined" />
    <TextField label="Password" type="password" fullWidth variant="outlined" />
    <Button fullWidth variant="contained">
      Sign In
    </Button>

    <Typography variant="body2" align="center">
      Don’t have an account? <Link onClick={onToggleForm}>Sign Up</Link>
    </Typography>

    <Divider className={styles.divider} />

    <Button fullWidth variant="outlined">
      Sign in with Google
    </Button>
    <Button fullWidth variant="outlined">
      Sign in with Facebook
    </Button>
    <Button fullWidth variant="outlined">
      Sign in with X
    </Button>
  </Box>
);

export default SignIn;
