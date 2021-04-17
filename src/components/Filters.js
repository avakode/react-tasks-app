import React, { useContext, useEffect, useState } from 'react';
import { FiltersContext } from '../context/filters/filtersContext';
import { TasksContext } from '../context/tasks/tasksContext';

export const Filters = () => {
  const filtersData = useContext(FiltersContext);
  const tasksRequest = useContext(TasksContext);
  const [tasksFilters, setTasksFilters] = useState({
    page: filtersData.filters.page,
    field: filtersData.filters.field,
    direction: filtersData.filters.direction,
  });

  useEffect(() => {
    filtersData.change(tasksFilters);
  }, [tasksFilters])

  const radioChange = event => {
    const value = event.target.value === 'asc' || event.target.value === 'desc' ? {
      direction: event.target.value,
    } : {
      field: event.target.value,
    }
    setTasksFilters({ ...tasksFilters, ...value });
    tasksRequest.fetchTasks({ ...tasksFilters, ...value });
  }

  return (
    <>
      <h3>Filters</h3>
      <div className="filters py-3 d-flex">
        <div className="filter-item mr-5">
          <h5>Field:</h5>
          <div className="form-check">
            <input className="form-check-input" value="id" type="radio"
              checked={tasksFilters.field === 'id'} onChange={radioChange} />
            <span>ID</span>
          </div>
          <div className="form-check">
            <input className="form-check-input" value="username" type="radio"
              checked={tasksFilters.field === 'username'} onChange={radioChange} />
            <span>Username</span>
          </div>
          <div className="form-check">
            <input className="form-check-input" value="email" type="radio"
              checked={tasksFilters.field === 'email'} onChange={radioChange} />
            <span>Email</span>
          </div>
          <div className="form-check">
            <input className="form-check-input" value="status" type="radio"
              checked={tasksFilters.field === 'status'} onChange={radioChange} />
            <span>Status</span>
          </div>
        </div>
        <div className="filter-item mr-5">
          <h5>Direction:</h5>
          <div className="form-check">
            <input className="form-check-input" value="asc" type="radio"
              checked={tasksFilters.direction === 'asc'} onChange={radioChange} />
            <span>ASC</span>
          </div>
          <div className="form-check">
            <input className="form-check-input" value="desc" type="radio"
              checked={tasksFilters.direction === 'desc'} onChange={radioChange} />
            <span>DESC</span>
          </div>
        </div>
      </div>
    </>
  )
}