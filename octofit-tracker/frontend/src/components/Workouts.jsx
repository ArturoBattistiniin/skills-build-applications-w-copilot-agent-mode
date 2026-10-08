import { useCallback } from 'react'
import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

export default function Workouts() {
  const loadWorkouts = useCallback(
    () => fetch(`${API_BASE_URL}/api/workouts/`).then(readCollectionResponse),
    [],
  )
  const collection = useCollection(loadWorkouts)

  return (
    <CollectionPage
      description="Encuentra una sesión adaptada a tu actividad y nivel."
      title="Entrenamientos"
      {...collection}
    />
  )
}
