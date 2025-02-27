// src/stores/userStore.ts
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    name: "John Doe",
    age: 30,
  }),
  actions: {
    updateName(newName: string) {
      this.name = newName;
    },
  },
});