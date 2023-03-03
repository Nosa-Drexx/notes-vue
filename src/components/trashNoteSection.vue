<script lang="ts">
import { defineComponent } from 'vue'
import { useNoteStore } from '@/stores/noteStore'

const trashNoteStore = useNoteStore()

type DataState = {
  // eslint-disable-next-line no-undef
  trashNoteList: NoteObjTypeTrash[]
}

export default defineComponent({
  data: (): DataState => ({
    trashNoteList: []
  }),
  computed: {
    trashNoteLength() {
      return this.trashNoteList.length
    }
  },
  methods: {
    restoreNote(id: string) {
      trashNoteStore.trashNotes({ id })
    },
    deletePermanently(id: string) {
      trashNoteStore.deleteNote({ id })
    }
  },
  created() {
    this.trashNoteList = trashNoteStore.trash
  }
})
</script>

<template>
  <section class="flex flex-col flex-nowrap items-center gap-10 pt-10">
    <div
      v-if="trashNoteLength === 0"
      class="text-5xl w-full h-full flex items-center justify-center text-gray-300"
    >
      <span> Trash Is Empty</span>
    </div>
    <div
      v-else
      v-for="trashNote in trashNoteList"
      :key="trashNote.id"
      class="w-full max-w-4xl h-auto shadow-lg p-4 rounded-xl text-xl"
    >
      {{ trashNote.note }}
      <div :data-id="trashNote.id" class="flex gap-4 justify-end pl-3 pr-3">
        <button @click="restoreNote(trashNote.id)">
          <i class="fa-solid fa-rotate-right text-gray-300"></i>
        </button>
        <button class="text-red-400" @click="deletePermanently(trashNote.id)">Delete</button>
      </div>
    </div>
  </section>
</template>
