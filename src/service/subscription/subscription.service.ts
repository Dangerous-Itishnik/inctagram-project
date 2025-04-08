import { baseApi } from '@/service/baseApi'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    cancelSubscription: build.mutation<never, never>({
      query: () => ({
        // body: {},
        method: 'POST',
        url: '/api/v1/subscriptions/canceled-auto-renewal',
      }),
    }),
    createSubscription: build.mutation<CreateSubscriptionResponse, CreateSubscriptionPayload>({
      query: payload => ({
        body: payload,
        method: 'POST',
        url: '/api/v1/subscriptions',
      }),
    }),
    getCostOfPaymentSubscription: build.query<DataCostOfPaymentResponse, never>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
    getCurrentOfPaymentSubscription: build.query<GetCurrentPaymentResponse, never>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/subscriptions/current-payment-subscriptions',
      }),
    }),
  }),
  invalidatesTags: ['Subscriptions'],
})

export const {
  useCancelSubscriptionMutation,
  useCreateSubscriptionMutation,
  useGetCostOfPaymentSubscriptionQuery,
  useGetCurrentOfPaymentSubscriptionQuery,
} = subscriptionApi

type CreateSubscriptionPayload = {
  amount: number
  baseUrl: string
  paymentType: string
  typeSubscription: string
}

type CreateSubscriptionResponse = {
  url: string
}

type GetCostPaymentResponse = {
  amount: number
  typeDescription: string
}

type DataCostOfPaymentResponse = GetCostPaymentResponse[]

type GetCurrentPaymentResponse = {
  data: DataCurrentPayment[]
  hasAutoRenewal: boolean
}

type DataCurrentPayment = {
  autoRenewal: boolean
  dateOfPayment: ''
  endDateOfSubscription: ''
  subscriptionId: ''
  userId: number
}
