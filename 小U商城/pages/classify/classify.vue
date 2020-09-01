<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="current==index?'activeList':''" v-for="(item,index) in cateList" :key='id' :id="index" @click="toTab" >
				<label for="">{{item.catename}}</label>
			</view>
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="(item,index) in cateList[current].children">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="imgUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {getCates} from '../../utils/request.js'
	export default{
		data(){
			return{
				cateList:[],//商品分类列表
				imgUrl:this.imgUrl,//图片前缀
				current:0
			}
		},
		async onLoad(){
			let cates=await getCates();
			this.cateList=cates.data.list
			// console.log(cates)
		},
		methods:{
			// 点击切换
			toTab(e){
				// console.log(e)
				this.current=e.currentTarget.id
			}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
