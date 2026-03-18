// Get API URL from environment or use default
export const getApiUrl = (): string => {
  // Try reading from window location search params or meta tag first (for runtime config)
  if (typeof window !== 'undefined') {
    const meta = document.querySelector('meta[name="api-url"]');
    if (meta) {
      return meta.getAttribute('content') || '';
    }
  }
  
  // Fall back to build-time env var
  return process.env.NEXT_PUBLIC_API_URL || 'https://gateway.bravewater-2d676d5c.southeastasia.azurecontainerapps.io'
}
