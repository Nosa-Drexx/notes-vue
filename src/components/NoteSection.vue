<script lang="ts">
import { defineComponent } from 'vue'
import InputField from './InputField.vue'
import { useNoteStore } from '@/stores/noteStore'

type DataState = {
  id: string
  data: string
  show: boolean
}

export default defineComponent({
  setup() {
    //Global Reference to Pinia store.
    const noteStore = useNoteStore()
    return {
      noteStore
    }
  },
  data: (): DataState => ({
    id: '',
    data: '',
    show: false
  }),
  components: { InputField },
  computed: {
    notesLength() {
      return this.noteStore.notes.length
    }
  },
  methods: {
    showInputField(e: boolean): void {
      this.show = e
    },
    // eslint-disable-next-line no-undef
    starOrUnstar(item: NoteObjType): void {
      !item.stared
        ? this.noteStore.starNotes({ id: item.id })
        : this.noteStore.unstarNotes({ id: item.id })
    },
    // eslint-disable-next-line no-undef
    editNote(item: NoteObjType): void {
      this.id = item.id
      this.data = item.note
      this.show = true
    },
    // eslint-disable-next-line no-undef
    trashNote(item: NoteObjType): void {
      this.noteStore.trashNotes({ id: item.id })
    }
  }
})
</script>

<template>
  <section class="flex flex-col flex-nowrap items-center gap-10 pt-10">
    <InputField
      v-if="show"
      :id="id"
      :data="data"
      :type="'edit'"
      @showInputField="showInputField"
    ></InputField>
    <div
      v-if="notesLength === 0"
      class="text-5xl w-full h-full flex items-center justify-center text-gray-300"
    >
      <span> No Note, Click below to add a note</span>
    </div>
    <div
      v-else
      v-for="note in noteStore.notes"
      :key="note.id"
      class="w-full max-w-4xl h-auto shadow-lg p-4 rounded-xl text-xl"
    >
      {{ note.note }}
      <div :data-id="note.id" class="flex gap-4 justify-end pl-3 pr-3">
        <button @click="starOrUnstar(note)">
          <i v-if="note.stared" class="fa-solid fa-star text-yellow-300"></i>

          <i v-else class="fa-solid fa-star text-cyan-100"></i>
        </button>
        <button @click="editNote(note)">
          <i class="fa-solid fa-pen-to-square text-cyan-400"></i>
        </button>
        <button @click="trashNote(note)">
          <i class="fa-solid fa-trash text-gray-300"></i>
        </button>
      </div>
    </div>
  </section>
</template>
