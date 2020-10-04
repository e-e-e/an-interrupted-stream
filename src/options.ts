import { OPTIONS_CHANNEL_KEY, OPTIONS_TOKEN_KEY } from './constants';

const DEFAULT_CHANNEL = 'good-sign-offs';

function getChannelFromQueryString() {
  const match = window.location.search.match(/\?channel=(.+)/);
  if (match) {
    return match[1];
  }
  return null;
}

type Options = {
  channel: string;
  token?: string;
};

export function getOptions(): Options {
  const channel =
    window.localStorage.getItem(OPTIONS_CHANNEL_KEY) ||
    getChannelFromQueryString();
  const token = window.localStorage.getItem(OPTIONS_TOKEN_KEY);
  return {
    channel: channel || DEFAULT_CHANNEL,
    token: token || undefined,
  };
}
