import {useEffect} from 'react'
// import { createPortal } from 'react-dom'
import css from 'shared/Modal/Modal.module.css'
import PropTypes from 'prop-types'

export default function Modal({onClose, modalContent}) {

    const onClick = useEffect(() => {

        const closeModal = ({ target, currentTarget, code }) => {
            console.log(target, currentTarget)
            if (target === currentTarget || code === "Escape") {
                onClose()
            }
        }
        console.log("addEventListener")
        document.addEventListener("keydown", closeModal)

        return () => {
            console.log("removeEventListener")
            document.removeEventListener("keydown" , closeModal)
        }
    }, [onClose])


    const { largeImageURL } = modalContent
    
    return (
    //   onClick={closeModal}
    <div className={css.overlay} onClick={onClick}>
        <div className={css.modal}>
            <img src={largeImageURL} alt="" />
        </div>
    </div>
    )
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  modalContent: PropTypes.shape({
      largeImageURL: PropTypes.string.isRequired
    })
  }
 