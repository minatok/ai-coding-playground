import PropTypes from 'prop-types'

export function ChatInput({ value, onChange, onSubmit, disabled }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <label htmlFor="user-query" className="sr-only">
        お肌の悩みを入力
      </label>
      <input
        id="user-query"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="例: 乾燥肌でも夕方まで潤う化粧水が知りたい"
        aria-label="相談内容を入力"
      />
      <button
        type="submit"
        className="primary"
        disabled={disabled || value.trim().length === 0}
      >
        送信
      </button>
    </form>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}
