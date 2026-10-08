const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const safeCodespaceName =
  codespaceName && /^[a-z0-9-]+$/i.test(codespaceName) ? codespaceName : null

export const API_BASE_URL = safeCodespaceName
  ? `https://${safeCodespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

export async function readCollectionResponse(response) {
  if (!response.ok) {
    throw new Error(`La API respondió con el estado ${response.status}.`)
  }

  const payload = await response.json()
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.data)) return payload.data

  throw new Error('La API devolvió una respuesta de colección no válida.')
}
