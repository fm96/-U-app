<template>
	<view class="container">
		<view class="top">
			<view class="content" v-for="(item,index) in cartlist" :key='id'>
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="cartInfo" id="demo1">
						<!-- 购物车商品信息 -->
						<view class="cartInfochild">
							<!-- 选择框 -->
							<view class="cartInfo_switch common">
								<!-- 点击当前商品 -->
								<switch type="checkbox" @change='changeCheck' :checked="item.checked==1?true:false" :data-num='item.num' :data-id="item.id"/>
							</view>
							<!-- 图片 -->
							<view class="cartInfo_image common">
								<image :src="imgUrl+item.img" mode="aspectFill"></image>
							</view>

							<!-- 信息 -->
							<view class="cartInfo_info">
								<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
								<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
								<label for="" style="color: red;">￥{{item.price*item.num}}</label>
							</view>
							<!-- 加减数量 -->
							<view class="cartInfo_num">
								<view class="cartInfo_num_child">
									<label for="" :data-num='item.num' :data-check='item.checked' :data-id="item.id" @click="reduce">-</label>
									<label for="">{{item.num}}</label>
									<label for="" :data-num='item.num'  :data-check='item.checked' :data-id="item.id" @click="add">+</label>
								</view>
							</view>
						</view>
					</view>
					<view class="cartDel" id="demo2" :id="item.id" @click="del"><label for="">删除</label></view>
				</scroll-view>
			</view>

		</view>

		<!-- 底部 -->
		<view class="foot" v-if="cartlist.length>0">
			<view class="footd1">
				<switch type="checkbox" @change="allchange" :checked="allchecked" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{sum}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toOrder">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{total}}件)</label>
			</view>
		</view>
		<view class="" v-if="cartlist.length==0">购物车空空如也，赶快去加入购物车吧~~~~</view>
	</view>
</template>

<script>
	import {
		cartList,
		cartUpadte,
		cartdelete,
		checktoken
	} from '../../utils/request.js'
	export default {
		data() {
			return {
				cartlist: [], //购物车列表
				imgUrl: this.imgUrl, //图片后缀
				carts: {
					uid: ''
				},//传参
			}
		},
		async onShow() { 
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
					// 获取购物车列表
					this.getcartlist()
				}
			
		},
		computed:{
			// 计算总价
			sum(){
				// 循环找到数据库checked值为1的数据
				if(this.cartlist==null){
					 this.cartlist=[]
				}
				let list=this.cartlist.filter(item=>{
					return item.checked==1
				})
				// 循环计算总价，返回一个新数组
				let arr=list.map(item=>{
					return item.price*item.num
				})
				// 数组求和
				return arr.reduce((sum,current)=>{
					// console.log(sum,current)
					return sum+current
				},0)
			},
			// 全选
			allchecked:{
				get:function(){
					return this.cartlist.every(value=>{
						return value.checked==1
					})
				},
				set:function(val){
					this.cartlist.forEach(item=>{
						item.checked=val
					})
				}
				
			},
			// 计算付款的件数
			total(){
				let res=this.cartlist.filter((item,index)=>{
					return item.checked==1;index
				})
				return res.length
			}
		},
		methods: {
			// 添加数量
			async add(e) {
				console.log(e)
				// 获取购物车id
				let token=uni.getStorageSync('userInfo').token
				let {id,num,check} = e.currentTarget.dataset
				let data = {
					id: id,
					num:num+=1,
					checked:check
				}
				let res=await cartUpadte(data,{authorization:token})
				// 重新渲染页面
				if(res.data.code==200){
					this.getcartlist()
				}
				
			},
			// 减少数量
			async reduce(e) {
				let token=uni.getStorageSync('userInfo').token
				// 获取购物车id
				let {id,num,check} = e.currentTarget.dataset
				let data = {
					id: id,
					num:num-=1,
					checked:check
				}
				if(num==0){
					return this.cartlist.num=1
				}
				let res=await cartUpadte(data,{authorization:token})
				// 重新渲染页面
				if(res.data.code==200){
					this.getcartlist()
				}
			},
			// 获取购物车列表
			async getcartlist(){
				let userInfo=uni.getStorageSync('userInfo')
				let {uid,token}=userInfo
				this.carts.uid =uid
				let res = await cartList(this.carts,{authorization:token})
				this.cartlist = res.data.list
				// console.log(res)
			},
			// 是否选中，单选
			async changeCheck(e){
				// 获取购物车id
				let {id,num}=e.currentTarget.dataset
				let data = {
					id: id,
					num:num,
					checked:e.detail.value==true?1:0
				}
				let userInfo=uni.getStorageSync('userInfo')
				let res=await cartUpadte(data,{authorization:userInfo.token})
				this.getcartlist()
			},
			// 全选
			 allchange(e){
				this.allchecked=!this.allchecked
				let userInfo=uni.getStorageSync('userInfo')
					 this.cartlist.forEach(async (item,index)=>{
						let data = {
							id: item.id,
							num:item.num,
							checked:!this.allchecked?0:1
						}
						let res=await cartUpadte(data,{authorization:userInfo.token})
						this.getcartlist()
					})
			},
			// 点击删除
			 del(e){
				// 购物车id
				let id=e.currentTarget.id
				let userInfo=uni.getStorageSync('userInfo')
				uni.showModal({
					title:"你确定要删除吗？",
					success:async res=>{
						// 删除数据库数据
						let data={
							id:id
						}
						if(res.confirm==true){
							let res=await cartdelete(data,{authorization:userInfo.token})
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							})
							this.getcartlist()
						}
					}
				})
				
			},
			// 跳转到结算页面,确认订单
			toOrder(){
				let res=this.cartlist.filter(item=>{
					return item.checked==1
				})
				uni.setStorageSync('order',res)
				uni.navigateTo({
					url:'/pages/confirm/confirm'
				})
			}
			
		}
	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}

	.scroll-view_H {
		height: 200rpx;
	}
</style>
