import { useState, useRef, useEffect } from 'react'
import Anthropic from '@anthropic-ai/sdk'
import { useCoachStore } from '../../store/coachStore'
import { getTeamMember } from '../../data/team'

const QUICK_PROMPTS = [
  'Are these KRs strong enough?',
  'What would a stretch version look like?',
  'How do I make this more measurable?',
  'Am I overcommitted?',
  'What am I missing?',
  'Is this realistic for one quarter?',
]

function buildSystemPrompt(personId: string | null, okrContext: string | null): string {
  const person = personId ? getTeamMember(personId) : null

  let prompt = `You are an expert OKR coach working with Jeffries Group, an Australian organics recycling and landscaping business based in South Australia. You have deep knowledge of Jeffries' products, services, systems, and culture.

Jeffries context:
- Products: Powerscaper (landscaping equipment), Pellets range (C-100, CulChar, BioChar), compost, mulch
- Services: JCS (organics waste collection), Ag division (agriculture sales), Trade (landscape supply)
- Systems: ROSS/OEE (production), Employment Hero (HRIS), Mooncamp (OKR tool), AP Link (AP automation), CRM
- Sites: Buckland Park (main operations), Post East Waste (new venture)
- Partners: Cleanaway, Nutrien, RDN (reseller network)

Your coaching style:
- Direct, practical, and specific to Jeffries context — never generic
- Push for measurable, time-bound KRs with real numbers (not just activities)
- Challenge overcommitment and vague language
- Reference the person's actual history and patterns when relevant
- Keep responses concise — max 3–4 short paragraphs unless the question requires more detail`

  if (person) {
    prompt += `\n\nPerson you are coaching:
Name: ${person.name}
Role: ${person.role}
Area: ${person.area} | Division: ${person.div}
Level: ${person.level}
Reports to: ${person.mgr ?? 'N/A'}

OKR history:
${person.hist.map(h => `- ${h.q}: "${h.obj}" — ${h.prog}% (${h.note})`).join('\n')}

Coaching patterns observed:
${person.patterns.map((p, i) => `${i + 1}. ${p}`).join('\n')}

Current strategic priorities:
${person.strategic.map(s => `- ${s}`).join('\n')}`
  }

  if (okrContext) {
    prompt += `\n\nCurrent quarter OKRs being planned:\n${okrContext}`
  }

  return prompt
}

export function CoachChat() {
  const { messages, streaming, sessionPersonId, sessionOKRContext, addMessage, appendToLast, setStreaming } = useCoachStore()
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const clientRef = useRef<Anthropic | null>(null)

  useEffect(() => {
    clientRef.current = new Anthropic({
      apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY ?? '',
      dangerouslyAllowBrowser: true,
    })
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  async function send(text: string) {
    if (!text.trim() || streaming) return
    const userMsg = text.trim()
    setInput('')

    addMessage({ role: 'user', content: userMsg })
    addMessage({ role: 'assistant', content: '' })
    setStreaming(true)

    try {
      const systemPrompt = buildSystemPrompt(sessionPersonId, sessionOKRContext)
      const history = messages.filter(m => m.content).map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      }))

      const stream = clientRef.current!.messages.stream({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [...history, { role: 'user', content: userMsg }],
      })

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          appendToLast(event.delta.text)
        }
      }
    } catch (err) {
      appendToLast('\n\n_Error connecting to coach. Check your ANTHROPIC_API_KEY in .env._')
    } finally {
      setStreaming(false)
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send(input)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-[#878800] rounded-full flex items-center justify-center text-white text-xl mx-auto mb-3">
              🌿
            </div>
            <p className="text-stone-600 font-medium">OKR Coach ready</p>
            <p className="text-sm text-stone-400 mt-1">Ask anything about these OKRs or use a quick prompt below.</p>
          </div>
        )}

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-lg px-4 py-2.5 text-sm ${
              msg.role === 'user'
                ? 'bg-[#31261D] text-white'
                : 'bg-white border border-stone-200 text-stone-700'
            }`}>
              {msg.content
                ? msg.content.split('\n').map((line, i) => <p key={i} className={i > 0 ? 'mt-1' : ''}>{line}</p>)
                : (
                  <div className="flex items-center gap-1 py-1">
                    <span className="typing-dot w-1.5 h-1.5 bg-stone-400 rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-stone-400 rounded-full" />
                    <span className="typing-dot w-1.5 h-1.5 bg-stone-400 rounded-full" />
                  </div>
                )
              }
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick prompts */}
      {messages.length < 2 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {QUICK_PROMPTS.map(p => (
            <button
              key={p}
              onClick={() => send(p)}
              disabled={streaming}
              className="px-3 py-1.5 text-xs border border-[#878800] text-[#878800] rounded-full hover:bg-[#878800] hover:text-white transition-colors disabled:opacity-40"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-stone-200 bg-white">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={streaming}
            rows={2}
            placeholder="Ask about these OKRs… (Enter to send, Shift+Enter for new line)"
            className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-lg resize-none focus:outline-none focus:border-[#878800] disabled:opacity-50"
          />
          <button
            onClick={() => send(input)}
            disabled={streaming || !input.trim()}
            className="px-4 py-2 bg-[#878800] text-white rounded-lg text-sm font-medium hover:bg-[#6b6c00] disabled:opacity-40 transition-colors self-end"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
