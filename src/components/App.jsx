import React, { Component } from "react";
import SearchBar from "./SearchBar/searchBar";
import ImageGallery from "./ImageGallery/imageGallery";
import { Button } from "./Button/button";
import { AppContainer } from "./AppStyle";
import { ToastContainer } from 'react-toastify';



export default class App extends Component {
  state = {
    search: null,
  }

  handleFormSubmit = Search => {
    this.setState({ search: Search });
  }

  render() {
    return (

      <AppContainer>
        <SearchBar handleFormSubmit={this.handleFormSubmit}></SearchBar>

        <ImageGallery searchInfo={this.state.search}>

        </ImageGallery>
        <Button />

      </AppContainer>


    );
  };
}
