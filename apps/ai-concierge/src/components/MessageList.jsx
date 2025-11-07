import PropTypes from 'prop-types'
import { ChatBubble } from './ChatBubble.jsx'
import { ProductCard } from './ProductCard.jsx'

export function MessageList({
  messages,
  expandedEvidenceId,
  onToggleEvidence,
  onSaveMemo,
  savedProductIds,
  onSelectFollowUp,
}) {
  return (
    <div className="message-list" aria-live="polite">
      {messages.map((message) => (
        <div key={message.id} className="message-row">
          <ChatBubble role={message.role}>
            <p>{message.text}</p>
            {message.payload?.followUpOptions ? (
              <div className="quick-replies" role="group" aria-label="選択肢">
                {message.payload.followUpOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className="chip"
                    onClick={() => onSelectFollowUp(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : null}
            {message.role === 'assistant' && message.payload?.product && (
              <ProductCard
                product={message.payload.product}
                showEvidence={expandedEvidenceId === message.payload.product.id}
                onToggleEvidence={onToggleEvidence}
                onSaveMemo={onSaveMemo}
                isSaved={savedProductIds.includes(message.payload.product.id)}
              />
            )}
          </ChatBubble>
        </div>
      ))}
    </div>
  )
}

MessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['user', 'assistant']).isRequired,
      text: PropTypes.string.isRequired,
      payload: PropTypes.shape({
        product: PropTypes.object,
      }),
    }),
  ).isRequired,
  expandedEvidenceId: PropTypes.string,
  onToggleEvidence: PropTypes.func.isRequired,
  onSaveMemo: PropTypes.func.isRequired,
  savedProductIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectFollowUp: PropTypes.func.isRequired,
}
