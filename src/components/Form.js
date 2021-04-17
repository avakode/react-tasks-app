import React, { useContext, useState } from 'react';
import { AlertContext } from '../context/alert/alertContext';
import { TasksContext } from '../context/tasks/tasksContext';
import { FiltersContext } from '../context/filters/filtersContext';

export const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    text: '',
  });
  const alert = useContext(AlertContext);
  const tasks = useContext(TasksContext);
  const filtersData = useContext(FiltersContext);
  const tasksFilters = {
    page: filtersData.filters.page,
    field: filtersData.filters.field,
    direction: filtersData.filters.direction,
  }

  const submitHandler = event => {
    event.preventDefault();

    if (formData.name.trim() && formData.email.trim() && formData.text.trim()) {
      tasks.addTask(formData.name.trim(), formData.email.trim(), formData.text.trim())
        .then(() => {
          alert.show('Task was added', 'success');

          tasks.fetchTasks(tasksFilters);

          setTimeout(() => {
            alert.hide();
          }, 3000);
        })
        .catch(() => {
          alert.show('Something went wrong', 'danger');

          setTimeout(() => {
            alert.hide();
          }, 3000);
        })

      setFormData({
        name: '',
        email: '',
        text: '',
      });
    } else if (!formData.name.trim()) {
      alert.show('Please enter your name');

      setTimeout(() => {
        alert.hide();
      }, 3000);
    } else if (!formData.email.trim()) {
      alert.show('Please enter your email');

      setTimeout(() => {
        alert.hide();
      }, 3000);
    } else {
      alert.show('Please enter task name');

      setTimeout(() => {
        alert.hide();
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