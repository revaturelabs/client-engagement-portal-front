export interface INewMessageProps {
  show: boolean;
  toggle: () => void;
  isAdmin: boolean;
}

export interface IReplyModalProps {
  title: String;
  show: boolean;
  toggle: () => void;
}
