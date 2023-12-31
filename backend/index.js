import { Configuration, OpenAIApi } from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  organization: "",
  apiKey: "",
});
const openai = new OpenAIApi(configuration);

app.post("/", async (request, response) => {
  const { chats } = request.body;

  const result = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a Car Ginie. You can help people choose what car they want to buy.",
      },
      ...chats,
    ],
  });

  response.json({
    output: result.data.choices[0].message,
  });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 8000;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
