<template>
  <div>Your artist is{{ artist.name }}</div>
</template>

<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";

const db = useFirestore();
const route = useRoute("game-id-play");
const user = useCurrentUser();

const playerData = useDocument(
  doc(db, "rooms", route.params.id, "players", user.value!.uid),
);

const artist = await $fetch("/api/random_artist");
await updateDoc(doc(db, "rooms", route.params.id, "players", user.value!.uid), {
  artist: artist,
});
</script>
