import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'

const TAB_CONFIG = [
  { key: 'review', label: '口コミ', helper: 'リアルな声' },
  { key: 'ingredient', label: '成分', helper: '配合から見る理由' },
  { key: 'tips', label: '使い方 Tips', helper: '効果を高めるコツ' },
]

function groupEvidence(evidence = []) {
  return evidence.reduce((acc, item) => {
    const bucket = acc[item.type] ?? []
    bucket.push(item)
    acc[item.type] = bucket
    return acc
  }, {})
}

export function EvidenceList({ evidence }) {
  const grouped = useMemo(() => groupEvidence(evidence), [evidence])
  const availableTabs = useMemo(
    () => TAB_CONFIG.filter((tab) => grouped[tab.key]?.length),
    [grouped],
  )
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.key ?? null)

  useEffect(() => {
    if (!availableTabs.length) {
      setActiveTab(null)
      return
    }
    if (!availableTabs.some((tab) => tab.key === activeTab)) {
      setActiveTab(availableTabs[0].key)
    }
  }, [availableTabs, activeTab])

  if (!availableTabs.length) return null

  const items = grouped[activeTab] ?? []

  return (
    <div className="evidence-section">
      <div className="evidence-header">
        <h4 className="evidence-title">根拠</h4>
        <p className="evidence-subtitle">選んだ理由をタブで確認できます</p>
      </div>
      <div className="evidence-tabs" role="tablist">
        {availableTabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            className={`evidence-tab${activeTab === tab.key ? ' is-active' : ''}`}
            aria-selected={activeTab === tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.label}</span>
            <small>{tab.helper}</small>
          </button>
        ))}
      </div>
      <ul className="evidence-list">
        {items.map((item) => (
          <li key={item.id} className="evidence-item">
            <div className="evidence-content">
              <p className="evidence-quote">“{item.quote}”</p>
              <p className="evidence-source">
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.source}
                  </a>
                ) : (
                  item.source
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

EvidenceList.propTypes = {
  evidence: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['review', 'ingredient', 'tips']).isRequired,
      source: PropTypes.string.isRequired,
      quote: PropTypes.string.isRequired,
      url: PropTypes.string,
    }),
  ),
}
