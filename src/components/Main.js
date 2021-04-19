import React from 'react';
import { Loader } from './Loader';
import { Form } from './Form';
import { Tasks } from './Tasks';
import { Filters } from './Filters';
import { useSelector } from 'react-redux';
import { useTasks } from '../hooks/tasks';

export const Main = () => {
  const loading = useSelector(store => store.tasks.loading);

  useTasks();

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