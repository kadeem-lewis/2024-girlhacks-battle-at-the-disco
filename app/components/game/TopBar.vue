<template>
  <div>
    <UButton label="Leave Room" @click="handleLeaveRoom" />
  </div>
</template>

<script setup lang="ts">
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";

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
</script>
