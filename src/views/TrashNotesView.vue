<script setup lang="ts">
import TrashNoteSection from '@/components/TrashNoteSection.vue'
</script>

<template>
  <section>
    <header class="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
      <h1>Recycle Bin</h1>
      <ul class="list-none flex gap-4">
        <li>
          <router-link to="/" class="underline"> Notes </router-link>
        </li>
        <li>
          <router-link to="/starred" class="underline"> Stared </router-link>
        </li>
      </ul>
    </header>
    <TrashNoteSection />
  </section>
</template>
