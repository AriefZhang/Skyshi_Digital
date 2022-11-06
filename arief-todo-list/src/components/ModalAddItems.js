import '../assets/css/Modal.css'
import '../assets/css/SelectDropdown.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setShowActivityModal,
  setShowEditTitleActivityModal,
  setShowTodoListModal,
  setShowEditTodoListModal
} from '../store/actions/ActivityGroup'

import CloseModalIcon from '../assets/icon/modal-add-close-button.svg'
import AddButton from '../components/AddButton'

export default function Modal({ action, title }) {
  const dispatch = useDispatch()
  const { activityDetailsById, todoItemsById } = useSelector(state => state.activityGroupReducer)

  const [ focus, setFocus ] = useState(false)
  const [ userInput, setUserInput ] = useState({
    title: ''
  })

  const isEdit = title.includes('Edit')
  const isActivity = title.includes('Activity')
  const isTodoList = title.includes('Todo')
  const placeholder = (
    isEdit && isTodoList ?
      'Ubah nama todo list'
      : isEdit && isActivity ?
        'Ubah nama activity'
        : isActivity ?
          'Tambahkan nama activity'
          : 'Tambahkan nama list item'
  )

  const focusOnInput = (payload) => {
    setFocus(payload)
  }

  const focusOnUserInput = (event) => {
    const { name, value } = event.target
    setUserInput({
      ...userInput,
      [name]: value
    })
  }

  useEffect(() => {
    if (isEdit && isActivity) {
      setUserInput({
        title: activityDetailsById.title
      })
    } else if (isEdit && isTodoList) {
      setUserInput({
        title: todoItemsById.title
      })
    }
  }, [isEdit, isActivity, isTodoList, activityDetailsById, todoItemsById])

  const closeModal = () => {
    dispatch(setShowActivityModal(false))
    dispatch(setShowEditTitleActivityModal(false))
    dispatch(setShowTodoListModal(false))
    dispatch(setShowEditTodoListModal(false))
  }

  const click = () => {
    action(userInput)
    closeModal()
  }

  const keyPress = (event) => {
    if (event.code === 'Enter') {
      click()
    }
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal-layout-outer'>
        <div className='modal-layout-inner modal-full-page' onClick={ closeModal }></div>
        <div className='modal-full-page'>
          <div className='modal modal-body'>
            <div className='modal-header'>
              <h5 className='fw-600'>{ title }</h5>
              <img src={ CloseModalIcon } alt="" onClick={ closeModal }/>
            </div>

            <div className='modal-content modal-content-padding'>
              <h5 className='fw-600'>NAMA { isActivity ? 'ACTIVITY' : 'LIST ITEM' }</h5>
              <div className='modal-content-input'>
                <input className='input-add-items w-100' type='text' onFocus={() => focusOnInput(true)} onBlur={() => focusOnInput(false)} name="title" value={userInput.title} onChange={focusOnUserInput} onKeyDown={keyPress} data-cy='modal-add-name-input'/>
                { focus || userInput?.title?.length ? <></> : <p>{ placeholder }</p>}
              </div>
              
              {
                isTodoList ? (
                  <>
                    <h5 className='modal-content-priority fw-600'>PRIORITY</h5>
                    <div className='modal-content-input'>
                      <select name="priority" onChange={focusOnUserInput} data-cy='modal-add-priority-dropdown'>
                        <option value="very-high" defaultValue>Very High</option>
                        <option value="high">High</option>
                        <option value="normal">Normal</option>
                        <option value="low">Low</option>
                        <option value="very-low">Very Low</option>
                      </select>
                    </div>
                    <div>
                      <div>

                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </div>
            
            <div className='modal-footer' data-cy='modal-add-save-button' onClick={click}>
              <AddButton action={click} disabled={!userInput?.title?.length} data-cy='modal-add-save-button'/>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}