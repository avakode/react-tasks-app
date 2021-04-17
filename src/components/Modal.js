import React, { useState, useContext } from 'react';
import { ModalContext } from '../context/modal/modalContext';
import { LoginContext } from '../context/login/loginContext';
import { TasksContext } from '../context/tasks/tasksContext';
import { FiltersContext } from '../context/filters/filtersContext';
import { CloseIcon } from './icons/CloseIcon';

export const Modal = () => {
  const { modal, hide } = useContext(ModalContext);
  const [data, setData] = useState({
    text: '',
  });
  const login = useContext(LoginContext);
  const tasks = useContext(TasksContext);
  const token = login.token;
  const [filled, setFilled] = useState(true);
  const filtersData = useContext(FiltersContext);
  const tasksFilters = {
    page: filtersData.filters.page,
    field: filtersData.filters.field,
    direction: filtersData.filters.direction,
  }

  const handleClose = event => {
    event.preventDefault();
    hide();

    setData({
      text: ''
    })
  }

  const inputHandleChange = e => {
    e.target.value.length > 0 ? setFilled(true) : setFilled(false);
    setData({ ...data, text: e.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault();

    if (data.text.trim()) {
      tasks.editTask({
        id: modal.id,
        text: data.text,
        status: modal.status === 0 ? 1 : 11,
        token,
      })
        .then(res => {
          hide();
          tasks.fetchTasks(tasksFilters);
        });

      setData({
        text: '',
      });
    } else {
      setFilled(false);
    }
  }

  return (
    <div className={`popup ${!modal.visible && 'is-hidden'}`}>
      <div onClick={handleClose} className="popup__overlay"></div>
      <div className="popup__content">
        <button onClick={handleClose} className="btn popup__close">
          <CloseIcon />
        </button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text"
              name="note"
              className={`form-control ${!filled && 'is-invalid'}`}
              placeholder="Task"
              value={data.text}
              onChange={e => inputHandleChange(e)} />
            <div id="validationServer03Feedback" className="invalid-feedback">
              Please enter task name
            </div>
          </div>
          <button type="submit" className="btn btn btn-outline-success">Send</button>
        </form>
      </div>
    </div>
  )
}