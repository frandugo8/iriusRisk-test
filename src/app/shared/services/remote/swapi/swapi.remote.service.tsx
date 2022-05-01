
export const SwapiRemoteService = {
    getCards: (option: string, page: string | null): Promise<any> => {
      return fetch(`https://swapi.dev/api/${option}${page !== null? `?page=${page}` : ""}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    },

    getUserInfo: (url: string): Promise<any> => {
      return fetch(url, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }