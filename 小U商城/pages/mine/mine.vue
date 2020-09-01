<template>
	<view class="container">
		<!-- 顶部头像部分 -->
		<view class="mineTop">
			<view class="mineTop_left">
				<view class="mineTop_left_image" @click="login"><image src="../../static/mine/timg.jpg" mode=""></image></view>
				<view class="mineTop_left_info">
					<label for="" style="color: #fff;">{{userInfo.phone}}</label>
					<label for="">V1</label>
				</view>
			</view>
			<view class="mineTop_right">
				<view class="mineTop_right_info"><label for="">每日签到</label></view>
			</view>
		</view>

		<!-- 订单状态 -->
		<view class="order_state">
			<view class="order_state_list" @click="toOrder">
				<image src="/static/mine/quanbudingdan.png" mode=""></image>
				<lable class="list_text">全部订单</lable>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/daifukuan.png" mode=""></image>
				<lable class="list_text">待付款</lable>
			</view>
			<view class="order_state_list">
				<image src="/static/mine/dizhiguanli.png" mode=""></image>
				<lable class="list_text">待收货</lable>
			</view>

		</view>

		<!-- 个人信息 -->
		<view class="person_msg">
			
			
			
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/dizhiguanli.png" alt class="MsgItemLogo" />
					<label>地址管理</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>

			</view>
			
			
			
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/zu.png" alt class="MsgItemLogo" />
					<label>我的钱包</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeyouhuiquan.png" alt class="MsgItemLogo" />
					<label>我的优惠券</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/wodeerweima.png" alt class="MsgItemLogo" />
					<label>我的二维码</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			<view class="person_msg_list">
				<view class="person_msg_list_info">
					<image src="/static/mine/xiaohuoban.png" alt class="MsgItemLogo" />
					<label>我的小伙伴</label>
				</view>
				<view class="MsgItemRight">
					<label class="remaB" v-show="item.remaBala">200余额</label>
					<image src="../../static/mine/xiayiye.png" alt class="MsgItemDetail" />
				</view>
			</view>
			
			
			
		</view>
	</view>
</template>

<script>
	import {checktoken} from '../../utils/request.js'
export default {
	data(){
		return{
			userInfo:{}
		}
	},
	onLoad(){
		this.userInfo=uni.getStorageSync('userInfo')||{}
		
	},
	methods:{
		// 跳转到订单页
			async toOrder(){
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
					 uni.navigateTo({
					 	url:'/pages/order/order'
					 })
				 }
				
			},
		// 跳转都登录页
		login(){
			uni.navigateTo({
				url:'/pages/send/send'
			})
		}
	}
};
</script>
<style>
@import url('../../common/css/mine.css');
</style>
