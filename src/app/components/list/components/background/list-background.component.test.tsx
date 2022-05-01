import "@testing-library/react"
import ReactDOM from "react-dom"
import ListBackgroundComponent from "./list-background.component";

describe("ListBackgroundComponent", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ListBackgroundComponent/>, div);
  })
})