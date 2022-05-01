import "@testing-library/react"
import ReactDOM from "react-dom"
import { fireEvent, render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import HeaderDropdownComponent from "./dropdown.component";

describe("DropdownComponent", () => {
  const setSortOption = jest.fn();

  const initialState = {data: {navOption: "planets"}}

  let store: any
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><HeaderDropdownComponent sortOption={"unselect"} setSortOption={setSortOption}/></Provider>, div);
  });

  it('should be all options available if navOption is set to starships', () => {
    store = mockStore({data: {navOption: "starships"}})
    render(<Provider store={store}><HeaderDropdownComponent sortOption={"unselect"} setSortOption={setSortOption}/></Provider>)
    expect(screen.queryByText("Unselect")).not.toBeInTheDocument()
    expect(screen.queryByText("Name")).not.toBeInTheDocument()
    expect(screen.queryByText("Crew")).not.toBeInTheDocument()
    expect(screen.queryByText("Cargo capacity")).not.toBeInTheDocument()

    const dropdownButton = screen.getByTestId("dropdown-button")
    fireEvent.click(dropdownButton)

    expect(screen.getByText("Unselect")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Crew")).toBeInTheDocument()
    expect(screen.getByText("Cargo capacity")).toBeInTheDocument()
  })

  it('should select a dropdown option after clicking dropdown button', () => {
    store = mockStore({data: {navOption: "planets"}})
    render(<Provider store={store}><HeaderDropdownComponent sortOption={"unselect"} setSortOption={setSortOption}/></Provider>)
    expect(screen.queryByText("Unselect")).not.toBeInTheDocument()
    expect(screen.queryByText("Name")).not.toBeInTheDocument()
    expect(screen.queryByText("Crew")).not.toBeInTheDocument()
    expect(screen.queryByText("Cargo capacity")).not.toBeInTheDocument()

    const dropdownButton = screen.getByTestId("dropdown-button")
    fireEvent.click(dropdownButton)

    expect(screen.getByText("Unselect")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.queryByText("Crew")).not.toBeInTheDocument()
    expect(screen.queryByText("Cargo capacity")).not.toBeInTheDocument()

    const unselectOption = screen.getByText("Unselect")
    fireEvent.click(unselectOption)
    expect(screen.queryByText("Name")).not.toBeInTheDocument()
    expect(setSortOption).toHaveBeenCalled()
  });
})