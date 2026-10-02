import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
//anthropic SDK is the bringer of claude

dotenv.config();
//with this, these work: 
// process.env.ANTHROPIC_API_KEY
//process.env.MONGO_URI 

const client = new Anthropic();
//create connection to claude

export default client;//claude is here!