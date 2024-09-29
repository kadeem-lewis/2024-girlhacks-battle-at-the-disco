<template>
  <UCard>
    <!-- <div>
      <p class="text-lg font-bold">Settings</p>
      <UInputMenu v-model="selectedMode" :options="genres" />
    </div> -->
    <div v-if="!isCountingDown">
      <p class="text-lg font-bold">Room Code:</p>
      <div class="py-2 text-2xl">
        <span class="bg-dark-mode-400 mr-2 rounded-lg p-2 font-bold">{{
          roomCode
        }}</span>
        <button
          v-if="isSupported"
          class="rounded-lg p-2"
          :class="copied ? 'bg-green-600' : 'bg-sky-600 hover:bg-sky-500'"
          @click="copy(roomCode)"
        >
          <UIcon v-if="!copied" name="i-mdi-clipboard" class="text-2xl" />
          <UIcon v-else name="i-mdi-clipboard-check" class="text-2xl" />
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-lg font-bold">Starting in:</p>
      <p class="text-2xl">{{ countdown }}</p>
    </div>
    <template #footer>
      <UButton v-if="user?.uid === room?.host" block @click="startGame"
        >Start</UButton
      >
    </template>
  </UCard>
</template>

<script setup lang="ts">
import { doc, updateDoc } from "firebase/firestore";

const db = useFirestore();

const route = useRoute("game-id-lobby");
const room = useDocument(doc(db, "rooms", route.params.id));

console.log(room.value);

const user = useCurrentUser();

const roomCode = ref<string>(route.params.id);

const { copied, copy, isSupported } = useClipboard();

const countdown = ref<number>(0);
const isCountingDown = ref(false);

async function startGame() {
  countdown.value = 5;
  const interval = setInterval(() => {
    isCountingDown.value = true;
    countdown.value -= 1;
    if (countdown.value === 0) {
      clearInterval(interval);
      updateGameState();
    }
  }, 1000);
}

async function updateGameState() {
  try {
    await updateDoc(doc(db, "rooms", route.params.id), {
      gameState: "playing",
    });
  } catch (error) {
    console.error(error);
  }
}

watch(room, (newValue) => {
  if (newValue && newValue.gameState === "playing") {
    navigateTo(`/game/${route.params.id}/play`);
  }
});

// const config = useRuntimeConfig();

// console.log(config.public);

// const selectedMode = ref<string | null>(null);

// const { data: genres } = await useFetch("http://ws.audioscrobbler.com/2.0/", {
//   query: {
//     method: "tag.getTopTags",
//     format: "json",
//     api_key: config.public.lastFMApiKey,
//   },
// });
</script>
