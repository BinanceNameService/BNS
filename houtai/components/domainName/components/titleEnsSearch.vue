<template>
    <div class="title_ens_search">
        <!-- 已注册弹窗 -->
        <registered
            v-if="openLinkShowFlag"
            :openLinkShowFlag="openLinkShowFlag"
            :text="searchText"
            @changeEnsText="changeEnsText"
        ></registered>
        <div class="title_content">
            <div class="pc_top_search">
                <div class="logo_img_input">
                    <img
                        style="margin-left: 9rem"
                        slot="prefix"
                        :src="logominiPng"
                        alt=""
                        @click="goMain"
                    >
                    <img
                        style="margin-left: 1rem; margin-bottom: 5px;"
                        slot="prefix"
                        :src="cutJpg"
                        alt=""
                    >
                </div>
                <el-input
                    class="input_search"
                    :placeholder="i18n.placeholder_title"
                    v-model="searchText"
                    @input="searchTextChange"
                >

                    <img
                        slot="prefix"
                        :src="searchPng"
                        alt=""
                    >
                    <el-select
                        class="select_lang"
                        v-model="select"
                        slot="suffix"
                        placeholder=""
                        @change="selectLanageChange"
                    >
                        <el-option
                            v-for="item in lanageListOpts"
                            :key="item.value"
                            :label="item.value"
                            :value="item.label"
                        >
                            <el-radio
                                v-model="selectRadio"
                                :label="item.label"
                            > </el-radio>
                        </el-option>

                    </el-select>

                    <span slot="append">
                        <el-button
                            @click="searchEns"
                            :loading="searchEnsLoading"
                        >{{i18n.search_title}}</el-button>
                    </span>
                </el-input>
            </div>

            <div class="mb_top_search">
                <p class="mb_logo_more">
                    <img
                        class="img_logo"
                        slot="prefix"
                        :src="mbLogominiPng"
                        alt=""
                        @click="goMain"
                    >
                    <img
                        v-if="!moreCloseShowFlag"
                        class="img_more"
                        slot="prefix"
                        :src="morePng"
                        @click="moreCloseChange(true)"
                        alt=""
                    >
                    <img
                        v-if="moreCloseShowFlag"
                        class="img_close"
                        slot="prefix"
                        :src="closePng"
                        @click="moreCloseChange(false)"
                        alt=""
                    >
                </p>
                <div
                    class="show_more_list"
                    v-if="moreCloseShowFlag"
                >
                    <div class="connect_wallet_link">
                        <div
                            class="wallet_link_content"
                            v-if="selectedAccount"
                        >
                            <div class="content_left">
                                <el-avatar
                                    class="content_left_img"
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                                ></el-avatar>
                                <div class="left_right_text">
                                    <p class="wallet_text">
                                        {{(selectedAccount && selectedAccount.length > 8) ? (selectedAccount.slice(0,4) + '...' + selectedAccount.slice(-4)) : selectedAccount}}
                                    </p>
                                    <li>{{i18n.main_net}}</li>
                                </div>
                            </div>
                            <div class="content_right">
                                <el-button
                                    class="connect_wallet_btn"
                                    @click="disconnectWallet"
                                >{{i18n.connected}}</el-button>
                            </div>
                        </div>
                        <div
                            class="wallet_link_uncontent"
                            v-if="!selectedAccount"
                        >
                            <div class="unconnect_left">{{i18n.connectwallet}}</div>
                            <div class="uncontent_right">
                                <el-button
                                    class="connect_wallet_btn"
                                    @click="connectWallet"
                                >{{i18n.connect}}</el-button>
                            </div>

                        </div>
                    </div>

                    <div class="my_ens">
                        <p @click="myEnsBtn">
                            <img
                                :src="mbNamePng"
                                alt=""
                            >
                            <span>{{i18n.mydomain}}</span>
                        </p>
                    </div>
                    <div class="my_ens">
                        <p>
                            <img
                                :src="mbAboutPng"
                                alt=""
                            >
                            <span>{{i18n.contactus_left}}</span>
                        </p>
                    </div>
                </div>
                <p
                    class="input_search"
                    v-if="!moreCloseShowFlag"
                >
                    <el-form action="javascript:return true">
                        <el-input
                            :placeholder="i18n.placeholder_title"
                            v-model="searchText"
                            type="search"
                            @input="searchTextChange"
                            @keyup.13.native="searchEns"
                        >
                            <img
                                style="margin-top: 1.2rem; height: 1.5rem"
                                slot="prefix"
                                :src="mbSearchPng"
                                alt=""
                            >
                            <el-select
                                class="select_lang"
                                v-model="select"
                                slot="suffix"
                                placeholder=""
                                @change="selectLanageChange"
                            >
                                <el-option
                                    v-for="item in lanageListOpts"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.label"
                                >
                                    <el-radio
                                        v-model="selectRadio"
                                        :label="item.label"
                                    > </el-radio>
                                </el-option>

                            </el-select>
                        </el-input>
                    </el-form>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import cutJpg from 'img/cut.jpg';
