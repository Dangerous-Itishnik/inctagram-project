import { baseApi } from '@/service/baseApi'

export const accountApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      autoRenewal: build.mutation({
        invalidatesTags: ['Payments'],
        query: () => ({
          method: 'POST',
          url: '/api/v1/subscriptions/canceled-auto-renewal',
        }),
      }),
      getCostPayments: build.query<SubscriptionPrice, void>({
        query: () => ({
          method: 'GET',
          url: 'api/v1/subscriptions/cost-of-payment-subscriptions',
        }),
      }),
      getPayments: build.query<MyPaymentsResponse[], void>({
        providesTags: ['Payments'],
        query: () => ({
          method: 'GET',
          url: '/api/v1/subscriptions/my-payments',
        }),
      }),

      getSubscriptions: build.query<CurrentActive, void>({
        query: () => ({
          method: 'GET',
          url: '/api/v1/subscriptions/current-payment-subscriptions',
        }),
      }),
      newSubscription: build.mutation<newSubscriptionResponse, CreateSubscriptionType>({
        invalidatesTags: ['Payments'],
        query: body => ({
          body,
          method: 'POST',
          url: 'api/v1/subscriptions',
        }),
      }),
    }
  },
})

export const {
  useAutoRenewalMutation,
  useGetCostPaymentsQuery,
  useGetPaymentsQuery,
  useGetSubscriptionsQuery,
  useNewSubscriptionMutation,
} = accountApi

//PaymentsViewModel
export type MyPaymentsResponse = {
  dateOfPayment: string
  endDateOfSubscription: string
  paymentType: PaymentType
  price: number
  subscriptionId: string
  subscriptionType: MyPaymentType
  userId: number
}

export type MyPaymentType = 'DAY' | 'MONTHLY' | 'WEEKLY'
export type PaymentType = 'PAYPAL' | 'STRIPE'
export type AccountType = 'Business' | 'Personal'

//add subscription
export type CreateSubscriptionType = {
  amount: number
  baseUrl: string
  paymentType: PaymentType
  typeSubscription: MyPaymentType
}

export type newSubscriptionResponse = {
  url: string
}

//PricingDetails
export type CostAndPaymentsType = {
  amount: number
  typeDescription: MyPaymentType
}

export type SubscriptionPrice = {
  data: CostAndPaymentsType[]
}
//Auto-Renewar
export type ActiveSubscription = {
  autoRenewal: boolean
  dateOfPayment: string
  endDateOfSubscription: string
  subscriptionId: string
  userId: number
}

export type CurrentActive = {
  data: ActiveSubscription
  hasAutoRenewal: boolean
}
