//State Object Types
type NoteObjType = {
  id: string
  note: string
  stared: boolean
  deleted: boolean
}
type NoteObjTypeStared = { stared: true } & NoteObjType
type NoteObjTypeTrash = { deleted: true } & NoteObjType

type GlobalState = {
  notes: NoteObjType[]
  trash: NoteObjTypeTrash[]
  stared: NoteObjTypeStared[]
}

// Action Object Types
type ActionTypeEdit = {
  type: 'edit'
  payload: {
    id: string
    update: string
  }
}
type ActionTypeBooleans = {
  type: 'star' | 'trash' | 'delete' | 'unstar' | 'restore'
  payload: {
    id: string
  }
}
type ActionType =
  | {
      type: 'add'
      payload: {
        details: string
      }
    }
  | ActionTypeBooleans
  | ActionTypeEdit
