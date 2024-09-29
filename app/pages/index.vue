<template>
  <div>
    <UCard>
      <template #header>
        <h2 class="text-center font-bold uppercase">Login</h2>
      </template>
      <div class="space-y-2">
        <UButton
          block
          icon="i-logos-google-icon"
          class="font-semibold"
          @click="handleGoogleSignIn"
          >Login with Google</UButton
        >
        <UButton
          block
          icon="i-fa6-solid-user-secret"
          class="font-semibold"
          @click="isOpen = true"
          >Login Anonymously</UButton
        >
      </div>
    </UCard>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h2 class="text-2xl font-bold uppercase">Enter Username</h2>
        </template>
        <div class="space-y-2">
          <UFormGroup label="Username:">
            <UInput v-model="username" placeholder="Enter a username..." />
          </UFormGroup>
          <UButton block @click="handleAnonymouslySignIn">Submit</UButton>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import {
  GoogleAuthProvider,
  signInAnonymously,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

definePageMeta({
  layout: "auth",
});

const auth = useFirebaseAuth()!;

const isOpen = ref(false);
const username = ref("");

async function handleGoogleSignIn() {
  const googleAuthProvider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, googleAuthProvider);
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
