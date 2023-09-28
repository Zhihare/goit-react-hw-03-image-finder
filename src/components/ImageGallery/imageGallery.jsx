import React, { Component } from 'react'
import { ImageGalleryUl } from './imageGalleryStyle'
import axios from "axios";
import { ImageGalleryItem } from 'components/ImageGalleryItem/imageGalleryItem';

export default class ImageGallery extends Component {
	state = {
		search: null,
	}

	async componentDidUpdate(prevProps, prevState) {
		const prevSearch = prevProps.searchInfo;
		const nextSearch = this.props.searchInfo;
		const page = 1;

		if (prevSearch !== nextSearch) {
			const url = "https://pixabay.com/api/";
			const apiKey = "38868340-f331cc79d6b60576f7cfbf452";


			const params = new URLSearchParams({
				page,
				per_page: 12,
				q: nextSearch,
				image_type: 'photo',
				orientation: 'horizontal',
				safesearch: true,
			});
			const { data } = await axios.get(`${url}?key=${apiKey}`, { params })
			const { hits } = data;
			console.dir(hits);
			return this.setState({ search: hits });

		}
	}


	render() {
		const showPost = Array.isArray(this.state.search) && this.state.search.length;
		return (
			<ImageGalleryUl>
				{!this.props.searchInfo && <div>Заповніть поле пошук!</div>}
				{showPost && this.state.search.map(photo => {
					return (
						<ImageGalleryItem key={photo.id}
							webformatURL={photo.webformatURL}
							largeImageURL={photo.largeImageURL}
						/>
					);
				})
				}
			</ImageGalleryUl>
		)
	}
}
