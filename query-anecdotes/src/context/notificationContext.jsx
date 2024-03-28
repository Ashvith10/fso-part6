import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "CLEAR_NOTIFICATION":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispath] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispath]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotify = () => {
  const [notification, notificationDispath] = useContext(NotificationContext)

  return (message, time) => {
    notificationDispath({
      type: 'SET_NOTIFICATION',
      payload: message
    })
    setTimeout(() => notificationDispath({ type: 'CLEAR_NOTIFICATION' }), time * 1000)
  }
}

export default NotificationContext
