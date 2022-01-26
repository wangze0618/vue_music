// 文件名-尽量和模块页面文件名统一(方便查找)
import axios from '../utils/request'

// 首页 - 推荐歌单
export const recommendMusic = (params) => axios({
    url: '/personalized',
    params
    // 将来外面可能传入params的值 {limit: 20}
})

// 首页 - 推荐最新音乐
export const
    newMusic = (params) => axios({
        url: "/personalized/newsong",
        params
    })