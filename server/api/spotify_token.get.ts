export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const token = await $fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${config.spotifyClientId}&client_secret=${config.spotifyClientSecret}`,
  });
  return token;
});
