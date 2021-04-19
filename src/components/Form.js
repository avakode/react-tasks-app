import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { API_URL, developer } from '../constants';
import { showAlert, hideAlert, taskAdded } from '../redux/actions';

export const Form = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
  });

  const submitHandler = event => {
    event.preventDefault();

    if (formData.name.trim() && formData.email.trim() && formData.text.trim()) {
      const form = new FormData();

      form.append('username', formData.name.trim());
      form.append('email', formData.email.trim());
      form.append('text', formData.text.trim());

      axios({
        method: "post",
        url: `${API_URL}/create?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; charset=utf-8'
        },
      }).then(res => {
        dispatch(showAlert('Task was added', 'success'))
        dispatch(taskAdded());
      });

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);

      setFormData({
        name: '',
        email: '',
        text: '',
      });
    } else if (!formData.name.trim()) {
      dispatch(showAlert('Please enter your name'))

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);
    } else if (!formData.email.trim()) {
      dispatch(showAlert('Please enter your email'))

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);
    } else {
      dispatch(showAlert('Please enter task name'))

      setTimeout(() => {
        dispatch(hideAlert())
      }, 3000);
    }
  }
  return (
    <form onSubmit={submitHandler}>
      <h2 className="pb-2">Add Task</h2>
      <div className="form-group">
        <input type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={formData.name}
          onChange={e => setFormData({ ...formData, name: e.target.value })} />
      </div>
      <div className="form-group">
        <input type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })} />
      </div>
      <div className="form-group">
        <input type="text"
          name="text"
          className="form-control"
          placeholder="Task"
          value={formData.text}
          onChange={e => setFormData({ ...formData, text: e.target.value })} />
      </div>
      <button type="submit" className="btn btn btn-outline-success">Send</button>
    </form>
  );
}