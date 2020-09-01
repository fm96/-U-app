<template>
	<view>
		<uni-search-bar :radius="100" bgColor="#ffffff" class="input_"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in searchlist" :key='item.id'>
				<image :src="imgUrl+item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>现价￥{{item.price}}</text>	
					<text>原价￥{{item.market_price}}</text>	
					<text>3565评论</text>	
				</view>
			</view>
			
		</view>
		<view class="tishi" v-if="searchlist==null">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {search} from "../../utils/request.js"
	export default{
		data(){
			return{
				keywords:'',//搜索词
				searchlist:[],
				imgUrl:this.imgUrl
			}
		},
		async onLoad(e){
			let res=await search({keywords:e.keywords})
			// console.log(res)
			this.searchlist=res.data.list
		}
	}
</script>

<style>

	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 190rpx;
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
