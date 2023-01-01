import { useSelector } from "react-redux";

const Notification = () => {
    const {message, notificationType} = useSelector((state) => state.notification);

    if (message === null) {
      return null
    }
  
    return (
      <div className={notificationType}>
        {message}
      </div>
    )
  }

export default Notification;