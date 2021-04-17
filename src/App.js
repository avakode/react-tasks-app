import { Navbar } from './components/Navbar';
import { AlertState } from './context/alert/AlertState';
import { TasksState } from './context/tasks/TasksState';
import { Main } from './components/Main';
import { Alert } from './components/Alert';
import { Modal } from './components/Modal';
import { ModalState } from './context/modal/ModalState';
import { LoginState } from './context/login/LoginState';
import { FiltersState } from './context/filters/FiltersState';

function App() {
  return (
    <FiltersState>
      <LoginState>
        <TasksState>
          <AlertState>
            <ModalState>
              <Modal />
              <Navbar />
              <div className="container pt-4">
                <Alert />
                <Main />
              </div>
            </ModalState>
          </AlertState>
        </TasksState>
      </LoginState>
    </FiltersState>
  );
}

export default App;
