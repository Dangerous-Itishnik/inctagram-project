import { format, formatDistanceToNow } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatNotificationDate = (date: Date | string): string => {
  const notifyDate = new Date(date)

  if (isNaN(notifyDate.getTime())) {
    return 'Дата неизвестна'
  }

  const now = new Date()
  const daysDiff = (now.getTime() - notifyDate.getTime()) / (1000 * 60 * 60 * 24)

  if (daysDiff <= 7) {
    return formatDistanceToNow(notifyDate, { addSuffix: true, locale: ru })
  }

  return format(notifyDate, 'dd.MM.yyyy', { locale: ru })
}
