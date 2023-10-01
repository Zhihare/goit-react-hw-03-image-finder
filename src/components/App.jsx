import React, { Component } from "react";
import SearchBar from "./SearchBar/searchBar";
import ImageGallery from "./ImageGallery/imageGallery";
import { AppContainer } from "./AppStyle";
import Modal from "./Modal/modal";




export default class App extends Component {
  state = {
    search: null,
    modal: {
      isOpen: false,
      data: null,
    },
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


  handleFormSubmit = Search => {
    this.setState({ search: Search });
  }

  render() {
    return (

      <AppContainer>
        <SearchBar handleFormSubmit={this.handleFormSubmit}></SearchBar>

        <ImageGallery searchInfo={this.state.search}
          onOpenModal={this.onOpenModal}>

        </ImageGallery>
        {this.state.modal.isOpen && <Modal
          largeImageURL={this.state.modal.data}
          onCloseModal={this.onCloseModal} />}
      </AppContainer>


    );
  };
}
