import { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

function ToastContextProvider({ children }) {
  const [toast, setToast] = useState({
    isOpen: false,
    title: "",
    description: "",
  })


  function showToast(title, description , icon , type,address) {
    setToast({
      isOpen: true,
      title,
      description,
      icon,
      type,
      address,
    })
  }

  function closeToast() {
    setToast(prev => ({
      ...prev,
      isOpen: false,
    }))
  }

  return(
    <ToastContext.Provider value={{toast , closeToast , showToast}}>
      {children}
    </ToastContext.Provider>
  )

}

function useToaster () {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useLibrary must be used within the context')
  return context
}

export {useToaster , ToastContextProvider}