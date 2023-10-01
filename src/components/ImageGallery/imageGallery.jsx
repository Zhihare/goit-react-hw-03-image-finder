import { ImageGalleryUl } from './imageGalleryStyle'
import ImageGalleryItem from 'components/ImageGalleryItem/imageGalleryItem'
import React from 'react'

export const ImageGallery = ({ onOpenModal, error, showPost, Photos }) => {
	return (
		<ImageGalleryUl>
			{error && <p>{error}</p>}
			{showPost && Photos.map(photo => {
				return (
					<ImageGalleryItem onOpenModal={onOpenModal}
						key={photo.id}
						webformatURL={photo.webformatURL}
						largeImageURL={photo.largeImageURL}
					/>
				);
			})
			}
		</ImageGalleryUl>
	)
}

