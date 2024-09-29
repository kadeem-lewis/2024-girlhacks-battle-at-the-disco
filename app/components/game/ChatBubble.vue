<template>
  <div class="flex items-center justify-between text-black dark:text-white">
    <div class="flex">
      <b>{{ message.user.displayName }}:</b>
      <p class="break-words">&nbsp;{{ message.text }}</p>
    </div>
    <span class="text-xs">{{
      useDateFormat(message.createdAt.toDate(), "HH:mm")
    }}</span>
  </div>
</template>

<script setup lang="ts">
import type { Timestamp } from "firebase/firestore";

type Message = {
  text: string;
  createdAt: Timestamp;
  user: {
    uid: string;
    displayName: string;
  };
};

defineProps<{
  message: Message;
}>();
</script>
