import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type ObjType = 'build' | 'improve' | 'maintain' | 'multi'
export type MultiSubType = 'milestone' | 'progress' | 'capability'

export interface KR {
  id: string
  text: string
  placeholder: boolean
}

export interface Session {
  id: string
  personId: string
  quarter: string
  themes: string[]
  focusAreas: Record<string, string[]>
  weights: Record<string, number>
  objTypes: Record<string, ObjType>
  multiSubTypes: Record<string, MultiSubType>
  objectives: Record<string, string>
  krs: Record<string, KR[]>
  constraints: string
  feedback: { irrelevant: string; improve: string }
  createdAt: string
  completedAt?: string
  currentStep: number
}

interface SessionStore {
  currentSession: Session | null
  savedSessions: Session[]
  startSession: (personId: string) => void
  updateSession: (data: Partial<Session>) => void
  saveSession: () => void
  loadSession: (id: string) => void
  clearCurrent: () => void
  deleteSession: (id: string) => void
}

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7)
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      currentSession: null,
      savedSessions: [],

      startSession: (personId) => {
        const session: Session = {
          id: makeId(),
          personId,
          quarter: 'Q1 FY27',
          themes: [],
          focusAreas: {},
          weights: {},
          objTypes: {},
          multiSubTypes: {},
          objectives: {},
          krs: {},
          constraints: '',
          feedback: { irrelevant: '', improve: '' },
          createdAt: new Date().toISOString(),
          currentStep: 1,
        }
        set({ currentSession: session })
      },

      updateSession: (data) => {
        const cur = get().currentSession
        if (!cur) return
        set({ currentSession: { ...cur, ...data } })
      },

      saveSession: () => {
        const cur = get().currentSession
        if (!cur) return
        const completed = { ...cur, completedAt: new Date().toISOString() }
        const saved = get().savedSessions
        const idx = saved.findIndex(s => s.id === completed.id)
        const next = idx >= 0
          ? saved.map(s => s.id === completed.id ? completed : s)
          : [completed, ...saved].slice(0, 20)
        set({ savedSessions: next, currentSession: completed })
      },

      loadSession: (id) => {
        const session = get().savedSessions.find(s => s.id === id)
        if (session) set({ currentSession: { ...session } })
      },

      clearCurrent: () => set({ currentSession: null }),

      deleteSession: (id) => {
        set(state => ({
          savedSessions: state.savedSessions.filter(s => s.id !== id),
          currentSession: state.currentSession?.id === id ? null : state.currentSession,
        }))
      },
    }),
    {
      name: 'jeffries-okr-sessions',
      partialize: (state) => ({
        savedSessions: state.savedSessions,
      }),
    }
  )
)
