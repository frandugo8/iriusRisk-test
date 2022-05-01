import "@testing-library/react"
import { render } from "@testing-library/react";
import ReactDOM from "react-dom"
import { SwapiRemoteService } from "../../../../../shared/services/remote/swapi/swapi.remote.service";
import ResidentComponent from "./resident.component";
import { act } from "@testing-library/react"

let spies: any

describe("ResidentComponent", () => {
  beforeEach(() => {
    loadSpies()
  })

  const setup = async () => {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      render(<ResidentComponent resident={""}/>)
    });
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ResidentComponent resident={""}/>, div);
  })

  it('must load initial users data', async () => {
    await setup()
  
    expect(spies.SwapiRemoteService.getUserInfo).toHaveBeenCalled();
  })
})

function loadSpies() {
  spies = {
    SwapiRemoteService: {
      getUserInfo: jest.spyOn(SwapiRemoteService, "getUserInfo")
        .mockImplementation(() => Promise.resolve({ json: () => Promise.resolve(
          {
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
            starships: "test",
            url: "test",
            vehicles: "test",
          })
      }))
    }
  }
}