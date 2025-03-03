import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: "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",
    // apiKey: process.env.OPENAI_KEY
    dangerouslyAllowBrowser: true
});

export default openai;