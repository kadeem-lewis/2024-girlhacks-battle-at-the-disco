<template>
  <UCard>
    <template #header>
      <h2 class="text-lg font-semibold">Chat</h2>
    </template>
    <div ref="messageContainer" class="max-h-64 grow overflow-y-auto">
      <GameChatBubble
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <template #footer>
      <GameInputArea />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { collection, query, orderBy } from "firebase/firestore";

const messageContainer = useTemplateRef("messageContainer");

const db = useFirestore();
const route = useRoute("game-id-lobby");
const q = query(
  collection(db, "rooms", route.params.id, "messages"),
  orderBy("createdAt"),
);
const messages = useCollection(q);

function scrollToLastElement() {
  const lastElement = messageContainer.value?.lastElementChild;
  lastElement?.scrollIntoView({ behavior: "smooth" });
}

watch(
  messages,
  () => {
    scrollToLastElement();
  },
  { immediate: true, deep: true },
);
</script>
