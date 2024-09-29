<template>
  <header>
    <h1>App Name</h1>
    <UButton v-if="user" @click="signOut(auth!)">Logout</UButton>
  </header>
</template>

<script setup lang="ts">
import { signOut } from "firebase/auth";
const auth = useFirebaseAuth();
const user = useCurrentUser();
</script>
