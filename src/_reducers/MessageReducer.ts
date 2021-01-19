export interface INewMessageProps {
  show: boolean;
  toggle: () => void;
  isAdmin: boolean;
  clients: any[];
  admins: any[];
}

export interface IReplyModalProps {
  title: String;
  show: boolean;
  toggle: () => void;
  recipient: String;
}
