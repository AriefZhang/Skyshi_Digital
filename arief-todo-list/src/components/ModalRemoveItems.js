import '../assets/css/Modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { setShowDeleteActivityModal, setShowDeleteTodoListModal, setShowAlertModal } from '../store/actions/ActivityGroup'

import RemoveButton from '../components/RemoveButton'
import DeleteWarningIcon from '../assets/icon/modal-delete-icon.svg'

export default function Modal({ action, title }) {
  const dispatch = useDispatch()
  const { activityDetailsById, todoItemsById } = useSelector(state => state.activityGroupReducer)

  const isActivity = title.includes('Activity')

  const closeModal = () => {
    dispatch(setShowDeleteActivityModal(false))
    dispatch(setShowDeleteTodoListModal(false))
  }

  const click = () => {
    action()
    closeModal()
    dispatch(setShowAlertModal(true))
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal-layout-outer'>
        <div className='modal-layout-inner modal-full-page' onClick={ closeModal }></div>
        <div className='modal-full-page'>
          <div className=' modal modal-body-delete'>
            <div className='modal-content modal-content-delete modal-content-delete-padding'>
              <img src={DeleteWarningIcon} alt=""/>     
              <h5 className='fw-500'>Apakah anda yakin menghapus {isActivity ? 'activity' : 'list item'}</h5>
              <h5 className='fw-700'>"{isActivity ? activityDetailsById.title : todoItemsById.title}"?</h5>
              <div className='center gap-20 mt-46'>
                <RemoveButton 
                  text="Batal"
                  action={closeModal}
                  data-cy='modal-delete-cancel-button'
                />
                <RemoveButton 
                  text="Hapus"
                  action={click}
                  data-cy='modal-delete-confirm-button'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}