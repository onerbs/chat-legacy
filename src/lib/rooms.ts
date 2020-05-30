import session from "./session"
import { Action } from "./store"
import { ROOMS__JOIN, STORE__SAVE, SKIP } from "./actions"
import { arrayUnion, auth, CloudMessage, Data, History, Message, QSS, Room, Users } from "./firebase"

export const join = async (name: string): Promise<Action> => {
  const { currentUser } = auth
  if (!currentUser || session.getRooms().includes(name)) {
    return { type: SKIP, from: 'already joined' }
  } else {
    const room = Room(name)
    return room.get().then(doc => {
      if (!doc.exists) room.set({$: 0})
      Users.doc(currentUser.uid).update({
        rooms: arrayUnion(name)
      })
      return { type: ROOMS__JOIN, name }
    })
  }
}

export const push = async (message: Message, addressee: string): Promise<Action> => {
  const m: CloudMessage = {...message, date: message.date.getTime()}
  return await History(addressee).doc(`${m.date}`).set(m).then(() =>
    Room(addressee).set({$: m.date}).then(() => ({ type: STORE__SAVE }))
  )
}

export const subscribe = (name: string, update: (hist: Message[]) => void): void => {
  Room(name).onSnapshot(() => { getHistory(name).then(update) })
}

const getHistory = async (name: string): Promise<Message[]> => {
  return await History(name).get().then(qs => clean(qs.docs))
}


function clean(docs: QSS): Message[] {
  let clean: Message[] = []
  for (const doc of docs) {
    const data = doc.data()
    clean.push(extract(data))
  }
  return clean
  // return clean.sort((a, b) => a.date.getTime() - b.date.getTime())
}

function extract(data: Data<CloudMessage>): Message {
  return ({
    date: new Date(data.date),
    from: data.from,
    message: data.message
  })
}
