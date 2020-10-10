import { ChannelApiType } from 'arena-ts/dist/arena_api_types';
import { ArenaService } from 'arena-ts';

export type ContentData = {
  channel: string;
  data: ChannelApiType['contents'];
  updated: number;
};

// export function isBlock(
//   data: Exclude<ChannelApiType['contents'], null>[0]
// ): data is BlockApiType & ConnectionApiType {
//   return data.base_class === 'Block';
// }

export interface ContentService {
  getContent(channel: string): Promise<ContentData>;
}

export class ContentClient implements ContentService {
  constructor(private readonly arenaService: ArenaService) {}

  async getContent(channel: string): Promise<ContentData> {
    const data = await this.arenaService.channel(channel);
    return {
      channel,
      data: data.contents,
      updated: Date.now(),
    };
  }
}
