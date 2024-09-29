export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const artistData = await $fetch("http://ws.audioscrobbler.com/2.0/", {
    query: {
      api_key: config.public.lastFMApiKey,
      method: "tag.gettopartists",
      tag: "disco",
      format: "json",
    },
  });
  const { topartists } = artistData;
  const { artist } = topartists;

  return artist[Math.floor(Math.random() * artist.length)];
});
