import f from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import md5 from 'js-md5'

f.initializeApp({
  apiKey: "AIzaSyDcMFlMPQgJmgDQMUPCOBj7CfLFUSwGu7g",
  appId: "1:151018008361:web:4385dd97312e6b8a815138",
  authDomain: "chatapp-219eb.firebaseapp.com",
  databaseURL: "https://chatapp-219eb.firebaseio.com",
  messagingSenderId: "151018008361",
  projectId: "chatapp-219eb",
  storageBucket: "chatapp-219eb.appspot.com"
})

export const arrayUnion = f.firestore.FieldValue.arrayUnion
export const auth = f.auth()
const fs = f.firestore()

export type Data<T> = f.firestore.DocumentData & T
type Collection<T> = f.firestore.CollectionReference<Data<T>>
export type QSS = f.firestore.QueryDocumentSnapshot<Data<CloudMessage>>[]

const get = <T>(path: string) => fs.collection(path) as Collection<T>

/** Access with user's uid */
export const Users = get<User>('users')
export type User<T extends string | string[] = string[]> = {
  /** Los nombres de las salas a las que el usuario está suscrito */
  rooms: T
  /** El hash del usuario */
  hash: string
  /** El nombre del usuario */
  name: string
}

/** Access with hash */
const Rooms = get<{$: number}>('rooms')

/** Access with raw name */
export function Room(name: string) {
  return Rooms.doc(md5(name))
}
/** Access with raw name */
export function History(name: string) {
  return Room(name).collection('history') as Collection<CloudMessage>
}

type BaseMessage<D> = {
  /** La fecha del mensaje */
  date: D,
  /** El remitente del mensaje */
  from: string,
  /** El contenido del mensaje */
  message: string
}
export type CloudMessage = BaseMessage<number>
export type Message = BaseMessage<Date>
