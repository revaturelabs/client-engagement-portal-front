export interface IMessage {
  //basic structure of the message
  messageId: number;
  title: string;
  dateSent: string;
  adminTheSender: boolean;
  message: string;
  readStatus: boolean;
  adminId: {
    adminId: number;
    email: string;
    firstName: string;
    lastName: string;
  };
  clientId: {
    clientId: number;
    email: string;
    companyName: string;
    phoneNumber: string;
  };
}

export interface INewMessageProps {
  show: boolean;
  toggle: () => void;
  clients: any[];
  admins: any[];
}

export interface IReplyModalProps {
  title: string;
  show: boolean;
  toggle: () => void;
  recipient: string;
}

export interface IMessageState {
  messages: IMessage[] | null;
}
const initialState: IMessageState = {
  messages: [],
};

/**
 * This function defines the message reducer, which updates the message
 *   state.
 *
 * @param state the current state of messages:[], initially set to an empty array.
 * @param action the current action being passed in. If the action is in the reducer, the state will change.
 *
 * @returns the current state, after possible modifications
 */
export const messageReducer = (
  state: IMessageState = initialState,
  action: { type: string; payload: IMessage[] }
): IMessageState => {
  if (action.type === "SET_MESSAGES") {
    return {
      messages: [...action.payload],
    };
  } else {
    return state;
  }
};
