import React from 'react';
import { Errored } from './components/Errored';
import { Content, StreamData } from './components/Content';
import { ContentService } from './services/content';
import {CHANNEL_DATA_CACHE_KEY} from "./constants";

async function getContent(arena: ContentService, channel: string): Promise<readonly StreamData[]>  {
  const cached = localStorage.getItem(CHANNEL_DATA_CACHE_KEY)
  if (!cached) {
    const data = await arena.getContent(channel)
    localStorage.setItem(CHANNEL_DATA_CACHE_KEY, JSON.stringify(data));
    return data;
  }
  return JSON.parse(cached)
}

function useArenaStream(arena: ContentService, channel: string) {
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState<StreamData | null>(null);
  React.useEffect(() => {
    setLoading(true);
    getContent(arena, channel)
      .then((data) => {
        const items = data.filter((d) => d.image);
        const index = Math.floor(Math.random() * items.length);
        setData(items[index]);
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

function App({ arena }: { arena: ContentService }) {
  const { failed, data } = useArenaStream(arena, 'rocks-not-nature');
  return (
    <div className="App">
      {failed && <Errored />}
      {!failed && <Content data={data} />}
    </div>
  );
}

export default App;
