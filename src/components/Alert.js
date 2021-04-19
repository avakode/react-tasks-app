import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../redux/actions';

export const Alert = () => {
  const alertState = useSelector(store => store.alert)
  const dispatch = useDispatch();

  return (
    <div
      className={`alert-container ${!alertState.visible && 'is-hidden'}`}
    >
      <div className={`alert alert-${alertState.type || 'warning'} alert-dismissible`}>
        <strong>{alertState.text}</strong>
        <button onClick={() => dispatch(hideAlert())} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}