const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? '/api'

/**
 * Shared API configuration. UI visibility is not security; authorization will
 * always be enforced by the backend when protected endpoints are implemented.
 */
export async function getHealth(): Promise<unknown> {
  const response = await fetch(`${apiBaseUrl}/health`)

  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`)
  }

  return response.json()
}
