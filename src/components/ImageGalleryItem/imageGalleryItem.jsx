
import React from 'react'
import { ImageGalleryItemImg, ImageGalleryItemLi } from './imageGalleryItemStyle'

export const ImageGalleryItem = ({ key, webformatURL }) => {

	return (
		<ImageGalleryItemLi key={key}>
			<ImageGalleryItemImg src={webformatURL} alt="" />
		</ImageGalleryItemLi>
	)
}
