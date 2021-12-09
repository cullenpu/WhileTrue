import OpenAI from 'openai-api';
import dotenv from 'dotenv';
import gpt3Config from './gpt3config.json';

dotenv.config();

interface content {
  description: string;
  type: string;
  seed: string;
  audience: string;
}

const createPrompt = (initialContent: content) => {
  return `${gpt3Config.prompt}Product description: ${initialContent.description}\nType: ${initialContent.type}\nSeed Words: ${initialContent.seed}\nAudience: ${initialContent.audience}\nMarketing Content:`;
};

const generateCopyUsingGPT3 = async (initialContent: content) => {
  const openai = new OpenAI(process.env.OPENAI_API_KEY || '');
  const gptResponse = await openai.complete({
    engine: gpt3Config.engine,
    prompt: createPrompt(initialContent),
    temperature: gpt3Config.temperature,
    maxTokens: gpt3Config.max_tokens,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    n: 3,
    stop: ['Marketing Content:'],
  });

  const text = [];

  for (let i = 0; i < gptResponse.data.choices.length; i += 1) {
    text.push(gptResponse.data.choices[i].text.trim());
  }

  return text;
};

export default generateCopyUsingGPT3;
