import React, { lazy, Suspense, useEffect } from 'react'
import store, { initStore } from './lib/store'
import { Route, Switch, useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

const Door = lazy(() => import('./views/Door'))
const Chat = lazy(() => import('./views/Chat'))

export enum Routes {
  MAIN = '/chat',
  SIGN_IN = '/signin',
  SIGN_UP = '/signup',
}

function App({init}: {init(): Promise<string>}) {
  const history = useHistory()

  useEffect(() => {
    init().then(hash => {
      history.push(hash
        ? Routes.MAIN
        : Routes.SIGN_IN
      )
    })
  }, [])

  return (
    <Switch>
      <Route path={Routes.SIGN_IN}>
        <Suspense fallback={<span/>}>
          <Door
            btnText='Entrar'
            linKText='crea una cuenta'
            route={Routes.SIGN_UP}/>
        </Suspense>
      </Route>

      <Route path={Routes.SIGN_UP}>
        <Suspense fallback={<span/>}>
          <Door
            btnText='Crear cuenta'
            linKText='inicia sesión'
            route={Routes.SIGN_IN}/>
        </Suspense>
      </Route>

      <Route path={Routes.MAIN}>
        <Suspense fallback={<span/>}>
          <Chat/>
        </Suspense>
      </Route>

      <Route><Redirect to="/"/></Route>
    </Switch>
  )
}
export default connect (
  null,
  dispatch => ({
    init: () => initStore().then(dispatch).then(() => store.getState().hash)
  })
)(App)
