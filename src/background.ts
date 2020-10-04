// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ArenaClient } from 'arena-ts';
import { ContentClient } from './services/content';
import { CHANNEL_DATA_CACHE_KEY } from './constants';
import { getOptions } from './options';

chrome.runtime.onInstalled.addListener(() => {
  console.log('onInstalled...');
  // create alarm after extension is installed / upgraded
  chrome.alarms.create('refresh', { periodInMinutes: 15 });
  fetchFreshContent();
});

chrome.alarms.onAlarm.addListener((alarm) => {
  console.log(alarm.name); // refresh
  fetchFreshContent();
});

function fetchFreshContent() {
  const options = getOptions();
  const arena = new ArenaClient({ token: options.token });
  const content = new ContentClient(arena);
  content.getContent(options.channel).then((data) => {
    localStorage.setItem(CHANNEL_DATA_CACHE_KEY, JSON.stringify(data));
  });
}

console.log('RUNNING');
