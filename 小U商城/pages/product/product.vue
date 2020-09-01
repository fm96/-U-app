<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" v-model="keywords" placeholder="搜索商品" placeholder-class="placeholder" @blur='dosearch' />
		</view>
		<view class="list">
			<view class="row" v-for="(item,index) in cateGoodsList" :key='item.id' :id="item.id" @click="todetail">
				<image :src="imgUrl+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.market_price}}</text>	
					<text>3565评论</text>	
				</view>
			</view>
			
			
		</view>
		<view class="tishi" v-if="cateGoodsList.length==0">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {getCateGoods,search} from '../../utils/request.js'
	export default{
		data(){
			return{
				cateGoodsList:[],//分类商品列表
				imgUrl:this.imgUrl,//图片前缀
				keywords:''//搜索词
			}
		},
		async onLoad(e){
			// 如果传过来的值是id
			if(e.id){
				// 获取id
				let id=e.id;
				if(id!=0){
					// 获取分类商品列表
					let cates=await getCateGoods({fid:id})
					if(cates.data.list==null){
					return this.cateGoodsList=[]
					}
					this.cateGoodsList=cates.data.list
					// console.log(cates)
				}
			}
			// 如果传过来的值是keywords
			if(e.keywords){
				let res=await search({keywords:e.keywords})
				// console.log(res)
				this.cateGoodsList=res.data.list
			}
			
		},
		methods:{
			// 点击跳转到商品详情页
			todetail(e){
				// 获取商品id
				let id=e.currentTarget.id
				// 页面跳转
				uni.navigateTo({
					url:'/pages/details/details?id='+id
				})
			},
			// 输入内容，回车搜素
			async dosearch(){
				let res=await search({keywords:this.keywords})
				this.cateGoodsList=res.data.list
				this.keywords=''
				// console.log(res)
			}
		}
	}
	
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
