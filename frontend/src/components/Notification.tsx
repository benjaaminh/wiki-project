
interface Props {
  notification: string|null
}
const Notification = ({notification}:Props) => {
  const notificationStyle = {
    color: "green",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    background: "lightgrey",
  };

  const errorStyle = {
    color: "red",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    background: "lightgrey",
  };


  if (notification === null) {
    return null;
  } else if (notification.toLowerCase().includes("fail")) {
    return <div style={errorStyle}>{notification}</div>;
  } else {
    return <div style={notificationStyle}>{notification}</div>;
  }
};

export default Notification;
