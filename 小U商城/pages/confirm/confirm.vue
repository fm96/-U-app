<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{username}}</label>	
				<label for="">{{userphone}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{address}}</label>
			</view>
		</view>
		
		<!-- 商品信息 -->
		<view class="carts">
				
			<view class="cartsInfo" v-for="(item,index) in cartlist" :key='item.id'>
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="imgUrl+item.img" mode="aspectFill"></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量:
					</view>
					<view class="">
						<label for="" class="jian" @click="reduce(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>		
				
				
				
			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>
		
		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use" >
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分"/>
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>
		
		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>
		
		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {cartUpadte,orderadd} from '../../utils/request.js'
	export default{
		data(){
			return{
				cartlist:[],
				imgUrl:this.imgUrl,
				username:'悟空',
				userphone:'18301628393',
				address:'花果山水帘洞27号'
			}
		},
		computed:{
			// 计算总价
			allPrice(){
				// 数组求和
				return this.cartlist.reduce((sum,item)=>{
					// console.log(sum,current)
					return sum+=item.price*item.num
				},0)
			}
		},
		onLoad(){
			let list=uni.getStorageSync('order')||[]
			this.cartlist=list
		},
		methods:{
			// 添加数量
			 add(index) {
				this.cartlist[index].num+=1;
				uni.setStorageSync('order',this.cartlist)
				
			},
			// 减少数量
			reduce(index) {
				if(this.cartlist[index].num<=1){
					return this.cartlist[index].num=1
				}
				this.cartlist[index].num-=1;
				uni.setStorageSync('order',this.cartlist)
			},
			
			// 点击提交订单表
			async pay(){
				let userInfo=uni.getStorageSync('userInfo')
				let {uid,token}=userInfo
				let orderlist=uni.getStorageSync('order')
				let num=orderlist.reduce((sum,item)=>{
					return sum+=item.num
				},0)
				let data={
				uid,
				username:this.username,
				userphone:this.userphone,
				address:this.address,
				countmoney:this.allPrice,
				countnumber:num,
				addtime:new Date().getTime()
				}
				let cartid=this.cartlist.map(item=>{
					return item.id
				})
				let idstr=cartid.toString()
				let params=JSON.stringify(data)
				let res=await orderadd({params:params,idstr:idstr},{authorization:token})
				// console.log(res)
				if(res.data.code==200){
					uni.showToast({
						title:res.data.msg,
						icon:'none'
					})
					uni.navigateTo({
						url:'/pages/order/order'
					})
				}
			}
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
