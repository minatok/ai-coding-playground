import PropTypes from 'prop-types'

export function MemoPanel({ memos, onClear, onClose }) {
  return (
    <aside className="memo-panel">
      <header className="memo-header">
        <h2 id="memo-title">メモ</h2>
        <div className="memo-header-actions">
          {onClose ? (
            <button
              type="button"
              className="text-link"
              onClick={onClose}
              aria-label="メモ一覧を閉じる"
            >
              閉じる
            </button>
          ) : null}
          <button
            type="button"
            className="secondary"
            onClick={onClear}
            disabled={memos.length === 0}
          >
            全削除
          </button>
        </div>
      </header>

      {memos.length === 0 ? (
        <p className="memo-empty">保存した商品はまだありません。</p>
      ) : (
        <ul className="memo-list">
          {memos.map((memo) => (
            <li key={memo.product.id} className="memo-item">
              <div className="memo-product">
                <p className="memo-brand">{memo.product.brand}</p>
                <p className="memo-name">{memo.product.name}</p>
              </div>
              <p className="memo-tags">
                {memo.product.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </p>
              <time className="memo-date">
                保存日時: {new Date(memo.savedAt).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

MemoPanel.propTypes = {
  memos: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        brand: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      }).isRequired,
      savedAt: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func,
}
