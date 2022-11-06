import HomeEmptyStateImage from '../../assets/image/activity-empty-state.webp'

export default function HomeEmptyState() {
  return (
    <div className='mt-59 d-flex'>
      <img src={HomeEmptyStateImage} alt="" className='w-100 empty-state m-auto' loading="lazy"/>
    </div>
  )
}