import searchPng from 'img/搜索.png';
import mbSearchPng from 'img/imgmb/搜索.png';
import morePng from 'img/imgmb/更多.png';
import closePng from 'img/imgmb/关闭.png';
import logominiPng from 'img/701651807815_.png';
import mbLogominiPng from 'img/imgmb/701651807815_.png';
import aboutPng from 'img/关于我们.png';
import mbAboutPng from 'img/imgmb/关于我们.png';
import namePng from 'img/域名.png';
import mbNamePng from 'img/imgmb/域名.png';
import connectWallet from './connectWallet.vue';
import registered from 'houtai/components/main/components/registered.vue';
import {
	onConnect,
	onDisconnect,
	getAccount,
	isExist,
	checkBrickbalance,
	checkAndLoadFromLast,
	checkEachLength,
	init,
} from 'houtai/web3_eth.js';
export default {
	components: { connectWallet, registered },
	data() {
		return {
			selectedAccount: '',
			aboutPng,
			mbAboutPng,
			namePng,
			mbNamePng,
			moreCloseShowFlag: false,
			isExist: null,
			openLinkShowFlag: false,
			searchEnsLoading: false,
			searchText: '',
			searchPng,
			mbSearchPng,
			cutJpg,
			logominiPng,
			mbLogominiPng,
			morePng,
			closePng,
			select: this.$store.state.language,
			selectRadio: this.$store.state.languageSelect,
			lanageListOpts: [
				{
					label: 'English (EN)',
					value: 'EN',
				},
				{
					label: '简体中文 (CN)',
					value: 'CN',
				},
				// {
				// 	label: '日本语 (JA)',
				// 	value: 'JA',
				// },
			],
		};
	},
	watch: {
		searchText(newValue, oldValue) {
			console.log(newValue);
			this.searchText = newValue.replace('-', '');
			// this.searchText = this.searchText.replace(
			// 	/[`:_.~!｜」』『「@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~～！@#￥¥%……&*（）—— \+ ={}|《》<>？：“”【】、；‘’，。、]/g,
			// 	'',
			// );
			this.searchText = this.searchText.replace(
				/[`:_.~!｜［｛｝〉×〉×［］〖〗＊〔〕‖〈〉«»«»×÷＞＜≥≤¡¿£€﹉–´´＂＇¢฿♀♂‹›」』『「@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~～！@#￥¥%……&*（）—— \+ ={}|《》<>？：“”【】、；‘’，。、]/g,
				'',
			);
			this.searchText = this.searchText.toLowerCase();
		},
	},
	mounted() {
		window.addEventListener('load', async () => {
			init();
			if (localStorage.getItem('STATUS')) {
				await this.connectWallet();
			}
		});
		window.addEventListener('beforeunload', (e) => {
			localStorage.setItem('STATUS', '');
		});
		this.$nextTick(async () => {
			this.selectedAccount = localStorage.getItem('STATUS')
				? localStorage.getItem('STATUS')
				: this.selectedAccount;
		});
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},
	methods: {
		searchTextChange() {
			console.log('域名发生变化');
			this.isExist = null;
			this.searchEnsLoading = false;
		},
		selectLanageChange(val) {
			if (val === 'English (EN)') {
				this.$store.commit('showENLanage');
			} else if (val === '简体中文 (CN)') {
				this.$store.commit('showCNLanage');
			}
			console.log('this.i18n', this.i18n);
		},
		goMain() {
			this.$router.push({
				path: '/main',
			});
		},
		myEnsBtn() {
			this.$router.push({
				path: '/my/enslist',
			});
		},
		async connectWallet() {
			await onConnect(this);
			let account = getAccount();
			this.selectedAccount = account || '';
			localStorage.setItem('STATUS', this.selectedAccount);
			if (
				this.$router.history.current.path ===
				'/my/enslist'
			) {
				console.log('/my/enslist');
				this.$parent.searchEnsList();
			}
			if (
				this.$router.history.current.path ===
				'/registration/request'
			) {
				this.$parent.inIt();
			}
		},
		async disconnectWallet() {
			onDisconnect();
			this.selectedAccount = '';
			localStorage.setItem('STATUS', this.selectedAccount);
			if (
				this.$router.history.current.path ===
				'/my/enslist'
			) {
				console.log('/my/enslist');
				this.$parent.searchEnsList();
			}
		},
		//点击更多图标
		moreCloseChange(flag) {
			this.moreCloseShowFlag = flag;
		},
		forSubmit() {
			console.log('111111');
			return false;
		},
		//查询
		async searchEns() {
			console.log('12333');
			//  document.activeElement.blur();  // 关闭软键盘
			if (!this.searchText) {
				// alert('请输入查询的域名');
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].enter_names,
				);
				return;
			}
			if (this.searchText.length < 3) {
				// alert('请至少输入三个字符');
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].text_1,
				);
				return;
			}
			//查询当前页面的域名时 直接清空 不进行查询（用于注册页 & 详情页）
			if (this.searchText === this.$route.query.text) {
				this.searchText = '';
				return;
			}

			this.searchEnsLoading = true;
			let text = this.searchText.toLowerCase() + '.bsc';
			this.isExist = await isExist(text);
			if (!(await checkEachLength(this.searchText))) {
				return;
			}
			console.log('this.isExist----', this.isExist);
			if (this.isExist) {
				this.openLinkBtn(true);
			} else if (!this.isExist && this.isExist !== null) {
				// this.searchText = this.searchText + '.bsc';
				console.log('this.$router', this.$router);
				//注册页 刷新后处理默认值 （目的：防止刷新界面 需要重新链接钱包）
				if (
					this.$router.history.current.path ===
					'/registration/request'
				) {
					this.$parent.changeText(
						this.searchText,
					);
				}
				this.$router.push({
					path: '/registration/request',
					query: {
						text: this.searchText,
					},
				});
			}
			if (this.isExist || !this.isExist) {
				this.searchEnsLoading = false;
			}
		},
		openLinkBtn(flag) {
			this.openLinkShowFlag = flag;
		},
		changeEnsText(text) {
			//详情页
			if (
				this.$router.history.current.path ===
				'/registration/info'
			) {
				this.$parent.changeEnsText(this.searchText);
			}
			// this.$parent.changeEnsText(text);
		},
	},
};
</script>

<style lang="less" scoped>
.title_ens_search {
	.title_content {
		.pc_top_search {
			display: block;
			/deep/.el-input-group__prepend {
				background-color: #ffffff;
				border: 0;
			}
			/deep/.el-input-group__append {
				border-left: 0;
				width: 6rem;
				text-align: center;
				background: #a63928;
				color: #ffffff;
			}
			/deep/.el-input-group__append:hover {
				border-left: 0;
				width: 6rem;
				text-align: center;
				background: #a63928;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: #ffffff;
			}
			.logo_img_input {
				float: left;
				width: 15rem;
				background: #ffffff;
				height: 6rem;
				line-height: 6rem;
				img {
					line-height: 7rem;
					vertical-align: middle;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
					height: 2.5rem;
				}
			}
			.input_search {
				width: calc(100vw - 15rem);
				/deep/.el-input-group__append button.el-button {
					font-size: 1rem;
					border-left: 0;
					width: 9rem;
					height: 6rem;
					text-align: center;
					background: #a63928;
					border-radius: 4px;
					color: #ffffff;
				}
				//  .el-button .el-button--default
				/deep/.el-input-group__append
					button.el-button.is-disabled {
					border-left: 0;
					width: 9rem;
					height: 6rem;
					opacity: 0.3;
					// font-size: 1.1rem;
					text-align: center;
					background: #a63928;
					border-radius: 4px;
					color: #ffffff;
				}
				/deep/.el-input__prefix {
					left: 5px;
					transition: all 0.3s;
					/* margin: 0 auto; */
					line-height: 7.1rem;
				}

				/deep/.el-input__inner {
					height: 6rem !important;
					line-height: 6rem !important;
					background: #ffffff;
					border: 0;
					border-radius: 0;
					// border-top-left-radius: 8px;
					// border-bottom-left-radius: 8px;
					padding-left: 5rem !important;
					font-size: 1.1rem;
					color: #333333;
				}

				/deep/.el-input__suffix .el-input__inner {
					right: 5px;
					transition: all 0.3s;
					padding: 0;
					margin: 0;
					color: #999999 !important;
					font-weight: 500 !important;
					font-family: PingFangSC-Medium !important;
				}
			}

			.select_lang {
				/deep/.el-input__inner {
					background: #ffffff;
					padding: 0 !important;
					margin: 0 !important;
					font-size: 1.1rem;
					width: 4rem;
					color: #666666;
				}

				/deep/.el-icon-arrow-up:before {
					content: '';
				}
				/deep/.el-icon-arrow-up:after {
					content: '';
				}
			}

			/deep/ .el-select__caret {
				transform: rotateZ(0deg);
				background: url('img/箭头1.png') center center
					no-repeat;
			}
			/deep/.el-select
				.el-input
				.el-select__caret.is-reverse {
				background: url('img/箭头2.png') center center
					no-repeat;
			}
		}
		.mb_top_search {
			display: none;
		}
	}
	@media only screen and (max-width: 768px) {
		.title_content {
			.pc_top_search {
				display: none;
			}
			.mb_top_search {
				display: block;
				background-color: #ffffff;
				position: absolute;
				z-index: 10;
				width: 100%;
				font-family: PingFangSC-Regular;
				.mb_logo_more {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					height: 3rem;
					line-height: 3rem;
					padding: 1.1rem 1rem 0.5rem 2rem;
					margin: 0;
					.img_logo {
						// padding-left: 1rem;
						height: 100%;
					}
					.img_more {
						height: 1.5rem;
						margin-top: 0.5rem;
					}
					.img_close {
						height: 1.2rem;
						margin-top: 0.5rem;
					}
					img {
						inline-size: middle;
					}
				}
				.show_more_list {
					margin: 0 1.7rem;
					.connect_wallet_link {
						border-bottom: 1px solid #ededed;
						// margin-left: 1.5rem;
						.wallet_link_content {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							height: 5rem;
							line-height: 5rem;
							padding-bottom: 0.5rem;
							.content_left {
								display: flex;
								flex-direction: row;
								// justify-content: space-between;
								.content_left_img {
									height: 3rem;
									width: 3rem;
									margin-top: 1.2rem;
									margin-right: 1rem;
									vertical-align: middle;
								}
								.left_right_text {
									height: 1.5rem;
									line-height: 1.5rem;
									// .wallet_text {
									// 	margin-bottom: 5px;
									// }
									p {
										margin-bottom: 9px;
									}
									li {
										margin-bottom: 9px;
										font-size: 0.89rem;
										color: #999999;
									}
									.wallet_text {
										color: #666666;
										font-size: 1rem;
									}
									.connect_wallet_text {
										color: #000000 !important;
									}
								}
							}
							.content_right {
								padding-top: 3px;
								.connect_wallet_btn {
									height: 3rem;
									line-height: 3rem;
									font-size: 1rem;
									background: #ffffff;
									padding: 0
										1rem;
									border: 1px
										solid
										#a63928;
									color: #a63928;
									border-radius: 6px;
								}
							}
						}
						.wallet_link_uncontent {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							height: 5rem;
							// line-height: 5rem;
							padding-bottom: 0.5rem;
							.unconnect_left {
								color: #666666;
								font-size: 1.2rem;
								margin-left: 1rem;
								display: flex;
								justify-content: center;
								align-items: center;
							}
							.uncontent_right {
								padding-top: 3px;
								display: flex;
								justify-content: center;
								align-items: center;
								.connect_wallet_btn {
									height: 3rem;
									line-height: 3rem;
									font-size: 1rem;
									background: #ffffff;
									padding: 0
										2rem;
									border: 1px
										solid
										#a63928;
									color: #a63928;
									border-radius: 6px;
								}
							}
						}
					}
					.my_ens {
						color: #a63928;
						height: 4rem;
						line-height: 4rem;
						border-bottom: 1px solid #ededed;
						img {
							margin: 0 1rem;
							vertical-align: middle;
							margin-bottom: 0.3rem;
							height: 1.5rem;
							width: 1.5rem;
						}
						p {
							margin: 0;
						}
						span {
							font-size: 1.2rem;
						}
					}
					// .about_us {
					// 	color: #a63928;
					// 	img {
					// 		margin-right: 1rem;
					// 	}
					// }
				}

				/deep/.el-input-group__prepend {
					background-color: #ffffff;
					border: 0;
				}
				/deep/.el-input-group__append {
					border-left: 0;
					width: 6rem;
					text-align: center;
					background: #a63928;
					color: #ffffff;
				}
				/deep/.el-input-group__append:hover {
					border-left: 0;
					width: 6rem;
					text-align: center;
					background: #a63928;
					font-family: PingFangSC-Semibold;
					font-weight: 600;
					color: #ffffff;
				}
				.input_search {
					margin: 0;
					margin-left: 2rem;
					/deep/.el-input__prefix {
						left: 0px;
						transition: all 0.3s;
						// line-height: 3.1rem;
					}

					/deep/.el-input__inner {
						height: 4rem !important;
						line-height: 4rem !important;
						background: #ffffff;
						border: 0;
						padding-left: 2.5rem !important;
						font-size: 1.1rem;
						color: #333333;
					}
				}

				.select_lang {
					/deep/.el-input__inner {
						background: #ffffff;
						padding: 0 !important;
						margin: 0 !important;
						font-size: 1.1rem;
						width: 4rem;
						// color: #666666;
						color: #999999;
					}

					/deep/.el-icon-arrow-up:before {
						content: '';
					}
					/deep/.el-icon-arrow-up:after {
						content: '';
					}
					// .el-select {
					// 	-webkit-tap-highlight-color: #ffffff !important;
					// }
				}

				/deep/ .el-select__caret {
					transform: rotateZ(0deg);
					background: url('img/箭头1.png') center
						center no-repeat;
				}
				/deep/.el-select
					.el-input
					.el-select__caret.is-reverse {
					background: url('img/箭头2.png') center
						center no-repeat;
				}
			}
		}
	}
}
</style>