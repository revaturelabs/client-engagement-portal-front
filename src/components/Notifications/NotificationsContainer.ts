import { connect } from "react-redux";
import { IRootState } from "../../_reducers";
import { Notifications } from "./Notifications";

const mapStateToProps = (state:IRootState) => {
    return {
        notifications: state.notificationState.notifications
    }
}

export default connect(mapStateToProps)(Notifications)