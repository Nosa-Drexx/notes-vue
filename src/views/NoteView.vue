<script setup lang="ts">
import AddNotes from '@/components/addNotes.vue'
import NoteSection from '@/components/NoteSection.vue'
</script>

<template>
  <section>
    <header class="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
      <h1>Welcome to notes</h1>
      <ul class="list-none flex gap-4">
        <li>
          <router-link to="/starred" class="underline"> Starred </router-link>
        </li>
        <li>
          <router-link to="/trash" class="underline"> Trash </router-link>
        </li>
      </ul>
    </header>
    <AddNotes />
    <NoteSection />
  </section>
</template>
