]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in orderlist" :key='item.id'>
				<view class="products" v-for="(i,index) in orderlist[index].child" :key='index'>
					<view class="imagebox" v>
						<image :src="imgUrl+i.img" mode="widthFix"></image>
						<text>{{i.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
			
		<view class="tishi" v-if="orderlist.length==0">
			没有数据亲！
		</view>
		</view>
	</view>
</template>

<script>
	import {getorders} from '../../utils/request.js'
	export default{
		data(){
			return{
				orderlist:[],
				imgUrl:this.imgUrl
			}
		},
		onLoad(){
			this.getorderlist()
		},
		methods:{
			async getorderlist(){
				let userInfo=uni.getStorageSync('userInfo')
				let {uid,token}=userInfo
				let data={
					uid:uid
				}
				let res=await getorders(data,{authorization:token})
				
				this.orderlist=res.data.list
				// console.log(this.orderlist)
				// this.orderlist.concat(res.data.list.child)
			}
		}
	}
</script>
<style>

	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		float: left;
		margin:10rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
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
