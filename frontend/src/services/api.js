import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const scrapeUrl = async (url) => {
  const response = await axios.post(`${API_BASE_URL}/scrape`, { url });
  return response.data;
};

export const askQuestion = async (question) => {
  const response = await axios.post(`${API_BASE_URL}/chat`, { question });
  return response.data;
};