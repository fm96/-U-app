const baseUrl='http://localhost:3000'

/* 
 * 请求轮播图列表
 * 
 */
 export const getBanner=async ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getbanner',
			method:'get',
			success:res=>{
				console.log('本次的路径：/api/getbanner')
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
		
	})
}
/* 
 *获取限时秒杀信息
 * 
 */
export const getSeckill= async ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getseckill',
			method:'get',
			success:res=>{
				console.log('本次的路径：/api/getseckill')
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *获取一级分类信息
 */
export const getCate=async ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getcate',
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *获取商品全部分类信息,树状结构
 */
export const getCates=async ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getcates',
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *获取一级分类下的所有商品信息
 * @params data----分类id
 */
export const getCateGoods= async (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getcategoods',
			data:data,
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *获取一个商品信息
 * @params data----商品id
 */
export const getgoodsinfo=async (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getgoodsinfo',
			method:'get',
			data:data,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *获取商品信息
 */
export const getindexgoods=async ()=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/getindexgoods',
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *模糊搜索
 * @params keywords---搜索关键字
 */
export const search=async (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/search',
			data:data,
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *加入购物车
 * @params data---
 * 			-uid用户编号
 * 			-goodsid商品编号
 * 			-num商品数量
  * 		-authorization--header头中需要添加token后台验证条件
 */
export const addCart=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/cartadd',
			method:'get',
			data:data,
			header:header,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *购物车列表
 * @params  data 参数
 * 			-uid 用户编号
 * 			-authorization header头中需要添加token后台验证条件
 */
export const cartList=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/cartlist',
			data:data,
			header:header,
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *购物车修改
 * @params data 参数
 * 			-id 购物车编号
 * 			-type 操作类型：1减少 2增加
 * 			-authorization header头中需要添加token后台验证条件
 */
export const cartUpadte=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/cartedit',
			data:data,
			header:header,
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *购物车删除
 * @params  data ---参数
 * 			-id  购物车编号
 * 			-authorization  header头中需要添加token后台验证条件
 */
export const cartdelete=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/cartdelete',
			method:'get',
			header:header,
			data:data,
			success:res=>{
				resolve(res)
				},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *订单查询
 * @params   data  参数
 * 			-uid  用户id，
 * 			-authorization header头中需要添加token后台验证条件 
 */
export const getorders=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/orders',
			data:data,
			header:header,
			method:'get',
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *订单添加
 * @params  params  参数
 * 			-uid  用户id
 * 			-goodsid 商品id
 * 			-username 收货人姓名
 * 			-userphone 收货人联系方式
 * 			-address 收货人地址
 * 			-countmoney 订单总支付金额
 * 			-countnumber 订单商品数量
 * 			-addtime 订单添加时间（时间戳） 
 * 			idstr  购物车数据id字符串 例如：idstr = "1,2,3"
 * 			authorization   header头中需要添加token后台验证条件
 */
export const orderadd=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/orderadd',
			method:'get',
			header:header,
			data:data,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *用户登录
 * @params  data 参数
 * 			-phone 手机号
 * 			-cookie header头中需要添加session-name到cookie中去后台获取对应的session数据
 */
export const login=async (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/wxlogin',
			method:'get',
			data:data,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *发送验证码
 * @params  data 参数
 * 			-phone  手机号
 */
export const sms=async (data)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/sms',
			method:'get',
			data:data,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}
/* 
 *检测token是否过期
 * @params  authorization  authorization就是token，放到header中传输
 */
export const checktoken=async (data,header)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:baseUrl+'/api/checktoken',
			method:'get',
			data:data,
			header:header,
			success:res=>{
				resolve(res)
			},
			fail:err=>{
				reject(err)
			}
		})
	})
}