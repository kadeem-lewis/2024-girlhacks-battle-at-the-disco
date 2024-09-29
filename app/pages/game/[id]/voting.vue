<template>
  <div>
    <UCard v-for="player in players" :key="player.id">
      <template #header>
        <h2 class="text-center font-bold uppercase">{{ player.username }}</h2>
      </template>
      <div class="space-y-2">
        <p>Chosen Song: {{ player.chosenSong.name }}</p>
        <p>Votes: {{ player.score }}</p>
      </div>
      <UButton label="Vote" block @click="handleVote(player.id)" />
    </UCard>
  </div>
</template>

<script setup lang="ts">
import {
  collection,
  doc,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

const db = useFirestore();
const route = useRoute("game-id-voting");

const q = query(
  collection(db, `rooms/${route.params.id}/players`),
  where("role", "==", "player"),
);
const players = useCollection(q);

async function handleVote(playerId: string) {
  await updateDoc(doc(db, `rooms/${route.params.id}/players`, playerId), {
    score: increment(1),
  });
}

const votingTimer = ref(30);
let votingInterval: NodeJS.Timeout;
onMounted(() => {
  votingInterval = setInterval(async () => {
    votingTimer.value -= 1;
    if (votingTimer.value === 0) {
      clearInterval(votingInterval);
      navigateTo(`/game/${route.params.id}/end`);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(votingInterval);
});
</script>
