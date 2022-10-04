import {useEffect} from 'react'
import { createPortal } from 'react-dom'
import css from 'shared/Modal/Modal.module.css'
import PropTypes from 'prop-types'

const modalRoot= document.getElementById("modal-root")

export default function Modal({ onClose, modalContent }) {

    useEffect(() => {
        
        const handleEscClick = (e) => {
            if (e.code === "Escape") {
                onClose()
            }
        }
            window.addEventListener("keydown", handleEscClick)

            return () => {
                console.log("removeEventListener")
                document.removeEventListener("keydown", handleEscClick)
        }
        }, [onClose]
    )

    const handleOverlayClick = (e) => {
            if (e.target === e.currentTarget) {
                onClose()
            }
    }
    
        
    const { largeImageURL } = modalContent
    
    return createPortal(
        <div className={css.overlay} onClick={handleOverlayClick}>
            <div className={css.modal}>
                <img src={largeImageURL} alt="" />
            </div>
        </div>, modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    modalContent: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired
    })
}
