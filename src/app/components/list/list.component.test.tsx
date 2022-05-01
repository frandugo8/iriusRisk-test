
import "@testing-library/react"
import ReactDOM from "react-dom"
import { SwapiRemoteService } from "../../shared/services/remote/swapi/swapi.remote.service";
import ListComponent from "./list.component"
import {  BrowserRouter as Router} from "react-router-dom";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";
import { act, render, screen, fireEvent} from "@testing-library/react";


let spies: any
const initialState = {dispatch: {}, data: {navOption: "starships", isMobileNavOpen: false}}
let store: any

const verifyOrder = (
  elements: string[]
): void => {
  const texts = screen.getAllByText(/test-/i)
    .map(x => x.textContent);
  expect(texts).toEqual(elements);
};

describe("ListComponent", () => {
  beforeEach(() => {
    loadSpies()
  })

  const mockStore = configureStore()

  const setup = async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<Provider store={store}><Router><ListComponent option={"starships"}/></Router></Provider>)
    });
  }

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Router><ListComponent option={"starships"}/></Router></Provider>, div);
  })

  it('must check sort options', async () => {
    await setup()

    verifyOrder([
      'test-B',
      'test-A',
    ])

    const dropdownButton = screen.getByTestId("dropdown-button")
    fireEvent.click(dropdownButton)
    const nameOption = screen.getByText("Name")
    fireEvent.click(nameOption)

    verifyOrder([
      'test-A',
      'test-B',
    ])

    fireEvent.click(dropdownButton)
    const crewOption = screen.getByText("Crew")
    fireEvent.click(crewOption)

    verifyOrder([
      'test-B',
      'test-A',
    ])
  })

  it('must load initial users data', async () => {
    await setup()
  
    expect(spies.SwapiRemoteService.getCards).toHaveBeenCalled();
  })
})

function loadSpies() {
  spies = {
    SwapiRemoteService: {
      getCards: jest.spyOn(SwapiRemoteService, "getCards")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
            count: 0,
            next: null,
            previous: null,
            results: [{
              MGLT: "test1",
              cargo_capacity: "200",
              consumables: "test1",
              cost_in_credits: "test1",
              created: "test1",
              crew: "test1",
              edited: "test1",
              films: [],
              hyperdrive_rating: "test1",
              length: "test1",
              manufacturer: "test1",
              max_atmosphering_speed: "test1",
              model: "test1",
              name: "test-B",
              passengers: "test1",
              pilots: [],
              starship_class: "test1",
              url: "test1"
            },{
              MGLT: "test2",
              cargo_capacity: "400",
              consumables: "test2",
              cost_in_credits: "test2",
              created: "test2",
              crew: "test2",
              edited: "test2",
              films: [],
              hyperdrive_rating: "test2",
              length: "test2",
              manufacturer: "test2",
              max_atmosphering_speed: "test2",
              model: "test2",
              name: "test-A",
              passengers: "test2",
              pilots: [],
              starship_class: "test2",
              url: "test2"
            }]
          })
      }))
    }
  }
}