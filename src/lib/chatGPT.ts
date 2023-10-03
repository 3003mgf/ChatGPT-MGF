import OpenAI from "openai";

// NOTE: We connect to OpenAI API with our secret key
// We'll use the constant in the queryAPI file.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted
});


export default openai;