<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { useNoteStore } from '@/stores/noteStore'

const noteStore = useNoteStore()

type DataState = {
  dataState: string
}

export default defineComponent({
  props: {
    id: {
      type: String as PropType<string>,
      required: true
    },
    data: {
      type: String as PropType<string>,
      default: ''
    },
    type: {
      type: String as PropType<'edit' | 'add'>,
      required: true
    }
  },
  emits: {
    showInputField(value: false): false {
      return value
    }
  },
  data: (): DataState => ({
    dataState: ''
  }),
  methods: {
    submit() {
      if (this.type === 'edit') {
        //input  for edit cases
        noteStore.editNote({
          id: this.id,
          update: this.data
        })
      } else {
        //input  for add cases
        noteStore.addNote({ id: '', deleted: true, stared: true, note: this.dataState })
      }
      this.$emit('showInputField', false)
    }
  },
  created() {
    this.dataState = this.data
  }
})
</script>

<template>
  <form
    class="flex flex-col flex-nowrap w-screen h-screen absolute z-40 top-0 bg-white"
    @submit.prevent="submit"
  >
    <label for="sumbit-btn" class="h-auto w-screen bg-gray-100">
      <button id="submit-btn" type="submit" class="text-2xl bg-green-300 p-1 px-2">Update</button>
    </label>
    <label for="text-area" class="h-full w-screen">
      <textarea
        id="text-area"
        v-model="dataState"
        placeholder="Input or Edit note"
        class="w-full h-full p-2 text-2xl resize-none bg-yellow-200"
      ></textarea>
    </label>
  </form>
</template>
