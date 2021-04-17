import React, { useContext } from 'react';
import { AlertContext } from '../context/alert/alertContext';

export const Alert = () => {
  const { alert, hide } = useContext(AlertContext)

  return (
    <div
      className={`alert-container ${!alert.visible && 'is-hidden'}`}
    >
      <div className={`alert alert-${alert.type || 'warning'} alert-dismissible`}>
        <strong>{alert.text}</strong>
        <button onClick={hide} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  )
}