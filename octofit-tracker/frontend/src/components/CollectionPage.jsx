function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) {
    return value.length ? value.map(formatValue).join(', ') : '—'
  }
  if (typeof value === 'object') {
    const displayValue = value.name ?? value.username ?? value.email ?? value.points
    return displayValue === undefined ? '[Detalle]' : formatValue(displayValue)
  }
  if (typeof value === 'boolean') return value ? 'Sí' : 'No'
  return String(value)
}

function labelFor(key) {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^./, (letter) => letter.toUpperCase())
}

export default function CollectionPage({ title, description, items, loading, error, retry }) {
  return (
    <section className="resource-page">
      <div className="section-heading resource-heading">
        <div>
          <p className="eyebrow">OCTOFIT TRACKER</p>
          <h1>{title}</h1>
        </div>
        <span className="section-note">
          {loading ? 'Cargando…' : `${items.length} ${items.length === 1 ? 'registro' : 'registros'}`}
        </span>
      </div>
      <p className="resource-description">{description}</p>

      {loading && <p aria-live="polite" className="resource-message">Cargando datos…</p>}
      {!loading && error && (
        <div className="resource-message resource-error" role="alert">
          <p>{error}</p>
          <button className="retry-button" onClick={retry} type="button">Intentar de nuevo</button>
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <p className="resource-message">Todavía no hay registros para mostrar.</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="resource-grid">
          {items.map((item, index) => {
            const fields = Object.entries(item).filter(([key]) => !['_id', '__v'].includes(key))
            return (
              <article className="resource-card" key={item._id ?? item.id ?? index}>
                <dl>
                  {fields.map(([key, value]) => (
                    <div className="resource-field" key={key}>
                      <dt>{labelFor(key)}</dt>
                      <dd>{formatValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
