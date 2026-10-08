import { useCallback } from 'react'
import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

export default function Teams() {
  const loadTeams = useCallback(
    () => fetch(`${API_BASE_URL}/api/teams/`).then(readCollectionResponse),
    [],
  )
  const collection = useCollection(loadTeams)

  return (
    <CollectionPage
      description="Explora los equipos y sus integrantes."
      title="Equipos"
      {...collection}
    />
  )
}
