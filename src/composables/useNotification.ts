import { merge } from 'lodash'

import type { Notification } from '#ui/types'

export type NotificationType =
  | 'success'
  | 'error'

export type NotificationConfig = Partial<Notification>

const notificationDefaults: Record<NotificationType, NotificationConfig> = {
  'success': {
    icon: 'i-heroicons-check-circle',
    color: 'green',
  },
  'error': {
    icon: 'i-heroicons-exclamation-circle',
    color: 'red',
  },
}

export const useNotification = () => {
  const toast = useToast()

  const notify = (type: NotificationType, config: NotificationConfig) => {
    toast.add(merge(notificationDefaults[type], config))
  }

  const success = (config: NotificationConfig) => {
    notify('success', config)
  }

  const error = (config: NotificationConfig) => {
    notify('error', config)
  }

  return {
    success,
    error,
  }
}
