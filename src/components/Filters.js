import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filtersChange } from '../redux/actions';

export const Filters = () => {
  const filters = useSelector(store => store.filters);
  const [tasksFilters, setTasksFilters] = useState(filters);
  const dispatch = useDispatch();

  const radioChange = event => {
    const value = event.target.value === 'asc' || event.target.value === 'desc' ? {
      direction: event.target.value,
    } : {
      field: event.target.value,
    }
    setTasksFilters({ ...tasksFilters, ...value });
    dispatch(filtersChange({ ...tasksFilters, ...value }));
  }

  return (
    <>
      <h3>Filters</h3>
      <div className="filters py-3 d-flex">
        <div className="filter-item mr-5">
          <h5>Field:</h5>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="id" type="radio"
                checked={tasksFilters.field === 'id'} onChange={radioChange} />
              <span>ID</span>
            </label>
          </div>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="username" type="radio"
                checked={tasksFilters.field === 'username'} onChange={radioChange} />
              <span>Username</span>
            </label>
          </div>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="email" type="radio"
                checked={tasksFilters.field === 'email'} onChange={radioChange} />
              <span>Email</span>
            </label>
          </div>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="status" type="radio"
                checked={tasksFilters.field === 'status'} onChange={radioChange} />
              <span>Status</span>
            </label>
          </div>
        </div>
        <div className="filter-item mr-5">
          <h5>Direction:</h5>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="asc" type="radio"
                checked={tasksFilters.direction === 'asc'} onChange={radioChange} />
              <span>ASC</span>
            </label>
          </div>
          <div className="form-check">
            <label>
              <input className="form-check-input" value="desc" type="radio"
                checked={tasksFilters.direction === 'desc'} onChange={radioChange} />
              <span>DESC</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}