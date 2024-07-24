import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Send } from "@mui/icons-material";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { type: "user", text: input }]);
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "This is a default response." },
        ]);
      }, 1000);
      setMessageSent(true);
      setInput("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleCardClick = (text) => {
    setInput(text);
    handleSend();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        gap="20px"
        width="100%"
        maxWidth="800px"
        marginBottom="20px"
        sx={{
          display: messageSent ? "none" : "flex", // Hide if input is present
        }}
      >
        {[
          "Ask abt finance decision 1",
          "Ask abt finance decision 2",
          "Ask abt finance decision 3",
        ].map((text, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 150,
              maxWidth: 200,
              textAlign: "center",
              padding: "10px",
              boxShadow: 3,
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(text)}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                {/* Add icons here if needed */}
                <Box sx={{ height: 50 }} />
                <Box>{text}</Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <List sx={{ width: "100%", mb: 2 }}>
          {messages.map((message, index) => (
            <ListItem
              key={index}
              sx={{
                justifyContent:
                  message.type === "user" ? "flex-end" : "flex-start",
              }}
            >
              <ListItemText
                primary={message.text}
                sx={{
                  bgcolor: message.type === "user" ? "#e0f7fa" : "#f1f8e9",
                  borderRadius: 2,
                  padding: "10px",
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            boxShadow: 1,
            borderRadius: 2,
            padding: "2px 4px",
          }}
        >
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              transition: "width 0.5s ease", // Example transition
              width: input ? "100%" : "0%", // Conditionally adjust width
              overflow: "hidden", // Hide overflow when collapsed
            }}
            placeholder="Message ChatGPT"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <IconButton type="button" sx={{ p: "10px" }} onClick={handleSend}>
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
