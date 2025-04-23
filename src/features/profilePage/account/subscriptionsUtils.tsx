import { ActiveSubscription, CurrentActive } from '@/service/accountAndPayments/account'

// Find the latest end date from an array of subscriptions
export const findLatestEndDate = (subscriptions: ActiveSubscription[]) => {
  if (!subscriptions || subscriptions.length === 0) {
    return null
  }

  const endDates = subscriptions
    .map(sub => new Date(sub.endDateOfSubscription))
    .filter(date => !isNaN(date.getTime()))

  if (endDates.length === 0) {
    return null
  }

  return new Date(Math.max(...endDates.map(date => date.getTime())))
}

// Calculate next payment date based on the latest end date
export const calculateNextPaymentDate = (subscriptions: ActiveSubscription[]) => {
  // Next payment is typically the day after the latest end date
  const latestEndDate = findLatestEndDate(subscriptions)

  if (!latestEndDate) {
    return null
  }

  const nextPaymentDate = new Date(latestEndDate)

  nextPaymentDate.setDate(nextPaymentDate.getDate() + 1) // One day after the end date

  return nextPaymentDate
}

// For handling single subscription
export const calculateNextPaymentFromActive = (subscription: ActiveSubscription) => {
  if (!subscription) {
    return null
  }

  const endDate = new Date(subscription.endDateOfSubscription)

  if (isNaN(endDate.getTime())) {
    return null
  }

  return endDate
}

export const calculateExpirationFromActive = (currentActive: CurrentActive | undefined) => {
  if (!currentActive) {
    return null
  }

  // If data is an array
  if (Array.isArray(currentActive.data)) {
    return findLatestEndDate(currentActive.data)
  }

  // If data is a single object
  const endDate = new Date(currentActive.data.endDateOfSubscription)

  if (isNaN(endDate.getTime())) {
    return null
  }

  return endDate
}

// Helper to ensure we're always working with an array of ActiveSubscription
export const ensureSubscriptionsArray = (
  currentActive: CurrentActive | undefined
): ActiveSubscription[] => {
  if (!currentActive) {
    return []
  }

  // If data is already an array, return it
  if (Array.isArray(currentActive.data)) {
    return currentActive.data
  }

  // If data is a single object, wrap it in an array
  return [currentActive.data]
}

export const formatDate = (date: Date | null) => {
  if (!date || isNaN(date.getTime())) {
    return 'N/A'
  }

  // Format: YYYY-MM-DD
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
