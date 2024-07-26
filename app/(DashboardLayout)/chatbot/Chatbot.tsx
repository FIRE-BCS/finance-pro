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
import {
  Send,
  AttachMoney,
  AccountBalance,
  TrendingUp,
} from "@mui/icons-material";

interface Message {
  type: "user" | "bot";
  text: string;
}

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);

  const handleSend = () => {
    if (input.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: input },
      ]);
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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleCardClick = (text: string) => {
    setMessages([...messages, { type: "user", text: text }]);
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "bot", text: "This is a default response." },
      ]);
    }, 1000);
    setInput("");
    setMessageSent(true);
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
          display: messageSent ? "none" : "flex",
        }}
      >
        {[
          { text: "What is my total assets?", icon: <AttachMoney /> },
          { text: "What bank loans I can take?", icon: <AccountBalance /> },
          { text: "Investment opportunities", icon: <TrendingUp /> },
        ].map((item, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 150,
              maxWidth: 200,
              textAlign: "center",
              padding: "1px",
              boxShadow: 3,
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(item.text)}
          >
            <CardContent>
              <Box display="flex" flexDirection="column" alignItems="center">
                {item.icon}
                <Box sx={{ height: 10 }} />
                <Box>{item.text}</Box>
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
                  maxWidth: "75%",
                  alignSelf:
                    message.type === "user" ? "flex-end" : "flex-start",
                  marginLeft: message.type === "user" ? "auto" : "0",
                  marginRight: message.type === "user" ? "0" : "auto",
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            width: "110%",
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
              transition: "width 0.5s ease",
              width: "100%",
              overflow: "hidden",
            }}
            placeholder="Message FinanceProBot"
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
