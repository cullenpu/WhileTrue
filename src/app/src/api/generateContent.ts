import createAxiosInstance from './axios';
import { ContentCard } from '../components/typings';

const generateContent = async (offerId: number, clientSegmentId: number, seed: string) => {
  // use GPT-3 API to generate personalized content
  try {
    const instance = createAxiosInstance();
    const res = await instance.post('/generate-copy', { clientSegmentId, offerId, seed });
    const generatedContent = (res.data as any).copy;
    const fullContent = { contentTitle: seed, contentBody: generatedContent } as ContentCard;
    console.log(fullContent);
    return [fullContent];
  } catch (err) {
    console.log(err);
    return [];
  }
};

const searchDataByModel = async (model: string, searchTerm: string) => {
  try {
    const instance = createAxiosInstance();
    const res = await instance.get(`/data/${model}?searchTerm=${searchTerm}`);
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export { generateContent, searchDataByModel };
