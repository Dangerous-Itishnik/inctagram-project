import { baseApi } from '@/service/baseApi'

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: build => ({
    createSubscription: build.mutation<Response, FormData>({
      query: images => ({
        body: images,
        method: 'POST',
        url: '/api/v1/posts/image',
      }),
    }),
    getCostOfPaymentSubscription: build.query<never, never>({
      query: () => ({
        method: 'GET',
        url: '/api/v1/subscriptions/cost-of-payment-subscriptions',
      }),
    }),
  }),
})

export const { useGetCostOfPaymentSubscriptionQuery } = subscriptionApi
