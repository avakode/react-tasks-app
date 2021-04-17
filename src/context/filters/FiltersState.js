import React, { useReducer } from 'react';
import { CHANGE_FILTERS } from '../types';
import { FiltersContext } from './filtersContext';
import { filtersReducer } from './filtersReducer';

export const FiltersState = ({ children }) => {
  const [state, dispatch] = useReducer(filtersReducer, {
    page: 1,
    field: 'id',
    direction: 'desc',
  });
  const change = (filters) => {
    dispatch({
      type: CHANGE_FILTERS,
      payload: filters,
    });
  }

  return (
    <FiltersContext.Provider value={{
      change,
      filters: state
    }}>
      {children}
    </FiltersContext.Provider>
  )
}