import './App.css'
import AppRouter from './Config/AppRouter'
import store from './Config/Redux/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </>
  )
}

export default App
