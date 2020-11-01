import React from 'react';
import { Errored } from './components/Errored';
import { Content, StreamData } from './components/Content';
import { ContentData, ContentService } from './services/content';
import {
  CHANNEL_DATA_CACHE_KEY,
  LAST_SEEN_KEY,
  REFRESH_TIME_BUFFER_MS,
} from './constants';
import { ChannelApiType } from 'arena-ts';

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
    if (content.channel !== channel) {
      localStorage.removeItem(LAST_SEEN_KEY);
    }
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

function getNextIndex(data: ChannelApiType['contents']): StreamData | null {
  if (!data || data.length === 0) return null;
  const lastSeen = localStorage.getItem(LAST_SEEN_KEY);
  if (lastSeen == null) {
    const lastIndex = data.length - 1;
    const lastItem = data[lastIndex];
    localStorage.setItem(LAST_SEEN_KEY, lastItem.id.toString(10));
    return {
      past: null,
      now: lastItem,
      future: lastIndex !== 0 ? data[lastIndex - 1] : null,
    };
  }
  const lastSeenIndex = data.findIndex((x) => x.id.toString(10) === lastSeen);
  const nextIndex = lastSeenIndex > 0 ? lastSeenIndex - 1 : data.length - 1;
  const nextItem = data[nextIndex];
  localStorage.setItem(LAST_SEEN_KEY, nextItem.id.toString(10));
  return {
    past: data[lastSeenIndex],
    now: nextItem,
    future: nextIndex !== 0 ? data[nextIndex - 1] : null,
  };
}

function useArenaStream(arena: ContentService, channel: string) {
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState<StreamData | null>(null);
  React.useEffect(() => {
    setLoading(true);
    getContent(arena, channel)
      .then((data) => {
        setData(getNextIndex(data));
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
