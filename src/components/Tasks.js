import React, { useContext, useState } from 'react';
import { pageSize } from '../constants';
import { FiltersContext } from '../context/filters/filtersContext';
import { LoginContext } from '../context/login/loginContext';
import { ModalContext } from '../context/modal/modalContext';
import { TasksContext } from '../context/tasks/tasksContext';
import { changeStatus, decodeEntities, getStatusLabel, getCookieValue } from '../helpers';
import { CompleteIcon } from './icons/CompleteIcon';
import { EditIcon } from './icons/EditIcon';
import { IncompleteIcon } from './icons/IncompleteIcon';

export const Tasks = () => {
  const modal = useContext(ModalContext);
  const login = useContext(LoginContext);
  const token = login.token;
  const tasksRequest = useContext(TasksContext);
  const filtersData = useContext(FiltersContext);
  const [tasksFilters, setTasksFilters] = useState({
    page: filtersData.filters.page,
    field: filtersData.filters.field,
    direction: filtersData.filters.direction,
  });
  const count = tasksRequest.count % pageSize === 0 ? tasksRequest.count - 1 : tasksRequest.count;
  const paginationItems = [];

  const handleEdit = (e, item) => {
    e.preventDefault();

    const logined = getCookieValue('logined') === 'true' ? true : false;

    if (logined) {
      modal.show(item);
    } else {
      document.cookie = 'logined=false;';
      document.cookie = 'token=0';
      window.location.reload();
    }
  }

  const handleComplete = (e, item) => {
    e.preventDefault();

    const logined = getCookieValue('logined') === 'true' ? true : false;

    if (logined) {
      tasksRequest.editTask({
        id: item.id,
        status: changeStatus(item.status),
        token,
      })
      .then(() => {
        tasksRequest.fetchTasks(tasksFilters);
      });
    } else {
      document.cookie = 'logined=false;';
      document.cookie = 'token=0';
      window.location.reload();
    }
  }

  const handlePaginationClick = (event, pageNum) => {
    event.preventDefault();

    const nextPage = pageNum ? pageNum : Number(event.target.innerText)

    setTasksFilters({ ...tasksFilters, page: nextPage });
    filtersData.change({ ...tasksFilters, page: nextPage });
    tasksRequest.fetchTasks({ ...tasksFilters, page: nextPage });
  }

  for (let i = 0; i <= Math.trunc(count / pageSize); i++) {
    paginationItems.push(
      <li key={`pag_${i}`} className={`page-item ${tasksFilters.page === i + 1 && 'active'}`}>
        <a className="page-link" href="#" onClick={handlePaginationClick}>{i + 1}</a>
      </li>
    );
  }

  return (
    <>
      <ul className="list-group mb-5">
        {tasksRequest.tasks.map(taskItem => (
          <li className="list-group-item note" key={taskItem.id}>
            <div className="note__info">
              <div className="note__topside">
                <div>Name: {taskItem.username}</div>
                <div>Email: {taskItem.email}</div>
                <div>Status: {getStatusLabel(taskItem.status)}</div>
              </div>
              <div>{decodeEntities(taskItem.text) }</div>
            </div>
            {login.status && <div className="note__buttons">
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
      <div className="d-flex justify-content-center mb-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {tasksFilters.page > 1 &&
              <li className="page-item">
              <a onClick={event => handlePaginationClick(event, tasksFilters.page - 1)} className="page-link" href="#">Previous</a>
              </li>
            }
            {paginationItems.map(item => item)}
            {tasksFilters.page < paginationItems.length &&
              <li className="page-item">
              <a onClick={event => handlePaginationClick(event, tasksFilters.page + 1)} className="page-link" href="#">Next</a>
              </li>
            }
          </ul>
        </nav>
      </div>
    </>
  );
}