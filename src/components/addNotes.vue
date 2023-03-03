<script lang="ts">
import { defineComponent } from 'vue'
import InputField from './InputField.vue'

type DataState = {
  id: string
  data: string
  show: boolean
}

export default defineComponent({
  data: (): DataState => ({
    id: '',
    data: '',
    show: false
  }),
  methods: {
    addNote(): void {
      this.show = true
    },
    showInputField(e: boolean): void {
      this.show = e
    }
  },
  components: { InputField }
})
</script>

<template>
  <InputField
    v-if="show"
    :id="id"
    :data="data"
    :type="'add'"
    @showInputField="showInputField"
  ></InputField>

  <button
    class="w-16 h-16 bg-cyan-400 rounded-full fixed bottom-10 right-1/2 shadow-xl z-10"
    @click="addNote"
  >
    <i class="fa-solid fa-plus text-4xl text-gray-200"></i>
  </button>
</template>
