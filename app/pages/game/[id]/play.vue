<template>
  <UCard>
    <div v-if="playerData?.role === 'player'" class="space-y-2">
      <UAlert :title="``">
        <template #title>
          Your artist is
          <span class="font-bold">
            {{ playerData.artist.name }}
          </span>
        </template>
      </UAlert>
      <UAlert>
        <template #title>
          Your opponent's artist is
          <span class="font-bold">
            {{ opponentData?.artist.name }}
          </span>
        </template>
      </UAlert>

      <div class="space-y-2">
        <UInputMenu
          v-model="selectedSong"
          :search="search"
          :loading="loading"
          option-attribute="name"
          nullable
        />
        <UButton label="Submit" @click="handleSelectSong" />
      </div>
    </div>
    <div v-else>
      <div v-for="player of players" :key="player.id">
        {{ player.artist.name }}
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { collection, doc, updateDoc } from "firebase/firestore";

const db = useFirestore();
const route = useRoute("game-id-play");
const user = useCurrentUser();

const players = useCollection(
  collection(db, "rooms", route.params.id, "players"),
);

const playerData = useDocument(
  doc(db, "rooms", route.params.id, "players", user.value!.uid),
);

const opponentData = computed(() => {
  return players.value?.find((player) => player.id !== user.value?.uid);
});

const loading = ref(false);

const selectedSong = ref<Record<string, any>>();
async function search(q: string) {
  loading.value = true;
  const token = await $fetch("/api/spotify_token");
  const data = await $fetch("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    },
    query: {
      type: "track",
      q: encodeURI(`${q} artist:${playerData.value?.artist.name} genre:disco`),
    },
  });
  loading.value = false;

  return data.tracks.items;
}

// Timer stuff

const timer = useState<number>("timer", () => 60);
let timerInterval: NodeJS.Timeout;
onMounted(() => {
  timerInterval = setInterval(async () => {
    timer.value -= 1;
    if (
      timer.value === 0 ||
      (playerData.value?.chosenSong && opponentData.value?.chosenSong)
    ) {
      clearInterval(timerInterval);
      await handleSelectSong();
      navigateTo(`/game/${route.params.id}/voting`);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

async function handleSelectSong() {
  if (!selectedSong.value) {
    await updateDoc(
      doc(db, "rooms", route.params.id, "players", user.value!.uid),
      {
        chosenSong: null,
      },
    );
  }
  await updateDoc(
    doc(db, "rooms", route.params.id, "players", user.value!.uid),
    {
      chosenSong: selectedSong.value ? selectedSong.value : null,
    },
  );
}
</script>
