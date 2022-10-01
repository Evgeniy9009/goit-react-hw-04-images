import React from 'react'
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem'
import css from 'components/ImageGallery/ImageGallery.module.css'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'

export default function ImageGallery({ items, onClick }) {

    const elements = items.map(({ id, webformatURL, largeImageURL }) =>
    <ImageGalleryItem key={nanoid()} id={id} webformatURL={webformatURL} largeImageURL={largeImageURL} onClick= {onClick}  />)

  return (
    <ul className={css.gallery}>
      {elements}
    </ul>
  )
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf( 
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL:PropTypes.string.isRequired
    })
  ),
  onClick: PropTypes.func.isRequired
}