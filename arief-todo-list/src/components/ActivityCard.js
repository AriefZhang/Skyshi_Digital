import '../assets/css/ActivityCard.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import trash from '../assets/icon/discard.svg'
import { getActivityDetailsById, setShowDeleteActivityModal } from '../store/actions/ActivityGroup'

export default function ActivityCart({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const goToGroupDetail = () => {
    navigate(`/activity/${data.id}`)
  }

  const removeActivity = () => {
    dispatch(getActivityDetailsById(data.id))
    dispatch(setShowDeleteActivityModal(true))
  }

  return (
    <div className='activity-cart__container'>
      <div className='w-100' onClick={goToGroupDetail} data-cy='activity-item'>
        <h5 className='activity-cart__title fw-700'>{data.title}</h5>
      </div>
      <div className='activity-cart__footer'>
        <Moment format="DD MMMM YYYY" className='activity-cart__time fw-500'>{data.created_at}</Moment>
        <img className='activity-cart__delete-button' src={trash} alt="" onClick={removeActivity} data-cy='activity-item-delete-button'/>
      </div>
    </div>
  )
}