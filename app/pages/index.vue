<template>
  <div>
    <UCard>
      <template #header>
        <h2 class="text-center font-bold uppercase">Login</h2>
      </template>
      <UButton block @click="handleGoogleSignIn">Login with Google</UButton>
      <UButton block @click="isOpen = true">Login Anonymously</UButton>
    </UCard>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <UFormGroup label="Username:">
          <UInput v-model="username" placeholder="Enter a username..." />
        </UFormGroup>
        <UButton block @click="handleAnonymouslySignIn">Submit</UButton>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";

definePageMeta({});

const auth = useFirebaseAuth()!;
const googleAuthProvider = new GoogleAuthProvider();

const isOpen = ref(false);
const username = ref("");

console.log(useCurrentUser().value);

async function handleGoogleSignIn() {
  try {
    await signInWithRedirect(auth, googleAuthProvider);
    navigateTo("/mode");
  } catch (error) {
    console.error(error);
  }
}

async function handleAnonymouslySignIn() {
  try {
    const userCredential = await signInAnonymously(auth);
    console.log("This worked");
    updateProfile(userCredential.user, {
      displayName: username.value,
    });
    isOpen.value = false;
    navigateTo("/mode");
  } catch (error) {
    console.error(error);
  }
}
</script>
