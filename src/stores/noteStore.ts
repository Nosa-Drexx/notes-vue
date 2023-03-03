import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

//Changes the boolean value of key decleared and  return seperated changed and unchanged values
const changeAndPushHelper = <T extends NoteObjType>(
  array: NoteObjType[],
  check: string,
  keytoChange: keyof T & keyof NoteObjType,
  initialArray: T[] = []
): readonly [T[], NoteObjType[] & T[]] => {
  const residueArray: NoteObjType[] & T[] = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].id === check) {
      const updateObj: T = {
        ...array[i],
        [keytoChange]: !array[i][keytoChange]
      } as T
      initialArray.push(updateObj)
    } else {
      residueArray.push(array[i])
    }
  }

  const sortedArray = initialArray

  return [sortedArray, residueArray] as const
}

//helper to separate stared notes
const helper = <T extends NoteObjType>(array: NoteObjType[]): T[] => {
  const data = []
  for (let i = 0; i < array.length; i++) {
    if (array[i].stared === true) data.push(array[i])
  }
  return data as T[]
}

export const noteStore = defineStore('noteStore', {
  state: (): GlobalState => ({
    notes: [{ note: 'trial', deleted: false, id: nanoid(), stared: false }],
    trash: [],
    stared: []
  }),
  getters: {},

  //Methods
  actions: {
    //Add to notes
    addNote(payload: NoteObjType): void {
      // Don't allow empty string
      if (payload.note === '' || payload.note === ' ') return

      const searchForDuplicate = this.notes.find((data) => data.note === payload.note)

      searchForDuplicate
        ? this.notes.unshift({ ...searchForDuplicate })
        : this.notes.unshift({ ...payload, id: nanoid() })
    },

    //Edit notes
    editNote(payload: { id: string; update: string }): void {
      // Don't allow empty string
      if (payload.update === '' || payload.update === ' ') return

      const updateNotes = this.notes.map((data) => {
        if (data.id === payload.id) {
          data.note = payload.update
        }
        return data
      })
      const updateStared = this.stared.map((data) => {
        if (data.id === payload.id) {
          data.note = payload.update
        }
        return data
      })
      this.notes = updateNotes
      this.stared = updateStared
    },

    //Delete notes temporarily to trash
    trashNotes(payload: { id: string }): void {
      const [sortedArray, residueArray] = changeAndPushHelper<NoteObjTypeTrash>(
        this.notes,
        payload.id,
        'deleted',
        []
      )
      const trashArray = [...sortedArray]
      const newNote = [...residueArray]

      const newStared = helper<NoteObjTypeStared>(residueArray)

      this.stared = newStared
      this.notes = newNote
      this.trash = [...trashArray, ...this.trash]
    },

    //Restore notes
    restoreNotes(payload: { id: string }): void {
      const [sortedArray, residueArray] = changeAndPushHelper<NoteObjTypeTrash>(
        this.trash,
        payload.id,
        'deleted',
        []
      )
      const newNotes = [...sortedArray, ...this.notes]
      const newStared = helper<NoteObjTypeStared>(sortedArray)

      this.notes = newNotes
      this.stared = [...newStared, ...this.stared]
      this.trash = [...residueArray]
    },

    //Star notes
    starNotes(payload: { id: string }): void {
      const [sortedArray] = changeAndPushHelper<NoteObjTypeStared>(
        this.notes,
        payload.id,
        'stared',
        []
      )
      const staredArray = [...sortedArray]
      const newNotes = this.notes.map((elem) => {
        if (elem.id === payload.id) {
          return { ...elem, stared: true }
        }
        return elem
      })

      this.notes = newNotes
      this.stared = [...staredArray, ...this.stared]
    },

    //Unstar notes
    unstarNotes(payload: { id: string }): void {
      const [, residueArray] = changeAndPushHelper<NoteObjTypeStared>(
        this.stared,
        payload.id,
        'stared',
        []
      )
      const staredArray = [...residueArray]
      const newNotes = this.notes.map((elem) => {
        if (elem.id === payload.id) {
          elem.stared = false
        }
        return elem
      })

      this.notes = newNotes
      this.stared = [...staredArray]
    },

    // delete note completely
    deleteNote(payload: { id: string }) {
      const newTrash = this.trash.filter((elem) => elem.id !== payload.id)

      this.trash = newTrash
    }
  }
})
