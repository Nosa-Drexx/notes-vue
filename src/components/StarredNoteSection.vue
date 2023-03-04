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
    //Global Reference to Pinia
    const starredNoteStore = useNoteStore()

    return {
      starredNoteStore
    }
  },
  data: (): DataState => ({
    id: '',
    data: '',
    show: false
  }),
  components: { InputField },
  computed: {
    starredNotesLength() {
      return this.starredNoteStore.stared.length
    }
  },
  methods: {
    showInputField(e: boolean): void {
      this.show = e
    },
    // eslint-disable-next-line no-undef
    Unstar(item: NoteObjTypeStared): void {
      this.starredNoteStore.unstarNotes({ id: item.id })
    },
    // eslint-disable-next-line no-undef
    editNote(item: NoteObjTypeStared): void {
      this.id = item.id
      this.data = item.note
      this.show = true
    },
    // eslint-disable-next-line no-undef
    trashNote(item: NoteObjTypeStared): void {
      this.starredNoteStore.trashNotes({ id: item.id })
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
      :type="'add'"
      @showInputField="showInputField"
    ></InputField>
    <div
      v-if="starredNotesLength === 0"
      class="text-5xl w-full h-full flex items-center justify-center text-gray-300"
    >
      <span> No Note, Click below to add a note</span>
    </div>
    <div
      v-else
      v-for="staredNote in starredNoteStore.stared"
      :key="staredNote.id"
      class="w-full max-w-4xl h-auto shadow-lg p-4 rounded-xl text-xl"
    >
      {{ staredNote.note }}
      <div :data-id="staredNote.id" class="flex gap-4 justify-end pl-3 pr-3">
        <button @click="Unstar(staredNote)">
          <i class="fa-solid fa-star text-yellow-300"></i>
        </button>
        <button @click="editNote(staredNote)">
          <i class="fa-solid fa-pen-to-square text-cyan-400"></i>
        </button>
        <button @click="trashNote(staredNote)">
          <i class="fa-solid fa-trash text-gray-300"></i>
        </button>
      </div>
    </div>
  </section>
</template>
