"use client";
import { Grid } from "@mui/material";
import PageContainer from "../components/container/PageContainer";
import ChatbotUI from "./Chatbot";

const Chatbot = () => {
  return (
    <PageContainer title="SC Chatbot">
      <Grid item xs={12} lg={12}>
        <ChatbotUI />
      </Grid>
    </PageContainer>
  );
};

export default Chatbot;
