import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


export const ToastNotification = (TYPE, TITLE, DESC) => {
    Toast.show({
      type: TYPE,
      title: TITLE,
      textBody: DESC,
    });
} 

export const TOAST_ALERT_TYPES = {
    SUCCESS : ALERT_TYPE.SUCCESS,
    WARNING : ALERT_TYPE.WARNING,
    DANGER : ALERT_TYPE.DANGER
}