import { connect } from "react-redux";
import { IRootState } from "../../_reducers";
import { addNotification, getNotifications, removeNotification } from "./NotificationActions";
import { Notifications } from "./Notifications";

const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

const mapDispatchToProps = {
    addNotif: addNotification,
    getNotifs: getNotifications,
    removeNotif: removeNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
