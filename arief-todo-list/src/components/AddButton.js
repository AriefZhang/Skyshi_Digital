import '../assets/css/Button.css'

export default function AddButton({ action, text, disabled }) {

  return (
    <div className={`button add-button ${!text ? 'mr-40' : ''} ${disabled ? 'add-button-disabled' : ''}`} onClick={action}>
      {
        text === 'Tambah' ? (
          <>
            <div className='add-button-plus-icon-wrapper'>
              <div className='add-button-plus-icon-horizontal position-absolute-translate-center'/>
              <div className='add-button-plus-icon-vertical position-absolute-translate-center'/>
            </div>
            <h5>Tambah</h5>
          </>
        ) : (
          <h5>Simpan</h5>
        )
      }
    </div>
  )
}