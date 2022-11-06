import '../assets/css/Home.css'
import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetActivityGroup, setShowActivityModal } from '../store/actions/ActivityGroup'

import AddButton from '../components/AddButton'
import ActivityCart from '../components/ActivityCard'
import HomeEmptyState from '../components/content/HomeEmptyState'
const Loading = React.lazy(() => import('../components/Loading'))

export default function Home() {
  const dispatch = useDispatch()
  const { activityList } = useSelector(state => state.activityGroupReducer)

  useEffect(() => {
    dispatch(asyncGetActivityGroup())
  }, [dispatch])

  const AddActivity = () => {
    dispatch(setShowActivityModal(true))
  }

  return (
    <div className="home__container">
      <div className="header">
        <h1 className='header-title fw-700' data-cy='activity-title'>
          Activity
        </h1>
        <div data-cy='activity-add-button' onClick={AddActivity}>
          <AddButton action={AddActivity} text="Tambah" data-cy='activity-add-button'/>
        </div>
      </div>
      <Suspense fallback={<Loading />}>
        {
          activityList.length ? (
            <div className='home__activity-wrapper m-auto' data-cy='activity-item'>
              {
                activityList.map(list => {
                  return (
                    <ActivityCart data={list} key={'activity-group-' + list.id}/>
                  )
                })
              }
            </div>
          ) : (
              <HomeEmptyState data-cy='activity-item'/>
          )
        }
      </Suspense>
    </div>
  )
}