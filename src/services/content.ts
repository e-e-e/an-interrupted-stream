import { BlockApiType, ChannelApiType } from 'arena-ts/dist/arena_api_types';
import { ArenaService, ConnectionApiType } from 'arena-ts';

export type StreamData = {
  image: string | undefined;
};

export type ContentData = {
  channel: string;
  data: StreamData[];
  updated: number;
};

function isBlock(
  data: Exclude<ChannelApiType['contents'], null>[0]
): data is BlockApiType & ConnectionApiType {
  return data.base_class === 'Block';
}

function channelToData(data: ChannelApiType): StreamData[] {
  return (
    data.contents
      ?.filter(isBlock)
      .filter((block) => block.class === 'Image' && block.image)
      .map((block) => {
        return {
          image: block.image?.large.url,
        };
      }) ?? []
  );
}

export interface ContentService {
  getContent(channel: string): Promise<ContentData>;
}

export class ContentClient implements ContentService {
  constructor(private readonly arenaService: ArenaService) {}

  async getContent(channel: string): Promise<ContentData> {
    const data = await this.arenaService.channel(channel);

    return {
      channel,
      data: channelToData(data),
      updated: Date.now(),
    };
  }
}
