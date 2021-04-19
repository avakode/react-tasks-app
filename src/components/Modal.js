import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { hideModal, taskEdited } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, developer } from '../constants';
import axios from 'axios';

export const Modal = () => {
  const [data, setData] = useState({
    text: '',
  });
  const loginState = useSelector(store => store.login);
  const modalState = useSelector(store => store.modal);
  const [filled, setFilled] = useState(true);
  const dispatch = useDispatch();

  const handleClose = event => {
    event.preventDefault();
    dispatch(hideModal());

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
      const form = new FormData();

      form.append('status', modalState.status === 0 ? 1 : 11);

      if (data.text) {
        form.append('text', data.text);
      }

      form.append('token', loginState.token);

      axios({
        method: "post",
        url: `${API_URL}/edit/${modalState.id}?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => {
        dispatch(hideModal());
        dispatch(taskEdited());
      });

      setData({
        text: '',
      });
    } else {
      setFilled(false);
    }
  }

  return (
    <div className={`popup ${!modalState.visible && 'is-hidden'}`}>
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