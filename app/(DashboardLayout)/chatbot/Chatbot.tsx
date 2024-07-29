import axios from "axios";
import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
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
import DOMPurify from 'dompurify';

interface Message {
  type: "user" | "bot";
  text: string;
}

export default function ChatbotUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  // const sendMessage = async (message: string) => {
  //   setLoading(true);
  //   setMessageSent(true);
  //   if (input.trim() !== "") {
  //     setMessages((prevMessages) => [
  //       ...prevMessages,
  //       { type: "user", text: input },
  //     ]);
  //     try {
  //       const response = await axios.post("http://localhost:5000/ask", {
  //         question: message,
  //         url: "https://www.sc.com/sg/",
  //       });
  //       const botResponse = response.data.answer;
  //       setMessages((prevMessages) => [
  //         ...prevMessages,
  //         // { type: 'user', text: message },
  //         { type: "bot", text: formatResponse(botResponse) },
  //       ]);
  //     } catch (error) {
  //       console.error("Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const sendMessage = async (message: string) => {
    setLoading(true);
    setMessageSent(true);
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", text: message },
      ]);
      try {
        const response = await axios.post("http://localhost:5000/ask", {
          question: message,
          url: "https://www.sc.com/sg/",
        });
        const botResponse = response.data.answer;
        // const botResponse = "Investment opportunities can be found in various sectors, including quality funds that have potential to add value to a portfolio. Here are some examples of investment opportunities: 1. Accredited Investors: Accredited investors (AI) are individuals or entities who meet certain qualifications to invest in stocks, bonds, and other securities. For example, a company may choose to raise capital from accredited investors through an initial public offering (IPO). "
        // console.log(botResponse)
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: formatResponse(botResponse)},
        ]);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSend = () => {
    if (input.trim() !== "") {
      sendMessage(input);
      setInput("");
    }
  };

  // const handleCardClick = (text: string) => {
  //   setMessages((prevMessages) => [
  //     ...prevMessages,
  //     { type: "user", text: text },
  //   ]);
  //   sendMessage(text);
  //   setMessageSent(true);
  // };

  const handleCardClick = (text: string) => {
    sendMessage(text);
  };

  const formatResponse = (response: string) => {
    // return response.replace(/(\d+\.\s+)/g, '\n$1');
    return response.replace(/(\d+\.\s+)/g, '<br>$1').replace(/\n/g, '<br>');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSend();
    }
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
                  fontSize: message.type === "user" ? "0.875rem" : "0.875rem",
              }}
            >
              <ListItemText
                // primary={message.text}
                primary={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(message.text),
                    }}/>
                  }
                sx={{
                  bgcolor: message.type === "user" ? "#e0f7fa" : "#f1f8e9",
                  borderRadius: 2,
                  padding: "10px",
                  maxWidth: "75%",
                  alignSelf:
                    message.type === "user" ? "flex-end" : "flex-start",
                  marginLeft: message.type === "user" ? "auto" : "0",
                  marginRight: message.type === "user" ? "0" : "auto",
                  fontSize: message.type === "user" ? "0.5rem" : "0.5rem",
                }}
              />
            </ListItem>
          ))}
          {loading && (
            <ListItem sx={{ justifyContent: "center" }}>
              <CircularProgress />
            </ListItem>
          )}
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
              // fontSize: "0.875rem",
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
