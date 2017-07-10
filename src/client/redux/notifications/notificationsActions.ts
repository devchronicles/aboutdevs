import * as ReactNotificationSystem from 'react-notification-system';
import * as ReactRedux from 'react-redux';
import * as clientTypes from '../../typings';

export const ENQUEUE_NOTIFICATION = 'ENQUEUE_NOTIFICATION';
export const DEQUEUE_NOTIFICATION = 'DEQUEUE_NOTIFICATION';

const defaultNotificatioObject: ReactNotificationSystem.Notification = {
    position: 'bl',
    level: 'success',
};

/**
 * Enqueues a new notification to the state
 * @param notification Notification to enqueue
 */
export function enqueueNotification(notification: ReactNotificationSystem.Notification) {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({ type: ENQUEUE_NOTIFICATION, payload: { ...defaultNotificatioObject, ...notification } });
    };
}

/**
 * Removes the first notification from the state
 */
export function dequeueNotification() {
    return async (dispatch: ReactRedux.Dispatch<clientTypes.ReduxState>) => {
        dispatch({ type: DEQUEUE_NOTIFICATION, payload: undefined });
    };
}
