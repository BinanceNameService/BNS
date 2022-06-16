<template>
    <div class="pc_ens_list">
        <div
            class="bg_img"
            :style="{height: bodyHeight+ 'px'}"
        >
            <titleEnsSearch @searchEnsList="searchEnsList"></titleEnsSearch>
            <connectWallet @searchEnsList="searchEnsList"></connectWallet>
            <div class="ens_name_list">
                <div style="height:100%">
                    <div class="right_content">
                        <div class="title_name">
                            <el-avatar
                                class="title_name_img"
                                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                            ></el-avatar>
                            <div class="title_name_text">{{selectedAccount}}</div>
                        </div>
                        <div
                            class="list_tab_content"
                            :style="{ 'padding-bottom': (!myEnsNameList || myEnsNameList.length == 0) ? '32px' : 0 } "
                        >
                            <span class="list_tab">{{i18n.validity_period}}</span>
                        </div>
                        <div class="ens_list">
                            <div
                                v-for="(item, index) in myEnsNameList"
                                :label="item.ensName"
                                :key="index"
                            >
                                <div class="ens_name_time">
                                    <span class="ens_name">{{item.ensName}}</span>
                                    <span class="ens_time">{{i18n.expiry_time}}{{item.endTime}}</span>
                                </div>
                            </div>
                            <div
                                v-if="!myEnsNameList || myEnsNameList.length == 0"
                                style="text-align:center; padding-bottom:20px;"
                            >{{i18n.no_data}}</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cutJpg from 'img/cut.jpg';
import searchPng from 'img/搜索.png';
import miniPng from 'img/701651807815_.png';
import connectWallet from './components/connectWallet.vue';
import titleEnsSearch from './components/titleEnsSearch.vue';
import { getAllNodes } from 'houtai/web3_eth.js';
export default {
	components: { connectWallet, titleEnsSearch },
	data() {
		return {
			selectedAccount: '',
			bodyHeight: '',
			myEnsNameList: [
				// {
				// 	ensName: 'benxiong.brick',
				// 	endTime: '到期时间：2023.05.05',
				// },
				// {
				// 	ensName: 'benxiong.brick',
				// 	endTime: '到期时间：2023.05.05',
				// },
				// {
				// 	ensName: 'benxiong.brick',
				// 	endTime: '到期时间：2023.05.05',
				// },
				// {
				// 	ensName: 'benxiong.brick',
				// 	endTime: '到期时间：2023.05.05',
				// },
			],
			fontColor: 'blue',
			approveBtnDisabled: false,
			approveBtnLoading: false,
			registBtnDisabled: false,
			registBtnLoading: false,
			years: 32,
			price: 10000,
			currencyUnit: 'BRICK',
			searchText: '',
			searchPng,
			cutJpg,
			miniPng,
		};
	},
	mounted() {
		this.bodyHeight =
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		this.searchEnsList();
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},
	methods: {
		// 钱包链接成功 查询
		searchEnsList() {
			this.selectedAccount = localStorage.getItem('STATUS')
				? localStorage.getItem('STATUS')
				: '';
			console.log(
				'this.selectedAccount',
				this.selectedAccount,
			);
			//钱包已连接 查询
			if (this.selectedAccount) {
				this.getAllNodesClick();
			}
		},

		async getAllNodesClick() {
			this.myEnsNameList = await getAllNodes();
			console.log('myEnsNameList', this.myEnsNameList);
		},
	},
};
</script>

<style lang="less" scoped>
.pc_ens_list {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img {
		width: 100%;
		// height: 100%;
		background: url('img/bg3.png');
		background-size: 100% 100%;
		position: absolute;
		.ens_name_list {
			width: 70%;
			margin: 4rem 7% 0 23%;
			height: 70%;
			overflow: scroll;
			.right_content {
				height: 90%;
				overflow: scroll;
				position: relative;
				padding: 1rem 0 2rem 0;
				font-size: 1rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
				// width: 72vw;
				background: #ffffff;
				// box-shadow: 0 2px 20px 0
				// 	rgba(153, 119, 53, 0.29);
				border-radius: 8px;
				.title_name {
					height: 3rem;
					line-height: 3rem;
					margin-top: 0;
					padding-bottom: 15px;
					border-bottom: 1px solid #d8d8d8;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 1rem;
					display: flex;
					flex-direction: row;
					.title_name_img {
						vertical-align: middle;
						margin-left: 1rem;
					}
					.title_name_text {
						color: #333333;
						margin-left: 1rem;
					}
				}
				.list_tab_content {
					padding-top: 1rem;
					.list_tab {
						color: #a63928;
						border-bottom: 1px solid #b42e1d;
						padding: 1rem 1rem 0.5rem 1rem;
						margin-left: 1rem;
					}
				}
				.ens_list {
					padding: 1rem 1rem 0 1rem;
					.ens_name_time {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						border-bottom: 1px dashed
							#ededed;
						font-size: 1.2rem;
						color: #000000;
						height: 3rem;
						line-height: 3rem;
						.ens_name {
						}
						.ens_time {
							color: #999999;
						}
					}
				}
			}
		}
	}
	@media only screen and (max-width: 768px) {
		.bg_img {
			background: url('img/imgmb/bg4.png');
			background-size: 100% 100%;
			overflow: scroll;
			.ens_name_list {
				width: 80%;
				margin: 10%;
				margin-top: 9.5rem;
				height: 70%;
				overflow: scroll;
				.right_content {
					position: relative;
					padding: 1rem 0 2rem 0;
					font-size: 1rem;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: #000000;
					background: #ffffff;
					// box-shadow: 0 2px 20px 0
					// 	rgba(153, 119, 53, 0.29);
					border-radius: 8px;
					.title_name {
						height: 3rem;
						margin-top: 0rem;
						padding-bottom: 15px;
						border-bottom: 1px solid #d8d8d8;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						font-size: 1rem;
						display: flex;
						flex-direction: row;
						.title_name_img {
							vertical-align: middle;
							margin-left: 1rem;
						}
						.title_name_text {
							height: 4rem;
							line-height: 1.5rem;
							width: 70%;
							word-wrap: break-word;
							color: #333333;
							margin-left: 1rem;
						}
					}
					.list_tab_content {
						padding-top: 1rem;
						height: 2rem;
						.list_tab {
							color: #a63928;
							border-bottom: 1px solid
								#b42e1d;
							padding: 1rem 1rem
								0.5rem 1rem;
							margin-left: 1rem;
						}
					}
					.ens_list {
						padding: 0 1rem;
						// height: 100%;
						// max-height: 15rem;
						overflow: scroll;
						.ens_name_time {
							display: flex;
							flex-direction: column;
							border-bottom: 1px
								dashed #ededed;
							font-size: 1.2rem;
							color: #000000;
							height: 5rem;
							padding-bottom: 1rem;
							.ens_name {
								padding-top: 0.5rem;
							}
							.ens_time {
								font-size: 1rem;
								line-height: 1.2rem;
								color: #999999;
							}
						}
					}
				}
			}
		}
	}
}
</style>