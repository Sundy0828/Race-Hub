"use client";

import {
  Alert,
  Collapse,
  IconButton,
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useFirebaseAuth } from "@/providers/auth/AuthContext";
import { updateProfile, updatePassword, updateEmail } from "firebase/auth";
import { isStrongPassword } from "@/utility/authUtility";
import LoadingSpinner from "@/components/state/loading/LoadingSpinner";
import UserAvatar from "@/components/avatar/UserAvatar";
import styles from "./UserData.module.scss";

export default function UserData() {
  const { user, loading } = useFirebaseAuth();

  const [displayName, setDisplayName] = useState(user?.displayName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [canEditEmail, setCanEditEmail] = useState(false);
  const [canEditPassword, setCanEditPassword] = useState(false);

  // inside component state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    setDisplayName(user?.displayName ?? "");
    setEmail(user?.email ?? "");

    const providers = user?.providerData.map((p) => p.providerId) ?? [];
    const hasPasswordLogin = providers.includes("password");

    setCanEditEmail(hasPasswordLogin);
    setCanEditPassword(hasPasswordLogin);
  }, [user]);

  const handleDisplayNameUpdate = async () => {
    if (user && displayName !== user.displayName) {
      try {
        await updateProfile(user, { displayName });
        alert("Display name updated!");
      } catch {
        alert("Error updating display name");
      }
    }
  };

  const handleEmailUpdate = async () => {
    if (user && email !== user.email && canEditEmail) {
      try {
        await updateEmail(user, email);
        alert("Email updated!");
      } catch {
        alert("Error updating email");
      }
    }
  };

  const handlePasswordUpdate = async () => {
    if (!user) return;
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters and contain 3 of the following: lowercase, uppercase, number, special character."
      );
      return;
    }

    try {
      await updatePassword(user, newPassword);
      alert("Password updated!");
      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch {
      setPasswordError("Error updating password. Try again.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <UserAvatar
            profileImgUrl={user?.photoURL ?? ""}
            displayName={user?.displayName ?? ""}
            className={styles.userAvatar}
          />
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Profile
        </Typography>

        <TextField
          fullWidth
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
          onClick={handleDisplayNameUpdate}
        >
          Update Display Name
        </Button>

        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
          disabled={!canEditEmail}
        />
        {canEditEmail && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            onClick={handleEmailUpdate}
          >
            Update Email
          </Button>
        )}

        {canEditPassword && !showPasswordForm && (
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 2 }}
            onClick={() => setShowPasswordForm(true)}
          >
            Change Password
          </Button>
        )}

        <Collapse in={showPasswordForm}>
          <Alert
            severity="info"
            sx={{ mt: 2, mb: 2 }}
            action={
              <IconButton
                color="inherit"
                size="small"
                onClick={() => {
                  setShowPasswordForm(false);
                  setPasswordError("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {passwordError && (
                <Typography color="error" variant="body2">
                  {passwordError}
                </Typography>
              )}
              <Button variant="contained" onClick={handlePasswordUpdate}>
                Save Password
              </Button>
            </Box>
          </Alert>
        </Collapse>
      </Paper>
    </Container>
  );
}
