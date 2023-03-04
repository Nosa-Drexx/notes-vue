<script>
import AddNotes from '@/components/addNotes.vue'
import NoteSection from '@/components/NoteSection.vue'
</script>

<template>
  <section>
    <header className="w-screen h-auto flex justify-between bg-gray-100 p-2 text-2xl">
      <h1>Welcome to notes</h1>
      <ul className="list-none flex gap-4">
        <li>
          <router-link to="/starred" className="underline"> Starred </router-link>
        </li>
        <li>
          <router-link to="/trash" className="underline"> Trash </router-link>
        </li>
      </ul>
    </header>
    <AddNotes />
    <NoteSection />
  </section>
</template>
