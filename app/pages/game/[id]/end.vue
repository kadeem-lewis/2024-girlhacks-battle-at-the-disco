<template>
  <div>
    <UCard>
      <template #header>
        <h2 class="text-lg font-semibold">Game Over</h2>
      </template>
      <div class="space-y-2">
        <div class="text-center">
          <h3 class="text-2xl font-semibold">Results</h3>
        </div>
        <div class="space-y-2">
          <div v-for="player of players" :key="player.id">
            <p>The winner is: {{ player.username }}</p>
            <div class="flex justify-between">
              <span>{{ player.artist.name }}</span>
              <span>{{ player.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { collection, limit, orderBy, query, where } from "firebase/firestore";

const db = useFirestore();
const route = useRoute("game-id-end");

const q = query(
  collection(db, `rooms/${route.params.id}/players`),
  where("role", "==", "player"),
  orderBy("score", "desc"),
  limit(1),
);

const players = useCollection(q);
</script>
