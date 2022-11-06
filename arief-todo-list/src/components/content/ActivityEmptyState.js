import ActivityEmptyStateImage from '../../assets/image/todo-empty-state.webp'

export default function HomeEmptyState() {
  return (
    <div className='mt-59 d-flex'>
      <img src={ActivityEmptyStateImage} alt="" className='w-100 empty-state m-auto' loading="lazy"/>
    </div>
  )
}
