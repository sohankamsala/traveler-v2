import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { AzureOpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:5173", // update to your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const apiVersion = process.env.AZURE_OPENAI_API_VERSION;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;

if (!endpoint || !apiKey || !apiVersion || !deployment) {
  throw new Error("Missing one or more required Azure OpenAI environment variables.");
}

// Initialize client once
const client = new AzureOpenAI({
  endpoint,
  apiKey,
  apiVersion,
  deploymentName: deployment,
  dangerouslyAllowBrowser: true,
});

async function queryOpenAI(prompt) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are a helpful assistant that provides travel-related information." },
      { role: "user", content: prompt },
    ],
    max_tokens: 16000,
  });

  return response.choices[0]?.message?.content || "No response";
}

app.post("/openai", async (req, res) => {
  const { term } = req.body;
  if (!term) {
    return res.status(400).json({ error: "Missing 'term' in request body." });
  }

  try {
    const result = await queryOpenAI(term);
    res.status(200).json({ response: result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to get response from OpenAI" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
