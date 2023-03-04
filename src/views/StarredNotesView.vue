<script setup lang="ts">
import StarredNoteSection from '@/components/StarredNoteSection.vue'
</script>

<template>
  <section>
    <header class="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
      <h1>Stared Notes</h1>
      <ul class="list-none flex gap-4">
        <li>
          <router-link to="/" class="underline"> Notes </router-link>
        </li>
        <li>
          <router-link to="/trash" class="underline"> Trash </router-link>
        </li>
      </ul>
    </header>
    <StarredNoteSection />
  </section>
</template>
