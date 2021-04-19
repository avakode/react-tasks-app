import { Navbar } from './components/Navbar';
import { Main } from './components/Main';
import { Alert } from './components/Alert';
import { Modal } from './components/Modal';
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Modal />
      <Navbar />
      <div className="container pt-4">
        <Alert />
        <Main />
      </div>
    </Provider>
  );
}

export default App;
