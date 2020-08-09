import request from '@/utils/request'

export function addTag(data) {
  return request({
    url: '/api/tag/add',
    method: 'post',
    data
  })
}

export function tagList() {
  return request({
    url: '/api/tag/list',
    method: 'get'
  })
}