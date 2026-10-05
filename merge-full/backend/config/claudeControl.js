import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
//anthropic SDK is the bringer of claude

dotenv.config();
//with this, these work: 
// process.env.ANTHROPIC_API_KEY
//process.env.MONGO_URI 

let client = null;
const claude = {
  messages: {
    create: (params) => {
      if (!client) {
        client = new Anthropic();
      }
      return client.messages.create(params);
    }
  }
};

export default claude;//claude is here!