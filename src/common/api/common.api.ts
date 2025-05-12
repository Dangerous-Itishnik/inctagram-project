export const WORK_URL = 'https://inctagram.work'

export const PROD_URL = 'https://dang-inc-project.uk'

export const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_URL : WORK_URL
