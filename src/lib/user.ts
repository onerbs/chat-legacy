import md5 from 'js-md5'
import store, { Action, Store } from './store'
import { SKIP, STORE__CLEAR, STORE__SAVE } from './actions'
import { auth, Users, User } from './firebase'

export async function signUp(email: string, password: string): Promise<Action> {
  const [hash, name] = [md5(email), email.split('@')[0]]
  return auth.createUserWithEmailAndPassword(email, password)
    .then(() => Users.doc(hash).set({ hash, name, rooms: [] }))
    .then(() => ({ type: SKIP, from: 'user.singup' }))
}

export async function signIn(email: string, password: string): Promise<Action> {
  return auth.signInWithEmailAndPassword(email, password)
    .then(credentials => {
      if (credentials.user) return credentials.user.uid
      else throw new Error("Can't read user credentials.")
    })
    .then(uid => Users.doc(uid).get())
    .then(snapshot => {
      if (snapshot.exists) return snapshot.data()
      else throw new Error("The user's document doesn't exist. Please report!")
    })
    .then(user => {
      if (user) return { type: STORE__SAVE, state: parse(user) }
      else throw new Error("Got no data.")
    })
    .catch(e => {
      console.error(e.message)
      return { type: STORE__CLEAR }
    })
}

function parse(user: User): Store {
  const current: Store = store.getState()
  if (user.hash) current.hash = user.hash
  if (user.name) current.name = user.name
  if (user.rooms) current.rooms = user.rooms
  return current
}
