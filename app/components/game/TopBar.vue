<template>
  <div class="space-y-4">
    <div class="center flex flex-row justify-between">
      <p
        v-if="$route.path === `/game/${route.params.id}/play`"
        class="text-2xl"
      >
        {{ timer }}
      </p>
      <UButton
        label="Leave Room"
        icon="i-mdi-exit-to-app"
        color="red"
        @click="handleLeaveRoom"
      />
    </div>
    <div class="flex flex-row gap-4">
      <UCard v-for="player in players" :key="player.id" class="w-full">
        <template #header>
          <h2 class="text-center font-bold uppercase">
            {{ player.username }}
          </h2>
        </template>
        <div class="flex flex-row justify-between">
          <p>Score: {{ player.score }}</p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  where,
  collection,
  query,
} from "firebase/firestore";

const db = useFirestore();
const user = useCurrentUser();
const route = useRoute("game-id-lobby");

async function handleLeaveRoom() {
  try {
    await deleteDoc(
      doc(db, "rooms", route.params.id, "players", user.value!.uid),
    );
    await updateDoc(doc(db, "rooms", route.params.id), {
      players: arrayRemove(user.value!.uid),
    });
    navigateTo("/mode");
  } catch (error) {
    console.error(error);
  }
}

const timer = useState<number>("timer");

const q = query(
  collection(db, "rooms", route.params.id, "players"),
  where("role", "==", "player"),
);
const players = useCollection(q);
console.log(players.value);
</script>
