import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../context/tasks/tasksContext';
import { FiltersContext } from '../context/filters/filtersContext';
import { Loader } from './Loader';
import { Form } from './Form';
import { Tasks } from './Tasks';
import { Filters } from './Filters';

export const Main = () => {
  const { loading, fetchTasks } = useContext(TasksContext);
  const filtersData = useContext(FiltersContext);
  const tasksFilters = {
    page: filtersData.filters.page,
    field: filtersData.filters.field,
    direction: filtersData.filters.direction,
  }

  useEffect(() => {
    fetchTasks(tasksFilters);
  }, []);

  return (
    <>
      <Form />
      <hr />
      <h2 className="pt-3 pb-4">Current tasks</h2>
      <Filters />
      {loading ? <Loader /> :
        <Tasks />
      }
    </>
  );
}