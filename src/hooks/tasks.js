import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEqual from 'lodash.isequal';
import { fetchTasksRequest, fetchTasksSuccess } from "../redux/actions";
import { API_URL, developer } from "../constants";

export const useTasks = () => {
  const filters = useSelector(store => store.filters);
  const filtersRef = useRef(filters);
  const tasks = useSelector(store => store.tasks);
  const dispatch = useDispatch();

  if (!isEqual(filtersRef.current, filters)) filtersRef.current = (filters)

  const { current: cachedFilters } = filtersRef

  useEffect(() => {
    dispatch(fetchTasksRequest())

    const page = cachedFilters && cachedFilters.page ? `&page=${cachedFilters.page}` : '&page=1';
    const sortField = cachedFilters && cachedFilters.field ? `&sort_field=${cachedFilters.field}` : '&sort_field=id';
    const sortDirection = cachedFilters && cachedFilters.direction ? `&sort_direction=${cachedFilters.direction}` : '&sort_direction=desc';
    const requestUrl = `${API_URL}/?${developer}${page}${sortField}${sortDirection}`;

    axios.get(requestUrl).then(res => dispatch(fetchTasksSuccess(res)));
  }, [cachedFilters, dispatch, tasks.taskAdded, tasks.taskEdited])

  return tasks
}