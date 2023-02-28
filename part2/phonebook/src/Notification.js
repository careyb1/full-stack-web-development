const Notification = ({ type , message }) => {
  if (message === null) {
    return null
  }
  if (type == 'success'){
    var notificationStyle = {
      color: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  } else {
    var notificationStyle = {
      color: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }
  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification