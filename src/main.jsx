import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import store from './store/configStore'
import { Provider } from 'react-redux'

if (import.meta.hot) {
  import.meta.hot.on('locales-update', () => {
    i18n.reloadResources().then(() => {
      i18n.changeLanguage(i18n.language)
    })
  })
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
