import axios from 'axios'
import md5 from 'js-md5'
import session from './session'
import { STORE__CLEAR, STORE__SAVE, ROOMS__JOIN } from './actions'
import { User } from './firebase'
import { createStore } from 'redux'

export type Actions
  = "__SPAWN_STORE"
  | "STORE__CLEAR"
  | "STORE__SAVE"
  | "ROOMS__JOIN"
  | "SKIP"

export type Store<T extends string | string[] = string[]> = User<T> & {
  token: string
}

export type Action = {
  /** the action to perform */
  type: Actions

  /** the new user state */
  user?: User

  /** the new app state */
  state?: Store

  /** the session token */
  token?: string

  /** the method from which the action was skipped */
  from?: string

  /** the name of the Room */
  name?: string
}

const initialState: Store = {
  displayName: '',
  hash: '',
  photoUrl: '',
  rooms: [],
  token: ''
}

const store = createStore((prevState: Store = initialState, action: Action): Store => {
  const token = action.token ?? prevState.token
  switch (action.type) {
    case STORE__CLEAR:
      return session.setState({ ...initialState, token })

    case STORE__SAVE:
      if (action.state) {
        return session.setState(action.state)
      }
      if (action.user) {
        return session.setState({ ...prevState, ...action.user, token })
      }
      action.from = 'store.save'
      break

    case ROOMS__JOIN:
      if (!action.name) {
        console.warn('Room name is required.')
        action.from = 'room.create'
        break
      }
      return session.setState({
        ...prevState,
        rooms: [...prevState.rooms, action.name]
      })

    default: break
  }
  console.warn('SKIP', action.from)
  return prevState
})
export default store

export const initStore = async (): Promise<Action> => (
  await axios
    .get<string>('https://api.ipify.org/', {responseType: 'text'})
    .then(r => md5(r.data))
    .then(token => {
      const savedState = session.getState()
      if (savedState.token && token !== savedState.token) {
        console.warn('The Token has expired.')
        return { type: STORE__CLEAR, token }
      } else {
        savedState.token = token
        return {
          type: STORE__SAVE,
          state: savedState
        }
      }
    })
)
