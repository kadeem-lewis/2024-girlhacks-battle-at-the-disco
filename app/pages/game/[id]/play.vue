<template>
  <div v-if="playerData?.role === 'player'">
    Your artist is{{ artist.name }} Your opponent's artist is
    {{ opponentData?.artist.name }}
  </div>
  <div v-else>
    <div v-for="player of players" :key="player.id">
      {{ player.artist.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, doc, updateDoc } from "firebase/firestore";

const db = useFirestore();
const route = useRoute("game-id-play");
const user = useCurrentUser();

const artist = await $fetch("/api/random_artist");
await updateDoc(doc(db, "rooms", route.params.id, "players", user.value!.uid), {
  artist: artist,
});

const players = useCollection(
  collection(db, "rooms", route.params.id, "players"),
);

const playerData = useDocument(
  doc(db, "rooms", route.params.id, "players", user.value!.uid),
);

const opponentData = computed(() => {
  return players.value?.find((player) => player.id !== user.value?.uid);
});
</script>
