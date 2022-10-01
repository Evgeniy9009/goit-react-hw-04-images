import React from 'react'
import css from 'components/Button/Button.module.css'

import PropTypes from 'prop-types'

export default function Buton({ text, onClick }) {

  return (
      <button onClick={onClick} className={css.button}>{text }</button>
  )
}

Buton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired

}
