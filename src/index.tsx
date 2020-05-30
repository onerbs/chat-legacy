import App from './App'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import store from './lib/store'
import theme from './lib/theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'theme-ui'

ReactDOM.render (
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <App/>
        </Router>
      </Provider>
    </ThemeProvider>
  </StrictMode>
  ,
  document.getElementById('root')
)
