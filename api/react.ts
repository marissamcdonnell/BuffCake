// Vercel serverless function: POST /api/react
// Asks Claude for a one-line reaction from the cake. The API key stays on the server.
// Set ANTHROPIC_API_KEY in Vercel → Project → Settings → Environment Variables.
// No key? Returns 503 and the browser uses a canned line instead.

const MODEL = 'claude-haiku-5-5'
const ALLOWED_LEVELS = ['Soft Sponge', 'Toned Torte', 'Swole Sponge', 'Mighty Muffin', 'Beef Cake']

type Body = { foods: string[]; gained: number; level: string }

function parse(input: unknown): Body | null {
  if (!input || typeof input !== 'object') return null
  const { foods, gained, level } = input as Record<string, unknown>
  if (!Array.isArray(foods) || foods.length < 1 || foods.length > 3) return null
  // Only short lowercase ids reach the prompt, so players can't inject instructions.
  if (!foods.every((f) => typeof f === 'string' && /^[a-z]{1,16}$/.test(f))) return null
  if (typeof gained !== 'number' || !Number.isFinite(gained) || Math.abs(gained) > 100) return null
  if (typeof level !== 'string' || !ALLOWED_LEVELS.includes(level)) return null
  return { foods: foods as string[], gained: Math.round(gained), level }
}

export async function POST(request: Request): Promise<Response> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return Response.json({ error: 'not configured' }, { status: 503 })

  const body = parse(await request.json().catch(() => null))
  if (!body) return Response.json({ error: 'bad request' }, { status: 400 })

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 60,
      system:
        'You are BuffCake, a cake who is getting jacked by eating food. ' +
        'Reply with ONE short, funny, family-friendly line (max 15 words) in first person. ' +
        'No quotes, no emojis, no hashtags.',
      messages: [
        {
          role: 'user',
          content: `I just ate: ${body.foods.join(', ')}. Buff change: ${body.gained}. My level is now ${body.level}.`,
        },
      ],
    }),
  })

  if (!res.ok) return Response.json({ error: 'upstream' }, { status: 502 })

  const data = (await res.json()) as { content?: { type: string; text?: string }[] }
  const line = data.content?.find((c) => c.type === 'text')?.text?.trim()
  if (!line) return Response.json({ error: 'empty' }, { status: 502 })

  return Response.json({ line: line.slice(0, 200) })
}
