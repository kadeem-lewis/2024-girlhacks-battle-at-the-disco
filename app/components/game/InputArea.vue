<template>
  <form class="relative flex" @submit.prevent="onSubmit">
    <UInput
      id="chat-input"
      v-model="chatInput"
      placeholder="Enter Message..."
      class="w-full"
      :ui="{ icon: { trailing: { pointer: '' } } }"
    >
      <template #trailing>
        <UButton
          icon="i-heroicons-paper-airplane"
          variant="ghost"
          type="submit"
        />
      </template>
    </UInput>
  </form>
</template>

<script setup lang="ts">
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const chatInput = ref("");
const user = useCurrentUser();
const db = useFirestore();
const route = useRoute("game-id-lobby");

async function onSubmit() {
  if (chatInput.value.trim() === "") return;
  await addDoc(collection(db, "rooms", route.params.id, "messages"), {
    text: chatInput.value,
    createdAt: serverTimestamp(),
    user: {
      uid: user.value?.uid,
      displayName: user.value?.displayName,
    },
  });
  chatInput.value = "";
}
</script>
