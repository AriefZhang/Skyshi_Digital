import '../assets/css/Modal.css'
import { useDispatch } from 'react-redux'
import { setShowAlertModal } from '../store/actions/ActivityGroup'

import InformationIcon from '../assets/icon/modal-information-icon.svg'

export default function Modal({ title }) {
  const dispatch = useDispatch()

  const isActivity = title.includes('Activity')

  const closeModal = () => {
    dispatch(setShowAlertModal(false))
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal-layout-outer'>
        <div className='modal-layout-inner modal-full-page' onClick={ closeModal }></div>
        <div className='modal-full-page'>
          <div className=' modal modal-body-delete'>
            <div className='modal-content modal-content-alert d-flex'>
              <img src={InformationIcon} alt="" className='mr-10'/>
              <h5>{isActivity ? 'Activity' : 'List item'} berhasil dihapus</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}