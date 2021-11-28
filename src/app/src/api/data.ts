import createAxiosInstance from './axios';

const getOffers = async () => {
  const instance = createAxiosInstance();
  const res = await instance.get('/data/offers');

  return res.data;
};

const getClientSegments = async () => {
  const instance = createAxiosInstance();
  const res = await instance.get('/data/clients');

  return res.data;
};

const postOffer = async (offerDescription: string, offerType: string) => {
  const instance = createAxiosInstance();

  const res = await instance.post('/data/offers', { offerDescription, offerType });

  return res.status;
};

const postClientSegment = async (clientSegment: string) => {
  const instance = createAxiosInstance();

  const res = await instance.post('/data/clients', { clientSegment });

  return res.status;
};

export { getClientSegments, getOffers, postClientSegment, postOffer };
