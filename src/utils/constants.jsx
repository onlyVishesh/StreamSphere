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
