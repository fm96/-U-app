<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="imgUrl+detail.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{detail.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{detail.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="
reduce">-</label>
					<label class="zhi">{{goods.num}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>{{detail.specsname}}</label>
					<view class="threed3i1" v-for="item in detail.specsattr" :key='index'>{{item}}</view>
					<!-- <view class="threed3i2">5g</view> -->
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
			<view class="" v-html="detail.description"></view>
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" :id="detail.id" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		getgoodsinfo,
		addCart,
		checktoken
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				detail: {}, //商品详情
				imgUrl: this.imgUrl, //图片后缀
				goods: {
					uid: '',
					goodsid: '',
					num: 1, //商品数量
				}
			}
		},
		methods: {
			// 添加数量
			add() {
				this.goods.num += 1
			},
			// 减少数量
			reduce() {
				if (this.goods.num == 0) {
					return this.goods.num = 0
				}
				this.goods.num -= 1
			},
			// 点击添加购物车
			addCart(e) {
				let goodsid = e.currentTarget.id
				let userInfo=uni.getStorageSync('userInfo')
				let {uid,token}=userInfo
				uni.showModal({
					title: '你确定要加入购物车吗？',
					success: async res => {
						// 判断是否登录
						let token=uni.getStorageSync('userInfo').token||'';
						let restoken=await checktoken({},{authorization:token});
							if(restoken.data.code==500){
								uni.showToast({
									title:'你还未登录，请先登录！',
									icon:'none'
								})
								/* uni.navigateTo({
									url:'/pages/send/send'
								}) */
								return;
							}else{
								this.goods.goodsid = goodsid
								this.goods.uid =uid
								// console.log(data)
								let cart = await addCart(this.goods,{authorization:token})
								if (cart.data.code == 200) {
									uni.showToast({
										title: '添加成功',
										icon:'none'
									})
								}else{
									uni.showToast({
										title: '添加失败',
										icon:'none'
									})
								}
							}
							
						}
				})
			}

		},
		async onLoad(e) {
			// 获取商品id
			let id = e.id;
			let info = await getgoodsinfo({
				id: id
			});
			this.detail = info.data.list[0]
			this.detail.specsattr = this.detail.specsattr.split(',')
			// console.log(info)
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
