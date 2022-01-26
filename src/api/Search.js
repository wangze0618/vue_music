// 搜索模块
import axios from '../utils/request'

// 热搜关键字
export const hotSearch = (params) => axios({
    url: '/search/hot',
    params
})

// 搜索结果
export const searchResultList = (params) => axios({
    url: '/cloudsearch',
    params
})