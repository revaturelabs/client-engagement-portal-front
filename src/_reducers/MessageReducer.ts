export interface INewMessageProps {
  show: boolean;
  toggle: () => void;
  clients: any[];
  admins: any[];
}

export interface IReplyModalProps {
  title: String;
  show: boolean;
  toggle: () => void;
  recipient: String;
}
