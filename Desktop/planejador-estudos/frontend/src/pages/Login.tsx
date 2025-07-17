import {
Box,
Button,
Checkbox,
CircularProgress,
Container,
FormControlLabel,
Snackbar,
TextField,
Typography,
Alert,
Paper,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      login({ token, user }, rememberMe);
      setSnackOpen(true);

      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Entrar
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Acesse sua conta para começar a planejar seus estudos
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          <TextField
            label="E-mail"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Lembrar-me"
            />

            <Typography
              variant="body2"
              component={RouterLink}
              to="/forgot-password"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Esqueci minha senha
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ my: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.5, fontWeight: "bold", borderRadius: 2, mt: 2 }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" elevation={6} variant="filled">
          Login realizado com sucesso!
        </Alert>
      </Snackbar>
    </Container>
  );
}