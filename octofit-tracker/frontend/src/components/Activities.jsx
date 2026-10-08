import { useCallback } from 'react'
import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

export default function Activities() {
  const loadActivities = useCallback(
    () => fetch(`${API_BASE_URL}/api/activities/`).then(readCollectionResponse),
    [],
  )
  const collection = useCollection(loadActivities)

  return (
    <CollectionPage
      description="Revisa las sesiones y el progreso registrado por la comunidad."
      title="Actividad"
      {...collection}
    />
  )
}
