import PropTypes from 'prop-types'
import { EvidenceList } from './EvidenceList.jsx'

export function ProductCard({
  product,
  showEvidence,
  onToggleEvidence,
  onSaveMemo,
  isSaved,
}) {
  if (!product) return null

  return (
    <div className="product-card" aria-live="polite">
      <div className="product-header">
        <img
          src={product.image}
          alt={`${product.name}のパッケージ`}
          className="product-image"
        />
        <div className="product-meta">
          <p className="product-brand">{product.brand}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-rating">
            ★{product.rating.toFixed(1)} ・ {product.price}
          </p>
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="product-reason">{product.reason}</p>

      <div className="product-actions">
        <button
          type="button"
          className="secondary"
          onClick={() => onToggleEvidence(product.id)}
          aria-expanded={showEvidence}
          aria-controls={`evidence-${product.id}`}
        >
          根拠を見る
        </button>
        <button
          type="button"
          className="primary"
          onClick={() => onSaveMemo(product)}
          disabled={isSaved}
          aria-disabled={isSaved}
        >
          {isSaved ? '保存済み' : 'メモ保存'}
        </button>
      </div>

      {showEvidence && (
        <div id={`evidence-${product.id}`}>
          <EvidenceList evidence={product.evidence} />
        </div>
      )}
    </div>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    rating: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    reason: PropTypes.string.isRequired,
    evidence: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        source: PropTypes.string.isRequired,
        quote: PropTypes.string.isRequired,
        url: PropTypes.string,
      }),
    ).isRequired,
  }),
  showEvidence: PropTypes.bool.isRequired,
  onToggleEvidence: PropTypes.func.isRequired,
  onSaveMemo: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
}
