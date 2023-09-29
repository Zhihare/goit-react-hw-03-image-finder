import React, { Component } from 'react'
import { SearchBarForm, SearchBarHeader, SearchBarButton, SerchBarButtonLabel, SerchBarInput } from './searchBarStyle'


export default class SearchBar extends Component {
	state = {
		search: null,
	};

	handleSearchChange = event => {
		this.setState({
			search: event.currentTarget.value.toLowerCase()
		});
	}


	handleSubmit = event => {
		event.preventDefault();

		if (this.state.search.trim() === '') {
			alert('Заповніть поле пошуку!');
			return;
		}
		this.props.handleFormSubmit(this.state.search);
		this.setState({ search: null });
	}


	render() {
		return (
			<SearchBarHeader onSubmit={this.handleSubmit}>
				<SearchBarForm>
					<SearchBarButton type="submit">
						<SerchBarButtonLabel>Search</SerchBarButtonLabel>
					</SearchBarButton>

					<SerchBarInput
						type="text"
						placeholder="Search images and photos"
						onChange={this.handleSearchChange}
					/>
				</SearchBarForm>
			</SearchBarHeader>
		);
	}
}
