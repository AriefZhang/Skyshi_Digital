import './App.css';
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import {
  createActivityGroup,
  createTodoList,
  editActivityGroup,
  editTodoList,
  deleteActivityGroup,
  deleteTodoList
} from './store/actions/ActivityGroup'

import Navbar from "./components/Navbar"
const Home = React.lazy(() => import('./views/Home'))
const Activity = React.lazy(() => import('./views/Activity'))
const Loading = React.lazy(() => import('./components/Loading'))
const ModalAddItems = React.lazy(() => import('./components/ModalAddItems'))
const ModalRemoveItems = React.lazy(() => import('./components/ModalRemoveItems'))
const ModalAlert = React.lazy(() => import('./components/ModalAlertRemoveItems'))

function App() {
  const dispatch = useDispatch()
  const {
    activityDetailsById,
    todoItemsById,
    showActivityModal,
    showTodoListModal,
    showEditTitleActivityModal,
    showEditTodoListModal,
    showDeleteActivityModal,
    showDeleteTodoListModal,
    showAlertModal
  } = useSelector(state => state.activityGroupReducer)

  const AddActivity = (payload) => {
    dispatch(createActivityGroup(payload))
  }

  const EditActivity = (payload) => {
    const options = {
      id: activityDetailsById.id,
      data: payload
    }
    dispatch(editActivityGroup(options))
  }

  const RemoveActivity = () => {
    dispatch(deleteActivityGroup(activityDetailsById.id))
  }

  const RemoveTodoList = () => {
    const options = {
      id: todoItemsById.id,
      activityId: activityDetailsById.id
    }
    dispatch(deleteTodoList(options))
  }

  const AddTodoList = (payload) => {
    const options = {
      activity_group_id: activityDetailsById.id,
      ...payload
    }
    dispatch(createTodoList(options))
  }

  const EditTodoList = (payload) => {
    const options = {
      id: todoItemsById.id,
      data: {
        is_active: todoItemsById.is_active,
        ...payload
      },
      activityId: activityDetailsById.id
    }
    dispatch(editTodoList(options))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading />}>
          { showActivityModal ? (
            <ModalAddItems 
              title='Tambah Activity'
              action={AddActivity}
            />
            ) : <></> 
          }
          { showEditTitleActivityModal ? (
            <ModalAddItems 
              title='Edit Activity Title'
              action={EditActivity}
            />
            ) : <></> 
          }
          { showDeleteActivityModal ? (
            <ModalRemoveItems 
              title="Activity"
              action={RemoveActivity}
            />
            ) : <></> 
          }
          { showTodoListModal ? (
            <ModalAddItems 
              title='Tambah Todo List Item'
              action={AddTodoList}
            />
            ) : <></> 
          }
          { showEditTodoListModal ? (
            <ModalAddItems 
              title='Edit Todo List Item'
              action={EditTodoList}
            />
            ) : <></> 
          }
          { showDeleteTodoListModal ? (
            <ModalRemoveItems 
              title="Todo List"
              action={RemoveTodoList}
            />
            ) : <></> 
          }
          { showAlertModal ? (
            <ModalAlert 
              title="Activity"
            />
            ) : <></> 
          }
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/activity/:id" element={<Activity />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
