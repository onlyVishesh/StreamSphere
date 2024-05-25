export const apiKey = "AIzaSyAGlqN3bGXjlsczeJYTjdyLxySgLj0WeGw";
export const ytApi =
  "https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=" +
  apiKey;

export const filters =
  "https://www.googleapis.com/youtube/v3/videoCategories?regionCode=US&key=" +
  apiKey;

export const filterApi = (filterId) =>
  `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=${filterId}&maxResults=50&key=` +
  apiKey;

export const commentsApi = (videoId) =>
  `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&textFormat=plainText&videoId=${videoId}&maxResults=50&key=` +
  apiKey;

export const replyApi = (commentId) =>
  `https://youtube.googleapis.com/youtube/v3/comments?part=snippet&textFormat=plainText&parentId=${commentId}&maxResults=10&key=` +
  apiKey;

export const videoApi = (videoId) =>
  `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;

export const profileApi = (channelId) =>
  `https://www.googleapis.com/youtube/v3/channels?part=snippet&fields=items%2Fsnippet%2Fthumbnails%2Fdefault&id=${channelId}&key=${apiKey}`;

export const channelApi = (channelId) =>
  `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${apiKey}`;

let SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const abbreviateNumber = (number) => {
  let tier = (Math.log10(Math.abs(number)) / 3) | 0;

  if (tier == 0) return number;

  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  let scaled = number / scale;

  return scaled.toFixed(1) + suffix;
};

export const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + " year ago";
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + " years ago";
  }

  interval = seconds / 2592000;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + " month ago";
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + " months ago";
  }

  interval = seconds / 86400;
  if (Math.floor(interval) > 13) {
    return Math.floor(interval / 7) + " weeks ago";
  } else if (Math.floor(interval) === 1) {
    return Math.floor(interval) + " day ago";
  } else if (Math.floor(interval) > 1) {
    return Math.floor(interval) + " days ago";
  }

  interval = seconds / 3600;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + " hour ago";
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + " hours ago";
  }

  interval = seconds / 60;
  if (Math.floor(interval) === 1) {
    return Math.floor(interval) + " minute ago";
  }
  if (Math.floor(interval) > 1) {
    return Math.floor(interval) + " minutes ago";
  }

  return Math.floor(seconds) + " seconds";
};

export const formatDuration = (duration) => {
  const regex = /P(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?)?/;
  const matches = duration.match(regex);

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  const hh = String(hours).padStart(2, "0");
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hh}:${mm}:${ss}`;
  } else if (minutes > 0) {
    return `${mm}:${ss}`;
  } else {
    return `${ss}`;
  }
};
