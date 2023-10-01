import React, { Component } from "react";
import SearchBar from "./SearchBar/searchBar";
import { ImageGallery } from "./ImageGallery/imageGallery";
import ImageGalleryItem from "./ImageGalleryItem/imageGalleryItem";
import { AppContainer } from "./AppStyle";
import Modal from "./Modal/modal";
import { Loader } from 'components/Loader/loader';
import Button from "./Button/button";
import { fetchPhoto } from "service/api";



export default class App extends Component {
  state = {
    searchText: null,
    search: null,
    modal: {
      isOpen: false,
      data: null,
    },
    isLoading: false,
    error: null,
    page: 1,
  }

  handleFormSubmit = Search => {
    this.setState({ searchText: Search });
  }

  fetchSearchPhoto = async () => {
    try {
      this.setState({ isLoading: true });
      const photo = await fetchPhoto(this.state.searchText, 1);
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

  loadMore = async () => {
    try {
      let nextPage = this.state.page + 1;
      const photo = await fetchPhoto(this.state.searchText, nextPage);
      this.setState(prevState => {
        return {
          search: [...prevState.search, ...photo],
          page: nextPage,
          isLoading: true,
        }
      })
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }



  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchText;
    const nextSearch = this.state.searchText;
    if (prevSearch !== nextSearch) {
      this.fetchSearchPhoto();
    }
  }



  onOpenModal = (modalData) => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
      },
    });
  }

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  }




  render() {
    const showPost = Array.isArray(this.state.search) && this.state.search.length;

    return (
      <AppContainer>
        <SearchBar handleFormSubmit={this.handleFormSubmit}></SearchBar>

        <ImageGallery>
          {this.state.error && <p>{this.state.error}</p>}
          {showPost && this.state.search.map(photo => {
            return (
              <ImageGalleryItem onOpenModal={this.onOpenModal}
                key={photo.id}
                webformatURL={photo.webformatURL}
                largeImageURL={photo.largeImageURL}
              />
            );
          })
          }
        </ImageGallery>
        {this.state.isLoading && (
          <Loader />)}
        {showPost && (
          <Button onloadMore={this.loadMore} />
        )}

        {this.state.modal.isOpen && <Modal
          largeImageURL={this.state.modal.data}
          onCloseModal={this.onCloseModal} />}
      </AppContainer>


    );
  };
}
