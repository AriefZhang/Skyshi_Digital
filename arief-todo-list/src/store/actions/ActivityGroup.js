import todo from '../../api/todo'

export const setActivityGroup = (payload) => {
  return {
    type: 'activity/fetchActivityGroup',
    payload
  }
}

export const setActivityDetailsById = (payload) => {
  return {
    type: 'activity/fetchActivityGroupById',
    payload
  }
}

export const setTodoItems = (payload) => {
  return {
    type: 'activity/fetchTodoItems',
    payload
  }
}

export const setTodoItemsById = (payload) => {
  return {
    type: 'activity/fetchTodoItemsById',
    payload
  }
}

// ! Show Modal
export const setShowActivityModal = (payload) => {
  return {
    type: 'activity/showActivityModal',
    payload
  }
}

export const setShowEditTitleActivityModal = (payload) => {
  return {
    type: 'activity/showEditTitleActivityModal',
    payload
  }
}

export const setShowTodoListModal = (payload) => {
  return {
    type: 'activity/showTodoListModal',
    payload
  }
}

export const setShowEditTodoListModal = (payload) => {
  return {
    type: 'activity/showEditTodoListModal',
    payload
  }
}

export const setShowDeleteActivityModal = (payload) => {
  return {
    type: 'activity/showDeleteActivityModal',
    payload
  }
}

export const setShowDeleteTodoListModal = (payload) => {
  return {
    type: 'activity/showDeleteTodoListModal',
    payload
  }
}

export const setShowAlertModal = (payload) => {
  return {
    type: 'activity/showAlertModal',
    payload
  }
}

// ! Activity Group
export const asyncGetActivityGroup = () => {
  return (dispatch) => {
    todo.get('/activity-groups?email=arief%2B1706%40reacttodolist.co.sg')
      .then(({data}) => dispatch(setActivityGroup(data.data.reverse())))
      .catch(err => console.error(err))
  }
}

export const getActivityDetailsById = (payload) => {
  return (dispatch) => {
    todo.get(`/activity-groups/${payload}`)
      .then(({ data }) => {
        dispatch(setActivityDetailsById(data))
        dispatch(setTodoItems(data.todo_items))
      })
      .catch(err => console.error(err))
  }
}

export const createActivityGroup = (payload) => {
  payload.email = "arief+1706@reacttodolist.co.sg"
  return (dispatch) => {
    todo.post('/activity-groups', payload)
      .then(() => dispatch(asyncGetActivityGroup()))
      .catch(err => console.error(err))
  }
}

export const editActivityGroup = (payload) => {
  return (dispatch) => {
    todo.patch(`/activity-groups/${payload.id}`, payload.data)
      .then(() => {
        dispatch(asyncGetActivityGroup())
        dispatch(getActivityDetailsById(payload.id))
      })
      .catch(err => console.error(err))
  }
}

export const deleteActivityGroup = (payload) => {
  return (dispatch) => {
    todo.delete(`/activity-groups/${payload}`)
      .then(() => dispatch(asyncGetActivityGroup()))
      .catch(err => console.error(err))
  }
}

// ! Todo List

export const createTodoList = (payload) => {
  return (dispatch) => {
    todo.post('/todo-items', payload)
      .then(() => dispatch(getActivityDetailsById(payload.activity_group_id)))
      .catch(err => console.error(err))
  }
}

export const editTodoList = (payload) => {
  return (dispatch) => {
    todo.patch(`/todo-items/${payload.id}`, payload.data)
      .then(() => dispatch(getActivityDetailsById(payload.activityId)))
      .catch(err => console.error(err))
  }
}

export const deleteTodoList = (payload) => {
  return (dispatch) => {
    todo.delete(`/todo-items/${payload.id}`)
      .then(() => dispatch(getActivityDetailsById(payload.activityId)))
      .catch(err => console.error(err))
  }
}