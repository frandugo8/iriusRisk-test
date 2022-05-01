import "@testing-library/react"
import ReactDOM from "react-dom"
import CardComponent from "./card.component";
import { render, screen } from "@testing-library/react";
import configureStore from 'redux-mock-store'
import { Provider } from "react-redux";

const planet = {
  climate: "test",
  created: "test",
  diameter: "test",
  edited: "test",
  films: [],
  gravity: "test",
  name: "test",
  orbital_period: "test",
  population: "1",
  residents: ["test"],
  rotation_period: "test",
  surface_water: "test",
  terrain: "test",
  url: "test"
}

const starship = {
  MGLT: "test",
  cargo_capacity: "test",
  consumables: "test",
  cost_in_credits: "test",
  created: "test",
  crew: "test",
  edited: "test",
  films: [],
  hyperdrive_rating: "test",
  length: "test",
  manufacturer: "test",
  max_atmosphering_speed: "test",
  model: "test",
  name: "test",
  passengers: "test",
  pilots: [],
  starship_class: "test",
  url: "test",
}

const people = {
  birth_year: "test",
  created: "test",
  edited: "test",
  eye_color: "test",
  films: [],
  gender: "test",
  hair_color: "test",
  height: "test",
  homeworld: "test",
  mass: "test",
  name: "test",
  skin_color: "test",
  species: [],
  starships: [],
  url: [],
  vehicles: []
}

const vehicle = {
  cargo_capacity: "test",
  consumables: "test",
  cost_in_credits: "test",
  created: "test",
  crew: "test",
  edited: "test",
  films: [],
  length: "test",
  manufacturer: "test",
  max_atmosphering_speed: "test",
  model: "test",
  name: "test",
  passengers: "test",
  pilots: [],
  url: "test",
  vehicle_class: "test",
}

let initialState = {data: {navOption: "planets"}}
let store: any

describe("CardComponent", () => {
  const mockStore = configureStore()

  it('renders without crashing', () => {
    store = mockStore(initialState)
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><CardComponent element={planet}/></Provider>, div);
  })

  it('check unknown population details', () => {
    planet.population = "unknown"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Unknown population")).toBeInTheDocument();
  })

  it('check population details', () => {
    planet.population = "1"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Population of 1")).toBeInTheDocument();
  })

  it('check K population details', () => {
    planet.population = "1000"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Population of 1 K")).toBeInTheDocument();
  })

  it('check M population details', () => {
    planet.population = "1000000"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Population of 1 M")).toBeInTheDocument();
  })

  it('check B population details', () => {
    planet.population = "1000000000"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Population of 1000 B")).toBeInTheDocument();
  })

  it('check T population details', () => {
    planet.population = "1000000000000"
    store = mockStore(initialState)
    render(<Provider store={store}><CardComponent element={planet}/></Provider>)
    expect(screen.getByText("Population of 1000000 T")).toBeInTheDocument();
  })

  it('check starships details', () => {
    store = mockStore({data: {navOption: "starships"}})
    render(<Provider store={store}><CardComponent element={starship}/></Provider>)
    expect(screen.getByText(/Cargo capacity/i)).toBeInTheDocument();
  })

  it('check people details', () => {
    store = mockStore({data: {navOption: "people"}})
    render(<Provider store={store}><CardComponent element={people}/></Provider>)
    expect(screen.getByText(/cm/i)).toBeInTheDocument();
  })

  it('check vehicles details', () => {
    store = mockStore({data: {navOption: "vehicles"}})
    render(<Provider store={store}><CardComponent element={vehicle}/></Provider>)
    expect(screen.getByText(/Depletion of resources/i)).toBeInTheDocument();
  })
})