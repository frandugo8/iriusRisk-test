
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import HeaderComponent from "./header.component"
import {BrowserRouter as Router} from 'react-router-dom';
import { fireEvent, render, screen } from "@testing-library/react";

let store: any
const initialState = {dispatch: {}, data: {isMobileNavOpen: false}}
const setSortOption = jest.fn();
const handleSearch = jest.fn();

describe("HeaderComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <HeaderComponent
          option={"planets"}
          sortOption={"unselect"}
          setSortOption={setSortOption}
          handleSearch={handleSearch}/>
      </Provider>,
    div)
  })

  it('toggle mobile nav when nav button is called', () => {
    const initialState = {data: {isMobileNavOpen: true}}
    store = mockStore(initialState)

    render(
      <Provider store={store}>
        <Router>
          <HeaderComponent option={"planets"} sortOption={"unselect"} setSortOption={setSortOption} handleSearch={handleSearch}/>
        </Router>
      </Provider>
    )

    const mobileNavButton = screen.getByTestId("mobileNavButton")
    fireEvent.click(mobileNavButton);
  })
})