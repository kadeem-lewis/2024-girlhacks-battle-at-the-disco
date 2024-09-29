<template>
  <header class="w-full border-b bg-gray-800 py-2">
    <UContainer>
      <nav class="flex items-center justify-between">
        <h1 class="text-2xl font-bold uppercase">BATTLE! AT THE DISCO</h1>
        <UButton
          v-if="user"
          variant="ghost"
          icon="i-mdi-exit-to-app"
          @click="signOut(auth!)"
          >Logout</UButton
        >
      </nav>
    </UContainer>
  </header>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
const auth = useFirebaseAuth();
const user = useCurrentUser();
</script>
