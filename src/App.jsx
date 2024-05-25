import { Provider } from 'react-redux';
import Chat from './Components/Chat';
import './global.scss';
import { store } from './redux/store';

function App() {

  return (
    <Provider store={store}>
      <Chat />
    </Provider>
  )
}

export default App
