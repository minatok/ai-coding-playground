import PropTypes from 'prop-types'

export function ChatBubble({ role, children }) {
  return (
    <div className={`bubble bubble-${role}`}>
      <div className="bubble-body">{children}</div>
    </div>
  )
}

ChatBubble.propTypes = {
  role: PropTypes.oneOf(['user', 'assistant']).isRequired,
  children: PropTypes.node.isRequired,
}
