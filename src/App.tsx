import React from 'react';
import { Errored } from './components/Errored';
import { Content } from './components/Content';
import { ContentData, ContentService } from './services/content';
import { CHANNEL_DATA_CACHE_KEY, REFRESH_TIME_BUFFER_MS } from './constants';
import { BlockApiType, ChannelApiType } from 'arena-ts';

async function getFreshContent(
  arena: ContentService,
  channel: string
): Promise<ChannelApiType['contents']> {
  const data = await arena.getContent(channel);
  localStorage.setItem(CHANNEL_DATA_CACHE_KEY, JSON.stringify(data));
  return data.data;
}

async function getContent(
  arena: ContentService,
  channel: string
): Promise<ChannelApiType['contents']> {
  const cached = localStorage.getItem(CHANNEL_DATA_CACHE_KEY);
  if (!cached) return getFreshContent(arena, channel);
  try {
    const content = JSON.parse(cached) as ContentData;
    const now = Date.now();
    if (
      content.channel === channel &&
      now < content.updated + REFRESH_TIME_BUFFER_MS
    ) {
      return content.data;
    }
  } catch (e) {
    console.error(e);
  }
  return getFreshContent(arena, channel);
}

function useArenaStream(arena: ContentService, channel: string) {
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState<BlockApiType | ChannelApiType | null>(
    null
  );
  React.useEffect(() => {
    setLoading(true);
    getContent(arena, channel)
      .then((data) => {
        if (!data || data.length === 0) {
          setLoading(false);
          return;
        }
        const index = Math.floor(Math.random() * data.length);
        // setData(data[5]);
        setData(data[index]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        setFailed(true);
      });
  }, [arena, channel]);
  return {
    loading,
    failed,
    data,
  };
}

function App({ arena, channel }: { arena: ContentService; channel: string }) {
  const { failed, data } = useArenaStream(arena, channel);

  return (
    <div className="App">
      {failed && <Errored />}
      {!failed && <Content data={data} />}
    </div>
  );
}

export default App;
