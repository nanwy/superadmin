import { login, logout, getinfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  username: '',
  role: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.username = name
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  // es6参数解构写法
  login({ commit }, userInfo) {
    // es6参数解构，取userInfo里的username，password
    const { username, password } = userInfo
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
      // 调用api接口的login方法，login方法返回的是封装好的axios实例
      login({ username: username.trim(), password: password }).then(response => {
        if (response.errno === 0) {
          // 设置token
          console.log('res',response.message);
          
          commit('SET_TOKEN', response.message)
          // 保存token到cookie
          setToken(response.token)
          // 成功
          resolve()
        } else {
          console.log('账号或密码错误！')
          reject('账号或密码错误df！')
        }
      }).catch(error => {
        reject('账号或密码错误！')
        console.log(error)
      })
    })
  },
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      removeToken()
      resetRouter()
      resolve()
      })
      .catch(error => {
        reject(error)
      })
    })
  },
  // get user info
  getInfo({ commit, state }) {
    console.log('token',state.token);
    
    return new Promise((resolve, reject) => {
      getinfo(state.token).then(response => {
        console.log('response',response.message);
        console.log('Chenggong');
        
        const  admin  = response.message
        if (response.errno != 0) {
          // 验证失败，请重新登录。
          reject('验证失败，请重新登录。')
        } else {
          // 保存状态
          commit('SET_ROLE', admin)
          console.log('role',admin);
          
          commit('SET_NAME', state.token)
          // commit('SET_AVATAR', avatar)
          // 返回成功的数据
          resolve(response.userinfo)
        }
      }).catch(error => {
        console.log('失败',error)
        reject('登录失效，请重新s登录!')
      })
    })
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //     if (!data) {
    //       // 验证失败，请重新登录。
    //       reject('Verification failed, please Login again.')
    //     }
    //     // es6参数解构，获取用户名，头像
    //     const { name, avatar } = data
    //     // 保存状态
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     // 返回成功的数据
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout


  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

