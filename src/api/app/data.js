import axios from '@/libs/api.request'

// 验证Token
export const recommend = (type,page) => {
    return axios.request({
      url: `/satinApi?type=${type}&page=${page}`,
      method: 'get'
    })
}