import { createContext, useContext, useState } from 'react'

const LibraryContext = createContext()

function LibraryContextProvider({ children }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [alertType , setAlertType] = useState(null)

  function closeAlert(e) {
    e?.stopPropagation();
    setIsAlertOpen(false);
  }

  return (
    <LibraryContext.Provider value={{ isAlertOpen, setIsAlertOpen, closeAlert, alertType, setAlertType }}>
      {children}
    </LibraryContext.Provider>
  )
}

function useLibrary () {
  const context = useContext(LibraryContext)
  if (!context) throw new Error('useLibrary must be used within the context')
  return context
}

export { LibraryContextProvider, useLibrary }