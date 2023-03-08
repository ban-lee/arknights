import axios from 'axios';
import { Event } from '@/types/payload-types';
import { Event as EventComponent } from '@/components/event';
import { getCmsUrl } from '@/utils/cms';
import { InferGetServerSidePropsType } from 'next';
import { Layout } from '@/components/layout';
import { Space, Stack, Title } from '@mantine/core';

export default function Home({ events }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Layout title={'AK: Upcoming Events'}>
        <Title align="center">Upcoming Events</Title>
        <Space h="xl" />
        <Stack
          align="center"
          spacing={40}
        >
          {events.map((event) => {
            return (
              <EventComponent
                key={event.id}
                event={event}
              />
            );
          })}
        </Stack>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const events: Event[] = await axios.get(getCmsUrl('/events?depth=2&limit=50')).then((res) => {
    return res.data.docs.sort((eventA: Event, eventB: Event) => {
      const dateA = new Date(eventA.dates.estimatedStart || 0).valueOf();
      const dateB = new Date(eventB.dates.estimatedStart || 0).valueOf();

      return dateA - dateB;
    });
  });
  return {
    props: {
      events,
    },
  };
}
