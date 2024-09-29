<template>
  <UCard>
    <template #header>
      <h2 class="text-center font-bold uppercase">Join or Create a Room</h2>
    </template>
    <UForm class="flex flex-col gap-2" :state="state" @submit="handleJoinRoom">
      <UFormGroup label="Room Code:">
        <UInput v-model="state.roomCode" />
      </UFormGroup>
      <UButton type="submit" block @click="action = 'join'">Join</UButton>
    </UForm>
    <UDivider label="or" />
    <UButton type="submit" block @click="handleCreateRoom">Create</UButton>
  </UCard>
</template>

<script setup lang="ts">
import {
  arrayUnion,
  doc,
  setDoc,
  Timestamp,
  updateDoc,
  addDoc,
  collection,
} from "firebase/firestore";
import { customAlphabet } from "nanoid";

const db = useFirestore();

const action = ref<"create" | "join" | null>(null);

const user = useCurrentUser();

const state = reactive({
  roomCode: "",
});

async function handleCreateRoom() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const nanoid = customAlphabet(characters, 5);
  const roomId = nanoid();
  try {
    await setDoc(doc(db, "rooms", roomId, "players", user.value!.uid), {
      createdAt: Timestamp.now(),
      isHost: true,
      role: "player",
      username: user.value?.displayName,
      score: 0,
    });
    await setDoc(doc(db, "rooms", roomId), {
      createdAt: Timestamp.now(),
      players: [user.value?.uid],
      host: user.value?.uid,
    });
    await addDoc(collection(db, "rooms", roomId, "messages"), {
      text: `${user.value?.displayName} has joined the room`,
      createdAt: Timestamp.now(),
      user: {
        uid: "1",
        displayName: "Announcer",
      },
    });
    navigateTo({
      path: `/game/${roomId}/lobby`,
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleJoinRoom() {
  try {
    const room = useDocument(doc(db, "rooms", state.roomCode));
    await setDoc(doc(db, "rooms", state.roomCode, "players", user.value!.uid), {
      createdAt: Timestamp.now(),
      role: room.value?.players.length >= 2 ? "spectator" : "player",
      isHost: false,
      username: user.value?.displayName,
      score: 0,
    });

    const data = {};

    if (room.value?.playerCount >= 2) {
      data.spectators = arrayUnion(user.value?.uid);
    } else {
      data.players = arrayUnion(user.value?.uid);
    }

    await updateDoc(doc(db, "rooms", state.roomCode), data);
    await addDoc(collection(db, "rooms", state.roomCode, "messages"), {
      text: `${user.value?.displayName} has joined the room`,
      createdAt: Timestamp.now(),
      user: {
        uid: "1",
        displayName: "Announcer",
      },
    });
    navigateTo({
      path: `/game/${state.roomCode}/lobby`,
    });
  } catch (error) {
    console.error(error);
  }
}
</script>
