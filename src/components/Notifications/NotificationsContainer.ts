import { connect } from "react-redux";
import { IRootState } from "../../_reducers";
import { Notifications } from "./Notifications";

/**
 * Gets the notification state to be mapped to the props for the Notification.tsx component.
 * 
 * @param state current state that holds all other states
 */
const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

/**
 * Sends the current notification state to the Notification.tsx component.
 */
export default connect(mapStateToProps)(Notifications);
