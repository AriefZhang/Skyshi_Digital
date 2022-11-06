const ActivityGroupState = {
  activityList: [],
  activityDetailsById: {},
  todoItems: [],
  todoItemsById: {},
  showActivityModal: false,
  showTodoListModal: false,
  showEditTitleActivityModal: false,
  showEditTodoListModal: false,
  showDeleteActivityModal: false,
  showDeleteTodoListModal: false,
  showAlertModal: false
}

const ActivityGroupReducer = (state = ActivityGroupState, action) => {
  const { type, payload } = action
  switch (type) {
    case "activity/fetchActivityGroup":
      return {
        ...state,
        activityList: payload
      }

    case "activity/fetchActivityGroupById":
      return {
        ...state,
        activityDetailsById: payload
      }

    case "activity/fetchTodoItems":
      return {
        ...state,
        todoItems: payload
      }
    
    case "activity/fetchTodoItemsById":
      return {
        ...state,
        todoItemsById: payload
      }
    
    case "activity/showActivityModal":
      return {
        ...state,
        showActivityModal: payload
      }

    case "activity/showTodoListModal":
      return {
        ...state,
        showTodoListModal: payload
      }

    case "activity/showEditTitleActivityModal":
      return {
        ...state,
        showEditTitleActivityModal: payload
      }

    case "activity/showEditTodoListModal":
      return {
        ...state,
        showEditTodoListModal: payload
      }

    case "activity/showDeleteActivityModal":
      return {
        ...state,
        showDeleteActivityModal: payload
      }

    case "activity/showDeleteTodoListModal":
      return {
        ...state,
        showDeleteTodoListModal: payload
      }

    case "activity/showAlertModal":
      return {
        ...state,
        showAlertModal: payload
      }
    
    default:
      return state
  }
}

export default ActivityGroupReducer