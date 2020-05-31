import md5 from 'js-md5'
import store, { Action, Store } from './store'
import { STORE__CLEAR, STORE__SAVE } from './actions'
import { auth, User, Users } from './firebase'
import { avatar } from './avatar'

export async function signUp(email: string, password: string): Promise<Action> {
  console.log('--signup--')
  const [hash, displayName] = [md5(email), email.split('@')[0]]
  const new_user: User = {
    displayName,
    hash,
    photoUrl: avatar(hash),
    rooms: []
  }
  try {
    const credentials = await auth.createUserWithEmailAndPassword(email, password)
    const uid = credentials.user?.uid || ''
    if (uid) {
      console.log(uid, new_user)
      try {
        await Users.doc(uid).set(new_user)
        console.log('Se ha creado el usuario')
        return { type: STORE__SAVE, state: parse(new_user) }
      }
      catch (err) {
        throw new Error('No se ha creado el usuario\n' + err.message)
      }
    }
    else throw new Error('UID failure')
  }
  catch (e) {
    console.error('ERROR:' + e.message)
    return { type: STORE__CLEAR }
  }
}

export async function signIn(email: string, password: string): Promise<Action> {
  console.log('--signin--')
  try {
    const credentials = await auth.signInWithEmailAndPassword(email, password)
    if (!credentials.user) throw new Error("Can't read user credentials.")
    const uid = credentials.user.uid
    const snapshot = await Users.doc(uid).get()
    if (!snapshot.exists) throw new Error("The user's document doesn't exist. Please report!")
    const user = snapshot.data()
    if (user) return { type: STORE__SAVE, state: parse(user) }
    else throw new Error("Got no data.")
  }
  catch (e) {
    console.error('ERROR:' + e.message)
    return { type: STORE__CLEAR }
  }
}

function parse(user: User): Store {
  const state: Store = store.getState()
  if (user.hash) state.hash = user.hash
  if (user.displayName) state.displayName = user.displayName
  if (user.rooms) state.rooms = user.rooms
  return state
}
