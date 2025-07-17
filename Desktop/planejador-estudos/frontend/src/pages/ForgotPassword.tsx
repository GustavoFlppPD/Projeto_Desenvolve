import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setFeedback("Instruções de recuperação enviadas para seu e-mail.");
      } else {
        setFeedback(data.message || "Erro ao enviar e-mail.");
      }
    } catch (err) {
      setFeedback("Erro ao conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Paper elevation={4} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" gutterBottom>
          Esqueci minha senha
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Digite seu e-mail e enviaremos um link para redefinir sua senha.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Enviar instruções"}
          </Button>
        </form>

        {feedback && (
          <Typography color="primary" variant="body2" sx={{ mt: 2 }}>
            {feedback}
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
