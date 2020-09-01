<template>
	<view>
		<!-- 顶部信息 -->
		<view class="HomeTop">
		  <view class="logoView">
			<!-- logo -->
			<img class="logo" src="/static/index/logo.jpg" alt="" />
		  </view>
		  <view class="inputView">
			<input class="textinput" v-model="keywords" @blur="dosearch" style="center" type="text"   placeholder="寻找商品"/>
		  </view>
		</view>
		
		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
		    <scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
		        <view class="uni-tab-item" @click="toCateGoods" :data-current="0">
		            <text class="uni-tab-item-title" :class="current==0?'uni-tab-item-title-active':''">
						推荐
					</text>
		        </view>
				<view class="uni-tab-item" @click="toCateGoods" :data-current="item.id" v-for="(item,index) in cateList" :key='item.id'>
				    <text class="uni-tab-item-title" :class="current==item.id?'uni-tab-item-title-active':''">
						{{item.catename}}
					</text>
				</view>
		    </scroll-view> 
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="(item,index) in bannerList" :key='item.id'>
					<view class="swiper-item">
						<image :src="imgUrl+item.img" mode="aspectFill"></image>
					</view>
				</swiper-item>
				
			</swiper>
		</view>
		
		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
		  <view class="FunctNavLi">
			<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
			<p>限时抢购</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
		  			<p>积分商城</p>
		  </view>
		  <view class="FunctNavLi">
		  			<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
		  			<p>联系我们</p>
		  </view>
		  <view class="FunctNavLi" @click='tocate'>
		  			<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
		  			<p>商品分类</p>
		  </view>
		</view>
		
		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
				  <image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
				  <label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
				  <label class="LimitTime">{{hour}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{minute}}</label>
				  <view class="maohao">:</view>
				  <label class="LimitTime">{{second}}</label>
				  <label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>
			
			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>		
					<!-- <div> -->
					<view class="Cloth">
						<image  src="../../static/index/goods1.jpg" alt="">
					</view>
					
					<!-- </div> -->				
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		  <!-- 轮播图2 -->
		<div class="Swiper2">
		  <image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>
		
		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="indexId==index?'active_tag_list':''" v-for="(item,index) in navList" :key='index' :id="index" @click="toTab" >
					<label for="">{{item}}</label>
				</view>
				
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" @click="todetail" v-for='(item,index) in goodsList' :key='id' :id="item.id">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="imgUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>	
			</view>
		</view>
	</view>
</template>
<script>
	// 引入请求接口文件
	import {getBanner,getSeckill,getCate,getindexgoods} from '../../utils/request.js'
	export default{
		data(){
			return {
				bannerList:[],//轮播图列表
				imgUrl:this.imgUrl,//图片前缀
				cateList:[],//导航列表
				current:0,
				navList:['热门推荐','发现好货','只看专场'],//导航列表
				indexId:0,//下标
				goodsList:[],//商品列表
				keywords:'',//搜索词
				hour:'',//小时
				minute:'',//分钟
				second :''//秒
			}
		},
		async onLoad(){
			// 获取轮播图列表
			let banner=await getBanner();
			this.bannerList=banner.data.list;
			// 倒计时
			this.countdown()
			// 一级分类信息，导航
			let cate=await getCate()
			this.cateList=cate.data.list;
			// 获取商品信息
			let info=await getindexgoods();
			this.goodsList=info.data.list[0].content
			// console.log(seckill)
		},
		computed:{},
		methods:{
			// 倒计时
			async countdown(){
				// 获取秒杀信息
				let seckill=await getSeckill();
				let timer=setInterval(()=>{
					// 开始时间
					let begintime=new Date().getTime();
					// 结束时间
					let endtime=seckill.data.list[0].endtime
					// console.log(begintime,endtime)
					// 倒计时时间
					let errandtime=parseInt((endtime-begintime)/1000)
					// 时
					let hour=Math.floor(errandtime/3600)
					// 分
					let minute=Math.floor(errandtime%3600/60)
					// 秒
					let second=Math.floor(errandtime%3600%60)
					hour=hour<10?'0'+hour:hour
					minute=minute<10?'0'+minute:minute
					second=second<10?'0'+second:second
					// console.log(this.hour,this.minute)
					if(hour=='00'&&minute=='00'&&second=='00'){
						clearInterval(timer)
					}
					this.hour=hour
					this.minute=minute
					this.second=second
				},1000)
			},
			// 点击跳转到商品列表页
			toCateGoods(e){
				// 获取分类id
				let {current}=e.currentTarget.dataset
				this.current=current
				// 跳转页面
				uni.navigateTo({
					url:'/pages/product/product?id='+this.current
				})
			},
			// tab页跳转
			async toTab(e){
				// 获取下标
				let index=e.currentTarget.id
				this.indexId=index
				// 获取商品信息
				let goods=await getindexgoods()
				this.goodsList=goods.data.list[index].content
				// console.log(this.goodsList)
			},
			// 跳转到分类列表
			tocate(){
				uni.navigateTo({
					url:'/pages/classify/classify'
				})
			},
			// 根据搜索词搜索商品
			dosearch(){
				uni.navigateTo({
					url:'/pages/search/search?keywords='+this.keywords
				})
				this.keywords=''
			},
			// 跳转到详情页
			todetail(e){
				//获取商品id
				let id=e.currentTarget.id
				// 页面跳转
				uni.navigateTo({
					url:'/pages/details/details?id='+id
				})
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
