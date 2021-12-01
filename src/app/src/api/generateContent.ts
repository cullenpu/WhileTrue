import createAxiosInstance from './axios';

const generateContent = async (offer: string, clientSegment: string, languageType: string) => {
  // use GPT-3 API to generate personalized content
  try {
    console.log(offer, clientSegment, languageType);
    const instance = createAxiosInstance();
    const res = await instance.post('/generate-copy', { clientSegment, offer, languageType });
    const generatedContent = res.data;
    console.log(generateContent);
    return generatedContent;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default generateContent;
