type AlertType = 'info' | 'success' | 'warning' | 'error';

type BaseAlert = {
  id?: string;
  type: AlertType;
  icon?: string;
  title?: string;
  description?: string;
  canBeClosed?: boolean;
  forceShow?: boolean;
  isHidden?: boolean;
  isNonPersistent?: boolean;
  isComponent?: boolean;
};

type Alert = BaseAlert & {
  id: string;
  isGlobal?: boolean;
  isFlashAlert?: boolean;
};
