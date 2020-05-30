import { Store } from './store'

const $ = sessionStorage as Storage & Store<string>
const spliter = ';'

type session = {
  getHash(): string
  getName(): string
  getRooms(): string[]
  getToken(): string
  getState(token?: string): Store

  setHash(hash: string): string
  setName(name: string): string
  setRooms(rooms: string[]): string
  setToken(token: string): string
  setState(state: Store): Store
}

const session: session = {
  getHash: () => $.hash || '',
  getName: () => $.name || '',
  getRooms: () => $.rooms ? $.rooms.split(spliter) : [],
  getToken: () => $.token || '',
  getState: token => {
    if (token) session.setToken(token)
    return {
      rooms: session.getRooms(),
      hash: session.getHash(),
      name: session.getName(),
      token: session.getToken(),
    }
  },
  setHash: hash => $.hash = hash,
  setName: name => $.name = name,
  setRooms: rooms => $.rooms = rooms.join(spliter),
  setToken: token => $.token = token,
  setState: (state: Store) => {
    session.setHash(state.hash)
    session.setName(state.name)
    session.setRooms(state.rooms)
    session.setToken(state.token)
    return state
  },
}
export default session
