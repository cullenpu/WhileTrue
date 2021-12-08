import { Center, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { getData } from '../api/data';
import ContentTable from '../components/ContentTable';
import Graph from '../components/Graph';
import { ContentCard } from '../components/typings';

export const Dashboard = () => {
  const [content, setContent] = React.useState<ContentCard[]>([]);
  const [offers, setOffers] = React.useState([]);
  const [contentOffers, setContentOffers] = React.useState([]);
  const [contentClientSegments, setContentClientSegments] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  // const [contentDate, setContentDate] = React.useState<ContentDate[]>([]);

  const getContentFromApi = async () => {
    try {
      setLoading(true);
      const getContent = await getData('content');
      setContent(getContent);
      setOffers(await getData('offers'));
      // @ts-expect-error
      const offerIds = getContent.map((item) => item.offerId);
      // @ts-expect-error
      const clientSegmentIds = getContent.map((item) => item.clientsegmentId);

      const data = await getData(
        `offersclientsegments?offerIds=${offerIds.toString()}&clientsegmentIds=${clientSegmentIds.toString()}`,
      );
      setContentOffers(data['offers']);
      setContentClientSegments(data['clientsegments']);
      setLoading(false);
      // setContentDate(await getData('content'));
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
      {!isLoading && (
        <ContentTable
          content={content}
          enableSaving={false}
          contentOffers={contentOffers}
          contentClientSegments={contentClientSegments}
        />
      )}
    </div>
  );
};
