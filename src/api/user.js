import axios from '@/libs/api.request'

// 验证Token
export const text = () => {
    return axios.request({
      url: 'api/text',
    //   data:{token},
      method: 'post'
    })
}

// 验证Token
export const checkUser = (token) => {
    return axios.request({
      url: 'api/admin/checkUser',
      data:{token},
      method: 'post'
    })
}

