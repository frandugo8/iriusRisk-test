
import reducer, { setNavOption, toggleMobileNav } from './data.slice'

let previousState

describe("DataSlice", () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {type: undefined})).toEqual({"navOption": undefined, "isMobileNavOpen": false})
  })

  it('should set nav option', () => {
    previousState = {navOption: undefined, isMobileNavOpen: false}
  
    expect(reducer(previousState, setNavOption({navOption: "people"}))).toEqual({navOption: "people", isMobileNavOpen: false})
  })

  it('should toggle mobileNav', () => {
    previousState = {navOption: undefined, isMobileNavOpen: false}
  
    expect(reducer(previousState, toggleMobileNav())).toEqual({navOption: undefined, isMobileNavOpen: true})
  })
})



