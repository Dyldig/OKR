import { create } from 'zustand'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: string
}

interface CoachStore {
  messages: ChatMessage[]
  streaming: boolean
  sessionPersonId: string | null
  sessionOKRContext: string | null
  addMessage: (msg: Omit<ChatMessage, 'id' | 'createdAt'>) => void
  appendToLast: (chunk: string) => void
  setStreaming: (v: boolean) => void
  setContext: (personId: string, okrContext: string) => void
  clearChat: () => void
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export const useCoachStore = create<CoachStore>((set) => ({
  messages: [],
  streaming: false,
  sessionPersonId: null,
  sessionOKRContext: null,

  addMessage: (msg) => set(state => ({
    messages: [
      ...state.messages,
      { ...msg, id: makeId(), createdAt: new Date().toISOString() },
    ],
  })),

  appendToLast: (chunk) => set(state => {
    const msgs = [...state.messages]
    if (msgs.length === 0) return state
    const last = msgs[msgs.length - 1]
    msgs[msgs.length - 1] = { ...last, content: last.content + chunk }
    return { messages: msgs }
  }),

  setStreaming: (v) => set({ streaming: v }),

  setContext: (personId, okrContext) => set({
    sessionPersonId: personId,
    sessionOKRContext: okrContext,
  }),

  clearChat: () => set({
    messages: [],
    streaming: false,
    sessionPersonId: null,
    sessionOKRContext: null,
  }),
}))
