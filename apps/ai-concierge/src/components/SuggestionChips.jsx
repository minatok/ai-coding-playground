import PropTypes from 'prop-types'

export function SuggestionChips({ options, onSelect }) {
  if (!options?.length) return null

  return (
    <div className="chip-group" role="list">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className="chip"
          onClick={() => onSelect(option)}
          role="listitem"
        >
          {option}
        </button>
      ))}
    </div>
  )
}

SuggestionChips.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
}
