import { Center, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { getData } from '../api/data';
import ContentTable from '../components/ContentTable';
import Graph from '../components/Graph';
import { ContentCard } from '../components/typings';

const putOfferAndClientSegmentInContent = async (content: never, offers: never, clientSegments: never) => {
  const getContent = content;
  // @ts-expect-error
  for (let i = 0; i < getContent.length; i += 1) {
    // @ts-expect-error
    getContent[i].offer = offers[getContent[i]['offerId']].offer;
    // @ts-expect-error
    getContent[i].clientSegment = clientSegments[getContent[i]['clientsegmentId']].segment;
  }
  return getContent as never;
};

export const Dashboard = () => {
  const [content, setContent] = React.useState<ContentCard[]>([]);
  const [offers, setOffers] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const getContentFromApi = async () => {
    try {
      setLoading(true);
      let getContent = await getData('content');

      setOffers(await getData('offers'));
      // @ts-expect-error
      const offerIds = getContent.map((item) => item.offerId);
      // @ts-expect-error
      const clientSegmentIds = getContent.map((item) => item.clientsegmentId);

      const data = await getData(
        `offersclientsegments?offerIds=${offerIds.toString()}&clientsegmentIds=${clientSegmentIds.toString()}`,
      );
      getContent = await putOfferAndClientSegmentInContent(getContent, data['offers'], data['clientSegments']);

      setContent(getContent);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getContentFromApi();
  }, []);

  return (
    <div>
      <Center m="10">
        <Heading>Dashboard</Heading>
      </Center>

      <Graph offers={offers} content={content} />
      <div style={{ margin: '5% 10%' }}>
        <Heading>Saved Content</Heading>
      </div>
      {!isLoading && <ContentTable content={content} enableSaving={false} />}
    </div>
  );
};
