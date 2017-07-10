import * as commonTypes from '../../../common/typings';
import * as ReactNotificationSystem from 'react-notification-system';

import { ENQUEUE_NOTIFICATION } from './notificationsActions';

const defaultNotificationsState: ReactNotificationSystem.Notification[] = [];

export function notificationsReducer(
    state: ReactNotificationSystem.Notification[] = defaultNotificationsState,
    action: any) {
    switch (action.type) {
        case ENQUEUE_NOTIFICATION:
            return [...state, action.payload];
        default:
            return state.slice(1);
    }
}
