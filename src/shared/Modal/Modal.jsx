import { Component } from 'react'
import { createPortal } from 'react-dom'
import css from 'shared/Modal/Modal.module.css'
import PropTypes from 'prop-types'


const modalRoot= document.getElementById("modal-root")

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener("keydown", this.closeModal)
  }

  componentWillUnmount() {
    document.removeEventListener("keydown" , this.closeModal)
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === "Escape") {
      this.props.onClose()
    }
  }

  render () {
    const { largeImageURL } = this.props.modalContent
    console.log(this.props.modalContent.largeImageURL)
    return createPortal(
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
            <img src={largeImageURL} alt="" />
        </div>
    </div>, modalRoot
    )
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalContent: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired
    })
  }
 
  