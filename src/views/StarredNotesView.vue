<script setup lang="ts">
import StarredNoteSection from '@/components/StarredNoteSection.vue'
</script>

<template>
  <section>
    <header class="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
      <h1>Stared Notes</h1>
      <ul class="list-none flex gap-4">
        <li>
          <Link to="/" class="underline"> Notes </Link>
        </li>
        <li>
          <Link to="/trash" class="underline"> Trash </Link>
        </li>
      </ul>
    </header>
    <StarredNoteSection />
  </section>
</template>
