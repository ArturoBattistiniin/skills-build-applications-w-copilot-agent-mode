import { useCallback } from 'react'
import { API_BASE_URL, readCollectionResponse } from '../api.js'
import CollectionPage from './CollectionPage.jsx'
import useCollection from '../hooks/useCollection.js'

export default function Users() {
  const loadUsers = useCallback(
    () => fetch(`${API_BASE_URL}/api/users/`).then(readCollectionResponse),
    [],
  )
  const collection = useCollection(loadUsers)

  return (
    <CollectionPage
      description="Conoce a las personas que forman parte de OctoFit Tracker."
      title="Usuarios"
      {...collection}
    />
  )
}
