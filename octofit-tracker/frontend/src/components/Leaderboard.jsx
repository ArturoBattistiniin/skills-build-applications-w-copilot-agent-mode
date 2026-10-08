import { useCallback } from 'react'
import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

export default function Leaderboard() {
  const loadLeaderboard = useCallback(
    () => fetch(`${API_BASE_URL}/api/leaderboard/`).then(readCollectionResponse),
    [],
  )
  const collection = useCollection(loadLeaderboard)

  return (
    <CollectionPage
      description="Consulta la clasificación y los puntos ganados por cada integrante."
      title="Clasificación"
      {...collection}
    />
  )
}
