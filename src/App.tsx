import React from 'react';
import { ArenaService, ConnectionApiType } from 'arena-ts';
import { BlockApiType, ChannelApiType } from 'arena-ts/dist/arena_api_types';
import { Errored } from './components/Errored';
import { Content, StreamData } from './components/Content';

function isBlock(
  data: Exclude<ChannelApiType['contents'], null>[0]
): data is BlockApiType & ConnectionApiType {
  return data.base_class === 'Block';
}

function channelToData(data: ChannelApiType): StreamData[] {
  return (
    data.contents
      ?.filter(isBlock)
      .filter((block) => block.class === 'Image')
      .map((block) => {
        return {
          image: block.image?.large.url,
        };
      }) ?? []
  );
}

function useArenaStream(arena: ArenaService, channel: string) {
  const [loading, setLoading] = React.useState(true);
  const [failed, setFailed] = React.useState(false);
  const [data, setData] = React.useState<StreamData | null>(null);
  React.useEffect(() => {
    setLoading(true);
    arena
      .channel(channel)
      .then((data) => {
        const streamData = channelToData(data);
        const items = streamData.filter((d) => d.image);
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

function App({ arena }: { arena: ArenaService }) {
  const { failed, data } = useArenaStream(arena, 'rocks-not-nature');
  return (
    <div className="App">
      {failed && <Errored />}
      {!failed && <Content data={data} />}
    </div>
  );
}

export default App;
