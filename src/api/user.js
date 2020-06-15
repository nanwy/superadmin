import request from '@/utils/request'

export function userList() {
  return request({
    url: '/api/user/list',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

export function getinfo(username) {
  return request({
    url: '/api/user/userinfo',
    method: 'get',
    // es6简写
    params: { username }

  })
}
export function find(username) {
  return request({
    url: '/api/user/find',
    method: 'get',
    params: {
      username
    }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'get'
  })
}

export function deluser(id) {
  return request({
    url: '/api/user/del',
    method: 'get',
    params:{
      id
    }
  })
}
