<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<text @click="send">{{showText?'发送':second}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;" @click="dologin">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {
		login,
		sms
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				phone: '', //手机号
				code: '', //验证码
				second: 60,
				showText: true
			}
		},
		methods: {
			// 获取验证码
			async send() {
				if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
					uni.showToast({
						title: "请输入正确的手机号！",
						icon: "none"
					})
					return
				}
				this.showText = false
				var interval = setInterval(() => {
					--this.second
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.showText = true
					this.second = 60
				}, 60000)
				let res = await sms({
					phone: this.phone
				});
				console.log(res)
				// 把验证码存入缓存
				let code = res.data.list.code;
				uni.setStorageSync('code', code)
			},
			// 登录
			async dologin() {
				// 验证验证码
				let code = this.code;
				// console.log(code)
				let codeStorage = uni.getStorageSync('code');
				if (code == codeStorage) {
					// 登录
					let res = await login({
						phone: this.phone
					})
					// 获取token uid 存入缓存
					let userInfo = res.data.list;
					uni.setStorageSync('userInfo', userInfo)
					// 跳转到我的页面
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.showToast({
						title: '验证码不正确',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
