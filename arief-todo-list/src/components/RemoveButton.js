import '../assets/css/Button.css'

export default function RemoveButton({ action, text }) {

  return (
    <div className={`button ${text === 'Hapus' ? 'remove-button__delete' : 'remove-button__cancel'}`} onClick={action}>
      <h5>{ text }</h5>
    </div>
  )
}