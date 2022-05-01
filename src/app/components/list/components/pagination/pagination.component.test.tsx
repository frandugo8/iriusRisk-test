
import "@testing-library/react"
import ReactDOM from "react-dom"
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { render, screen, fireEvent} from "@testing-library/react"
import PaginationComponent from "./pagination.component"
import {BrowserRouter as Router} from 'react-router-dom';


let store: any
let initialState = {data: {navOption: "planets"}}

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate
}));

describe("PaginationComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><PaginationComponent hasNext={true} hasPrev={true} perPage={10} total={60}/></Router></Provider>, div);
  })

  it('navigates to next page and then returns to initial page', () => {
    const initialState = {data: {isMobileNavOpen: false}}
    store = mockStore(initialState)
    render(<Provider store={store}><Router><PaginationComponent hasNext={true} hasPrev={true} perPage={10} total={60}/></Router></Provider>)
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    const nextButton = screen.getByText("Next")
    fireEvent.click(nextButton);
    // expect(mockedNavigate).toHaveBeenCalled()
  })
})

