import React, { Component } from 'react'
import { ImageGalleryUl } from './imageGalleryStyle'
import { ImageGalleryItem } from 'components/ImageGalleryItem/imageGalleryItem';
import { fetchPhoto } from 'service/api';
import Button from 'components/Button/button';

export default class ImageGallery extends Component {
	state = {
		search: null,
		isLoading: false,
		error: null,
		page: 1,
	}

	loadMore = async () => {
		let nextPage = this.state.page + 1;
		const photo = await fetchPhoto(this.props.searchInfo, nextPage);
		this.setState(prevState => {
			return {
				search: [...prevState.search, ...photo],
				page: nextPage,
			};
		});
	}

	fetchSearchPhoto = async () => {
		try {
			this.setState({ isLoading: true });
			const photo = await fetchPhoto(this.props.searchInfo, 1);
			this.setState({
				search: photo,
				page: 1,
			});
		} catch (error) {
			this.setState({ error: error.message });
		} finally {
			this.setState({ isLoading: false });

		}
	}


	componentDidUpdate(prevProps, prevState) {
		const prevSearch = prevProps.searchInfo;
		const nextSearch = this.props.searchInfo;
		if (prevSearch !== nextSearch) {
			this.fetchSearchPhoto();
		}
	}


	render() {
		const showPost = Array.isArray(this.state.search) && this.state.search.length;
		return (
			<div>
				<ImageGalleryUl>
					{this.state.isLoading && (
						<div>
							<p>Loading...</p>
						</div>
					)}

					{this.state.error && <p>{this.state.error}</p>}

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
				{showPost && (
					<Button onloadMore={this.loadMore} />
				)}
			</div>
		)
	}
}
