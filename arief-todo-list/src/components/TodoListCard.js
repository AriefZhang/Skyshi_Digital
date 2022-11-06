import '../assets/css/TodoList.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  editTodoList,
  setShowDeleteTodoListModal,
  setTodoItemsById,
  setShowEditTodoListModal
} from '../store/actions/ActivityGroup'
import TodoTitleEditIcon from '../assets/icon/todo-title-edit-button.svg'
import trash from '../assets/icon/discard.svg'


export default function TodoListCard({ data, isChecked }) {
  const dispatch = useDispatch()

  const { activityDetailsById } = useSelector(state => state.activityGroupReducer)

  const [check, setCheck ] = useState({
    is_active: 0
  })

  useEffect(() => {
    if (isChecked) {
      setCheck({
        is_active: 1
      })
    }
  }, [isChecked])

  const onUserChecked = (event) => {
    const newValue = Number(event.target.checked)
    setCheck({
      is_active: newValue
    })
    updateTodoList()
  }

  const updateTodoList = () => {
    const options = {
      id: data.id,
      data: check,
      activityId: activityDetailsById.id
    }
    dispatch(editTodoList(options))
  }

  const removeTodoList = () => {
    dispatch(setTodoItemsById(data))
    dispatch(setShowDeleteTodoListModal(true))
  }

  const editTitleTodoList = () => {
    dispatch(setTodoItemsById(data))
    dispatch(setShowEditTodoListModal(true))
  }

  return (
    <div className='todo-list__container d-flex'>
      <div className='todo-list__content d-flex'>
        <label className='todo-list__checkbox-container'>
          <input className='todo-list__checkbox' type="checkbox" onChange={onUserChecked} checked={isChecked} data-cy='todo-item-checkbox'/>
          <span className="todo-list__checkmark"></span>
        </label>
        <div className={`todo-list__circle ${ data.priority === 'very-low' ? 'todo-list__circle-very-low' : data.priority === 'low' ? 'todo-list__circle-low' : data.priority === 'normal' ? 'todo-list__circle-normal' : data.priority === 'high' ? 'todo-list__circle-high' : 'todo-list__circle-very-high'}`}></div>
        <h5 className={`todo-list__title ${isChecked ? 'todo-list__title-finish-todo' : ''}`}>{data.title}</h5>
        <img className='todo-list__edit-button activity__cursor-pointer' src={TodoTitleEditIcon} alt="" onClick={editTitleTodoList}/>
      </div>
      <img className='todo-list__delete-button' src={trash} alt="" onClick={removeTodoList} data-cy='todo-item-delete-button'/>
    </div>
  )
}