import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL, developer, pageSize } from '../constants';
import { changeStatus, decodeEntities, getStatusLabel, getCookieValue } from '../helpers';
import { CompleteIcon } from './icons/CompleteIcon';
import { EditIcon } from './icons/EditIcon';
import { IncompleteIcon } from './icons/IncompleteIcon';
import { showModal, taskEdited, filtersChange } from '../redux/actions';
import axios from 'axios';

export const Tasks = () => {
  const tasksState = useSelector(store => store.tasks);
  const loginState = useSelector(store => store.login);
  const filters = useSelector(store => store.filters);
  const [tasksFilters, setTasksFilters] = useState(filters);
  const count = tasksState.count % pageSize === 0 ? tasksState.count - 1 : tasksState.count;
  const paginationItems = [];
  const dispatch = useDispatch();

  const handleEdit = (e, item) => {
    e.preventDefault();

    const logined = getCookieValue('logined');

    if (logined) {
      dispatch(showModal(item));
    } else {
      document.cookie = 'logined=;';
      document.cookie = 'token=';
      window.location.reload();
    }
  }

  const handleComplete = (e, item) => {
    e.preventDefault();

    const logined = getCookieValue('logined');

    if (logined) {
      const form = new FormData();

      form.append('status', changeStatus(item.status));
      form.append('token', loginState.token);

      axios({
        method: "post",
        url: `${API_URL}/edit/${item.id}?${developer}`,
        data: form,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data'
        },
      }).then(res => {
        dispatch(taskEdited());
      });
    } else {
      document.cookie = 'logined=;';
      document.cookie = 'token=';
      window.location.reload();
    }
  }

  const handlePaginationClick = (event, pageNum) => {
    event.preventDefault();

    const nextPage = pageNum ? pageNum : Number(event.target.innerText)

    setTasksFilters({ ...tasksFilters, page: nextPage });
    dispatch(filtersChange({ ...tasksFilters, page: nextPage }));
  }

  for (let i = 0; i <= Math.trunc(count / pageSize); i++) {
    paginationItems.push(
      <li key={`pag_${i}`} className={`page-item ${tasksFilters.page === i + 1 && 'active'}`}>
        <a className="page-link" href={`/page-${i + 1}`} onClick={handlePaginationClick}>{i + 1}</a>
      </li>
    );
  }

  return (
    <>
      <ul className="list-group mb-5">
        {tasksState.tasks.map(taskItem => (
          <li className="list-group-item note" key={taskItem.id}>
            <div className="note__info">
              <div className="note__topside">
                <div>Name: {taskItem.username}</div>
                <div>Email: {taskItem.email}</div>
                <div>Status: {getStatusLabel(taskItem.status)}</div>
              </div>
              <div>{decodeEntities(taskItem.text)}</div>
            </div>
            {loginState.status && <div className="note__buttons">
              <button type="button" onClick={e => handleEdit(e, taskItem)} className="btn btn-outline-secondary btn-sm">
                <EditIcon />
              </button>
              {taskItem.status < 10 ?
                <button type="button" onClick={e => handleComplete(e, taskItem)} className="btn btn-outline-success btn-sm">
                  <IncompleteIcon />
                </button> :
                <button type="button" onClick={e => handleComplete(e, taskItem)} className="btn btn-outline-warning btn-sm">
                  <CompleteIcon />
                </button>
              }
            </div>}
          </li>
        ))}
      </ul>
      { tasksState.count > 0 &&
        <div className="d-flex justify-content-center mb-5">
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              {tasksFilters.page > 1 &&
                <li className="page-item">
                  <a onClick={event => handlePaginationClick(event, tasksFilters.page - 1)} className="page-link" href="/prevPage">Previous</a>
                </li>
              }
              {paginationItems.map(item => item)}
              {tasksFilters.page < paginationItems.length &&
                <li className="page-item">
                  <a onClick={event => handlePaginationClick(event, tasksFilters.page + 1)} className="page-link" href="/nextPage">Next</a>
                </li>
              }
            </ul>
          </nav>
        </div>
      }
    </>
  );
}