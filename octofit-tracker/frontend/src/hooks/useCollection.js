import { useCallback, useEffect, useState } from 'react'

export default function useCollection(loadCollection) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let active = true

    async function load() {
      setLoading(true)
      setError('')
      try {
        const collection = await loadCollection()
        if (active) setItems(collection)
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : 'No se pudieron cargar los datos.')
        }
      } finally {
        if (active) setLoading(false)
      }
    }

    load()
    return () => {
      active = false
    }
  }, [loadCollection, reloadKey])

  const retry = useCallback(() => setReloadKey((key) => key + 1), [])
  return { items, loading, error, retry }
}
