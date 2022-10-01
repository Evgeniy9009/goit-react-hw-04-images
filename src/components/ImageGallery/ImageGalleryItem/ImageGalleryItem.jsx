import React from 'react'
import css from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem.module.css'
// import { nanoid } from 'nanoid'
import PropTypes from 'prop-types'


export default function ImageGalleryItem({id,webformatURL,largeImageURL, onClick}) {
  // console.log(items)
  // const itemId=nanoid()
 
  return (
    <>
      <li key={id} className={css.galleryItem} onClick={() => onClick({largeImageURL})}>
      <img className={css.galleryItemImage} src={webformatURL} alt="" />
    </li>
    </>
    
  )
}

ImageGalleryItem.propTypes = {
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL:PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

