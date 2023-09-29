
import React from 'react'
import { ImageGalleryItemImg, ImageGalleryItemLi } from './imageGalleryItemStyle'

export const ImageGalleryItem = ({ id, webformatURL }) => {

	return (
		<ImageGalleryItemLi key={id}>
			<ImageGalleryItemImg src={webformatURL} alt="" />
		</ImageGalleryItemLi>
	)
}
