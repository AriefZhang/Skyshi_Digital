import '../assets/css/Activity.css'
import React, { Suspense, useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import AddButton from '../components/AddButton'
import TodoBackIcon from '../assets/icon/todo-back-button.svg'
import TodoTitleEditIcon from '../assets/icon/todo-title-edit-button.svg'
import TodoSortIcon from '../assets/icon/sorting-icon.svg'
import ItemCheckIcon from '../assets/icon/item-check-icon.svg'
import TodoSortTerbaruIcon from '../assets/icon/sort-terbaru-icon.svg'
import TodoSortTerlamaIcon from '../assets/icon/sort-terlama-icon.svg'
import TodoSortAscIcon from '../assets/icon/sort-a-z-icon.svg'
import TodoSortDescIcon from '../assets/icon/sort-z-a-icon.svg'
import TodoSortUnfinishIcon from '../assets/icon/sort-unfinish-icon.svg'
import { getActivityDetailsById, setShowTodoListModal, setShowEditTitleActivityModal, setShowEditTodoListModal } from '../store/actions/ActivityGroup'

const ActivityEmptyState = React.lazy(() => import('../components/content/ActivityEmptyState'))
const TodoListCard = React.lazy(() => import('../components/TodoListCard'))

export default function Activity() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { activityDetailsById, todoItems } = useSelector(state => state.activityGroupReducer)
  const [ sort, setSort ] = useState('terbaru')
  const [ showSort, setShowSort ] = useState(false)

  useEffect(() => {
    dispatch(getActivityDetailsById(id))
  }, [id, dispatch])

  const changeSortBy = (payload) => {
    setSort(payload)
    setShowSort(false)
  }

  const showSortPopUp = () => {
    setShowSort(!showSort)
  }

  const AddTodoList = () => {
    dispatch(setShowTodoListModal(true))
  }

  const EditTitleActivityGroup = () => {
    dispatch(setShowEditTitleActivityModal(true))
  }

  const sortTodoItems = useMemo(() => sortingHelper(todoItems, sort), [todoItems, sort])

  return (
    <div className='activity__container'>
      <div className="header activity_title">
        <div className={`d-flex activity_title-upper ${!todoItems.length ? 'activity_title-upper-bottom-line' : ''}`}>
          <Link
            className='activity__back-to-home'
            to="/"
          >
            <img src={TodoBackIcon} alt=""/>
          </Link>
          <h1 className='header-title m-inline-19 fw-700 ellipsis' onClick={EditTitleActivityGroup} data-cy='todo-title'>
            { activityDetailsById?.title }
          </h1>
          <img className='activity__cursor-pointer' src={TodoTitleEditIcon} alt="" onClick={EditTitleActivityGroup} />
        </div>
        <div className='center activity_title-lower'>
          {
            todoItems.length ? (
              <div className='activity__sorting-button'>
                <div className='activity__sorting-button-wrapper center h-100' onClick={showSortPopUp} data-cy='todo-sort-button'>
                  <img src={TodoSortIcon} alt=""/>
                </div>

                {
                  showSort ? (
                    <div className='activity__sorting-container'>

                      <div className='activity__sorting-wrapper d-flex' onClick={() => changeSortBy('terbaru')}>
                        <div className='d-flex'>
                          <img className='mr-17' src={TodoSortTerbaruIcon} alt=""/>
                          <h5>Terbaru</h5>
                        </div>
                        {
                          sort === 'terbaru' ? <img src={ItemCheckIcon} alt=""/> : <></>
                        }
                      </div>

                      <div className='activity__sorting-wrapper d-flex' onClick={() => changeSortBy('terlama')} data-cy='sort-selection'>
                        <div className='d-flex'>
                          <img className='mr-17' src={TodoSortTerlamaIcon} alt=""/>
                          <h5>Terlama</h5>
                        </div>
                        {
                          sort === 'terlama' ? <img src={ItemCheckIcon} alt=""/> : <></>
                        }
                      </div>

                      <div className='activity__sorting-wrapper d-flex' onClick={() => changeSortBy('asc')} data-cy='todo-sort-button'>
                        <div className='d-flex'>
                          <img className='mr-17' src={TodoSortAscIcon} alt=""/>
                          <h5>A-Z</h5>
                        </div>
                        {
                          sort === 'asc' ? <img src={ItemCheckIcon} alt=""/> : <></>
                        }
                      </div>

                      <div className='activity__sorting-wrapper d-flex' onClick={() => changeSortBy('desc')} data-cy='todo-sort-button'>
                        <div className='d-flex'>
                          <img className='mr-17' src={TodoSortDescIcon} alt=""/>
                          <h5>Z-A</h5>
                        </div>
                        {
                          sort === 'desc' ? <img src={ItemCheckIcon} alt=""/> : <></>
                        }
                      </div>

                      <div className='activity__sorting-wrapper d-flex border-bottom-none' onClick={() => changeSortBy('unfinish')}>
                        <div className='d-flex'>
                          <img className='mr-17' src={TodoSortUnfinishIcon} alt=""/>
                          <h5>Belum Selesai</h5>
                        </div>
                        {
                          sort === 'unfinish' ? <img src={ItemCheckIcon} alt=""/> : <></>
                        }
                      </div>

                    </div>
                  ) : <></>
                }

              </div>
            ) : <></>
          }
          <AddButton action={AddTodoList} text="Tambah" data-cy='todo-add-button'/>
        </div>
      </div>
      <Suspense>
        {
          todoItems?.length ? (
            sortTodoItems.map(todo => {
              return (
                <TodoListCard data={todo} key={`todo-list-${todo.id}`} isChecked={!todo.is_active}/>
              )
            })
          ) : <ActivityEmptyState />
        }
      </Suspense>
    </div>
  )
}

const sortingHelper = (array, sortBy) => {
  switch (sortBy) {
    case 'terbaru':
      return array.sort((a, b) => b.id - a.id)

    case 'terlama':
      return array.sort((a, b) => a.id - b.id)

    case 'asc':
      return array.sort((a, b) => a.title.localeCompare(b.title))

    case 'desc':
      return array.sort((a, b) => b.title.localeCompare(a.title))

    case 'unfinish':
      return array.sort((a, b) => b.is_active - a.is_active)
    
    default:
      return array
  }
}