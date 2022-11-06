import '../assets/css/Home.css'
import React, { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { asyncGetActivityGroup, setShowActivityModal } from '../store/actions/ActivityGroup'

import AddButton from '../components/AddButton'
const HomeEmptyState = React.lazy(() => import('../components/content/HomeEmptyState'))
const ActivityCart = React.lazy(() => import('../components/ActivityCard'))
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
        <h1 className='header-title fw-700'>
          Activity
        </h1>
        <AddButton action={AddActivity} text="Tambah"/>
      </div>
      <Suspense fallback={<Loading />}>
        {
          activityList.length ? (
            <div className='home__activity-wrapper m-auto'>
              {
                activityList.map(list => {
                  return (
                    <ActivityCart data={list} key={'activity-group-' + list.id}/>
                  )
                })
              }
            </div>
          ) : (
              <HomeEmptyState />
          )
        }
      </Suspense>
    </div>
  )
}