import React, { useState } from "react";

import {
  Box,
  Fab,
  Paper,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";

const Chatbot = () => {

  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I am your AI study assistant. How can I help you?",
    },
  ]);

  const sendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    const userMessage = message.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");

    setLoading(true);

    try {

      const token =
        localStorage.getItem("token");

        console.log("charbot token : ",token);
        

      const response = await fetch(
        "http://localhost:8080/api/chat",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            message: userMessage,
          }),
        }
      );

      if (!response.ok) {

        throw new Error(
          `Request failed: ${response.status}`
        );
      }

      const data =
        await response.json();

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: data.reply,
        },
      ]);

    } catch (error) {

      console.error(
        "Chatbot error:",
        error
      );

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text:
            "Sorry, I couldn't process your request. Please try again.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {

    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {

      event.preventDefault();

      sendMessage();
    }
  };

  return (
    <>
      {/* CHAT WINDOW */}

      {open && (

        <Paper
          elevation={8}
          sx={{
            position: "fixed",

            bottom: 90,

            right: 24,

            width: {
              xs: "calc(100% - 32px)",
              sm: 380,
            },

            height: 520,

            borderRadius: 4,

            overflow: "hidden",

            display: "flex",

            flexDirection: "column",

            zIndex: 9999,
          }}
        >

          {/* HEADER */}

          <Box
            sx={{
              p: 2,

              background:
                "linear-gradient(135deg,#0f4c81,#087fba)",

              color: "white",

              display: "flex",

              justifyContent: "space-between",

              alignItems: "center",
            }}
          >

            <Box>

              <Typography
                fontWeight={800}
              >
                AI Study Assistant 🤖
              </Typography>

              <Typography
                variant="caption"
                sx={{
                  opacity: 0.85,
                }}
              >
                Powered by Gemini
              </Typography>

            </Box>

            <IconButton
              onClick={() => setOpen(false)}
              sx={{
                color: "white",
              }}
            >
              <CloseIcon />
            </IconButton>

          </Box>


          {/* MESSAGES */}

          <Box
            sx={{
              flex: 1,

              overflowY: "auto",

              p: 2,

              background: "#f8fafc",
            }}
          >

            <Stack spacing={2}>

              {messages.map(
                (item, index) => (

                  <Box
                    key={index}

                    sx={{
                      display: "flex",

                      justifyContent:
                        item.sender === "user"
                          ? "flex-end"
                          : "flex-start",
                    }}
                  >

                    <Box
                      sx={{
                        maxWidth: "80%",

                        px: 2,

                        py: 1.2,

                        borderRadius: 3,

                        background:
                          item.sender === "user"
                            ? "#087fba"
                            : "#ffffff",

                        color:
                          item.sender === "user"
                            ? "white"
                            : "#172033",

                        boxShadow:
                          "0 2px 8px rgba(0,0,0,.06)",

                        whiteSpace:
                          "pre-wrap",
                      }}
                    >

                      <Typography
                        variant="body2"
                      >
                        {item.text}
                      </Typography>

                    </Box>

                  </Box>

                )
              )}

              {loading && (

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "flex-start",
                  }}
                >

                  <Box
                    sx={{
                      px: 2,
                      py: 1.2,
                      borderRadius: 3,
                      background: "#fff",
                    }}
                  >

                    <CircularProgress
                      size={20}
                    />

                  </Box>

                </Box>

              )}

            </Stack>

          </Box>


          {/* INPUT */}

          <Box
            sx={{
              p: 1.5,

              borderTop:
                "1px solid #e2e8f0",

              background: "#fff",

              display: "flex",

              gap: 1,
            }}
          >

            <TextField
              fullWidth
              size="small"
              multiline
              maxRows={3}
              placeholder="Ask something..."
              value={message}
              onChange={(event) =>
                setMessage(
                  event.target.value
                )
              }
              onKeyDown={handleKeyDown}
            />

            <IconButton
              onClick={sendMessage}
              disabled={
                loading ||
                !message.trim()
              }
              sx={{
                background: "#087fba",
                color: "white",

                "&:hover": {
                  background: "#075985",
                },

                "&.Mui-disabled": {
                  background: "#cbd5e1",
                  color: "#fff",
                },
              }}
            >

              <SendIcon />

            </IconButton>

          </Box>

        </Paper>
      )}


      {/* FLOATING BUTTON */}

      {!open && (

        <Fab
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",

            bottom: 24,

            right: 24,

            background:
              "linear-gradient(135deg,#0f4c81,#087fba)",

            color: "white",

            zIndex: 9999,

            "&:hover": {
              background:
                "linear-gradient(135deg,#075985,#0369a1)",
            },
          }}
        >

          <ChatIcon />

        </Fab>

      )}

    </>
  );
};

export default Chatbot;