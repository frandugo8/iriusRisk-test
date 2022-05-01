
import "@testing-library/react"
import { SwapiRemoteService } from "./swapi.remote.service";

describe("SwapiRemoteService", () => {
  let fetch: typeof global.fetch;

  beforeAll(() => {
    fetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = fetch;
  });

  it('should get cards data when getCards method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    const page = "1"
    const option = "planets"
    const cards = await SwapiRemoteService.getCards(option, page)
  
    expect(global.fetch).toHaveBeenCalledWith(
      `https://swapi.dev/api/${option}?page=${page}`,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(cards).toStrictEqual([{}])
  })

  it('should get user info when getUserInfo method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}])
    const url = "https://swapi.dev/api/people/1"
    const userInfo = await SwapiRemoteService.getUserInfo(url)
  
    expect(global.fetch).toHaveBeenCalledWith(url,
      expect.objectContaining({
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      })
    )

    expect(userInfo).toStrictEqual([{}])
  })
})