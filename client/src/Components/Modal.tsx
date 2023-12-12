import React from 'react'

type propsType = {
    open : Boolean;
    onClose : () => void;
    children : React.ReactNode
}
const Modal:React.FC<propsType> = ({open , onClose , children}) => {
  return (
    <div className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"} `} onClick={onClose} >

        <div className={`bg-white rounded-lg shadow p-6 transition-all max-w-md ${open ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`} onClick={(e) => e.stopPropagation()} >
            <button className='absolute top-2 right-2 py-1 px-2 border border-neutral-200 rounded-md text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600' onClick={onClose}>X</button>
            {children}
        </div>
    </div>
  )
}

export default Modal