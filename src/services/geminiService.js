const GEMINI_URL = 'https://api.openai.com/v1/answers' // placeholder; replace with Gemini endpoint

export async function analyzeBinsWithGemini(bins){
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  if(!apiKey) throw new Error('Missing Gemini API key')

  const prompt = `Analyze these bins and provide JSON with overflowRisk, priority, pickupTime, environmentalImpact, suggestedActions. Bins: ${JSON.stringify(bins)}`

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gemini-pro',
      input: prompt,
      max_tokens: 512
    })
  })

  if(!res.ok) throw new Error('Gemini request failed')
  const data = await res.json()
  return data
}
