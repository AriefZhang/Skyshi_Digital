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
import ItemCheckIcon from '../assets/icon/item-check-icon.svg'
import ChevronDownIcon from '../assets/icon/tabler_chevron-down.svg'
import ChevronUpIcon from '../assets/icon/tabler_chevron-up.svg'
import AddButton from '../components/AddButton'

export default function Modal({ action, title }) {
  const dispatch = useDispatch()
  const { activityDetailsById, todoItemsById } = useSelector(state => state.activityGroupReducer)

  const [ focus, setFocus ] = useState(false)
  const [ showDropdown, setShowDropdown ] = useState(false)
  const [ userInput, setUserInput ] = useState({
    title: '',
    priority: 'very-high'
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

  const changeShowDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const setPriority = (prio) => {
    setUserInput({
      ...userInput,
      priority: prio
    })
    changeShowDropdown()
  }

  useEffect(() => {
    if (isEdit && isActivity) {
      setUserInput({
        title: activityDetailsById.title
      })
    } else if (isEdit && isTodoList) {
      setUserInput({
        title: todoItemsById.title,
        priority: todoItemsById.priority
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

                    <div className='select-dropdown__container'>
                      <div className='select-dropdown__wrapper'>
                        {
                          !showDropdown ? (
                            <div className='select-dropdown__items' onClick={changeShowDropdown}>
                              <div className='center'>
                                <div className={`select-dropdown__circle ${ userInput.priority === 'very-low' ? 'todo-list__circle-very-low' : userInput.priority === 'low' ? 'todo-list__circle-low' : userInput.priority === 'normal' ? 'todo-list__circle-normal' : userInput.priority === 'high' ? 'todo-list__circle-high' : 'todo-list__circle-very-high'}`}></div>
                                <h5>{
                                  userInput.priority === 'very-low' ? 'Very Low' : userInput.priority === 'low' ? 'Low' : userInput.priority === 'normal' ? 'Normal' : userInput.priority === 'high' ? 'High' : 'Very High'
                                }</h5>
                              </div>
                              <img src={ChevronDownIcon} alt=""/>
                            </div>
                          ) : (
                            <>
                              <div className='select-dropdown__items background-select__title'>
                                <h5>Pilih Priority</h5>
                                <img src={ChevronUpIcon} alt="" onClick={changeShowDropdown}/>
                              </div>

                              <div className='select-dropdown__items' onClick={() => setPriority('very-high')}>
                                <div className='center'>
                                  <div className='select-dropdown__circle todo-list__circle-very-high'></div>
                                  <h5>Very High</h5>
                                </div>
                                {
                                  userInput.priority === 'very-high' ? <img src={ItemCheckIcon} alt=""/> : <></>
                                }
                              </div>

                              <div className='select-dropdown__items' onClick={() => setPriority('high')}>
                                <div className='center'>
                                  <div className='select-dropdown__circle todo-list__circle-high'></div>
                                  <h5>High</h5>
                                </div>
                                {
                                  userInput.priority === 'high' ? <img src={ItemCheckIcon} alt=""/> : <></>
                                }
                              </div>

                              <div className='select-dropdown__items' onClick={() => setPriority('normal')}>
                                <div className='center'>
                                  <div className='select-dropdown__circle todo-list__circle-normal'></div>
                                  <h5>Normal</h5>
                                </div>
                                {
                                  userInput.priority === 'normal' ? <img src={ItemCheckIcon} alt=""/> : <></>
                                }
                              </div>

                              <div className='select-dropdown__items' onClick={() => setPriority('low')}>
                                <div className='center'>
                                  <div className='select-dropdown__circle todo-list__circle-low'></div>
                                  <h5>Low</h5>
                                </div>
                                {
                                  userInput.priority === 'low' ? <img src={ItemCheckIcon} alt=""/> : <></>
                                }
                              </div>

                              <div className='select-dropdown__items border-bottom-none ' onClick={() => setPriority('very-low')}>
                                <div className='center'>
                                  <div className='select-dropdown__circle todo-list__circle-very-low'></div>
                                  <h5>Very Low</h5>
                                </div>
                                {
                                  userInput.priority === 'very-low' ? <img src={ItemCheckIcon} alt=""/> : <></>
                                }
                              </div>
                            </>
                          )
                        }
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