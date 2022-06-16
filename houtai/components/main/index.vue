<template>
    <div class="pc_main">
        <div
            class="bg_img"
            :style="{height: bodyHeight+ 'px'}"
        >
            <connectWallet></connectWallet>
            <registered
                v-if="openLinkShowFlag"
                :openLinkShowFlag="openLinkShowFlag"
                :text="searchText"
            ></registered>
            <div class="index_title_logo_search">
                <div class="title_text">
                    <div class="bg_title_img">
                        <p class="bg_title_text">
                            <span class="web-font">{{i18n.title_top}}</span>
                            <br>
                            <span class="web-font">{{i18n.title_bottom}}</span>
                        </p>
                    </div>
                    <p class="web-font">
                        {{i18n.title}}
                    </p>
                </div>
                <div class="img_center">
                    <img
                        :src="logoPng"
                        alt=""
                    >
                </div>
                <div class="bottom_search">
                    <el-input
                        class="input_search"
                        style="color:#000000;"
                        :placeholder="i18n.placeholder"
                        v-model="searchText"
                        :minlength="3"
                        @input="searchTextChange"
                        @keydown.native="btKeyDown"
                    >
                        <img
                            class="search_png"
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
                                v-if="isExist == null"
                                @click="searchEns"
                                :loading="searchEnsLoading"
                                :disabled="searchText.length < 3"
                            >{{i18n.search}}</el-button>
                            <el-button
                                v-if="isExist!=null && !isExist"
                                @click="goRegisterPage"
                            >{{i18n.register}}</el-button>
                            <el-button
                                v-if="isExist!=null && isExist"
                                @click="goRegisterDetailPage"
                            >{{i18n.details}}</el-button>
                        </span>
                    </el-input>

                    <div class="mb_footer_btn">
                        <el-button
                            v-if="isExist == null"
                            @click="searchEns"
                            :loading="searchEnsLoading"
                            :disabled="searchText.length < 3"
                        >{{i18n.search}}</el-button>
                        <el-button
                            v-if="isExist!=null && !isExist"
                            @click="goRegisterPage"
                        >{{i18n.register}}</el-button>
                        <el-button
                            v-if="isExist!=null && isExist"
                            @click="goRegisterDetailPage"
                        >{{i18n.details}}</el-button>
                    </div>
                    <p
                        style="color: #a63928; text-align:center"
                        class="mb_text_action"
                    >
                        <span
                            v-if="isExist!=null && !isExist"
                            @click="goRegisterPage"
                            style="border-bottom: 1px solid #a63928"
                        >
                            "{{searchText}}" {{i18n.text_2}}
                        </span>
                        <span
                            v-if="isExist!=null && isExist"
                            @click="goRegisterDetailPage"
                            style="border-bottom: 1px solid #a63928"
                        >
                            "{{searchText}}" {{i18n.text_3}}
                        </span>
                        <span v-if="searchText && searchText.length < 3">
                            {{i18n.text_1}}
                        </span>
                        <span v-else></span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import logoPng from 'img/logo.png';
import searchPng from 'img/搜索.png';
import arrow1Png from 'img/箭头1.png';
import indexTitlePng from 'img/imgmb/bg5_title.png';
import registered from './components/registered.vue';
import connectWallet from './components/connectWallet.vue';
import titlePng from 'img/imgmb/bg4_title.png';
import { isExist, buyWithEth, checkEachLength } from 'houtai/web3_eth.js';
export default {
	components: { connectWallet, registered },
	data() {
		return {
			bodyHeight: '',
			textShow: {},
			isExist: null,
			searchEnsLoading: false,
			searchText: '',
			openLinkShowFlag: false,
			logoPng,
			searchPng,
			arrow1Png,
			titlePng,
			indexTitlePng,
			// select: 'CN',
			// selectRadio: '简体中文 (CN)',
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
			this.searchText = this.searchText.replace(
				/[`:_.~!｜［｛｝〉×〉×［］〖〗＊〔〕‖〈〉«»«»×÷＞＜≥≤¡¿£€﹉–´´＂＇¢฿♀♂‹›」』『「@#$%^&*() \+ =<>?"{}|, \/ ;' \\ [ \] ·~～！@#￥¥%……&*（）—— \+ ={}|《》<>？：“”【】、；‘’，。、]/g,
				'',
			);
			this.searchText = this.searchText.toLowerCase();
			// this.searchText = this.searchText.replace(
			// 	/[^u4e00-u9fa5w]/g,
			// 	'',
			// );
			// this.searchText = this.searchText.replace(
			// 	/[,.!\u3002\uff0c]/g,
			// 	'',
			// );
		},
	},
	mounted() {
		this.bodyHeight =
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		console.log('this.i18n', this.i18n);
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},

	methods: {
		selectLanageChange(val) {
			if (val === 'English (EN)') {
				this.$store.commit('showENLanage');
			} else if (val === '简体中文 (CN)') {
				this.$store.commit('showCNLanage');
			}
			console.log('this.i18n', this.i18n);
		},
		btKeyDown(e) {
			// console.log('e', e);
			// e.target.value = e.target.value.replace(
			// 	/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g,
			// 	'',
			// );
		},
		// 跳转注册详情
		goRegisterDetailPage() {
			if (!this.searchText) {
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].enter_names,
				);
				return;
			}

			// this.searchText = this.searchText + '.bsc';

			this.$router.push({
				path: 'registration/info',
				query: {
					text: this.searchText
						? this.searchText
						: undefined,
				},
			});
		},

		// 跳转注册
		goRegisterPage() {
			if (!this.searchText) {
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].enter_names,
				);
				return;
			}
			// this.searchText = this.searchText + '.bsc';
			this.$router.push({
				path: 'registration/request',
				query: {
					text: this.searchText
						? this.searchText
						: undefined,
				},
			});
		},

		searchTextChange() {
			this.isExist = null;
			this.searchEnsLoading = false;
		},
		//查询
		async searchEns() {
			if (!this.searchText) {
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].enter_names,
				);
				return;
			}
			this.searchEnsLoading = true;
			let text = this.searchText.toLowerCase() + '.bsc';
			this.isExist = await isExist(text);
			console.log('flag', this.isExist);
			if (this.isExist === null) {
				//钱包未连接 停掉loading
				this.searchEnsLoading = false;
			}

			if (this.isExist) {
				this.openLinkBtn(true);
			}
			if (!(await checkEachLength(this.searchText))) {
				return;
			}
			if (this.isExist || !this.isExist) {
				this.searchEnsLoading = false;
			}
		},
		openLinkBtn(flag) {
			this.openLinkShowFlag = flag;
		},
	},
};
</script>

<style lang="less" scoped>
.pc_main {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img {
		width: 100%;
		// height: 100%;
		background: url('img/bg.png');
		background-size: 100% 100%;
		position: absolute;
		.right_text {
			position: fixed;
			float: right;
			width: 9rem;
			right: 4rem;
			top: 6rem;
			span {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 0.9rem;
				margin-right: 4px;
				height: 2rem;
				line-height: 2rem;
			}
		}
		.index_title_logo_search {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			text-align: center;
			height: 75%;
			margin-top: 0.7rem;
			.title_text {
				// position: fixed;
				// top: 20%;
				// left: 37%;
				height: 20%;
				.bg_title_img {
					display: none;
				}
				p {
					margin-top: 0px;
					font-family: Alibaba-PuHuiTi-M;
					font-weight: M;
					font-size: 1.3rem;
					color: #eedfbd;
					// color: red;
				}
			}

			.img_center {
				height: 50%;
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
				img {
					display: inline-block;
					vertical-align: middle;
					// height: 10rem;
				}
				// width: 100%;
				// img {
				// 	display: inline-block;
				// 	vertical-align: middle;
				// }
			}

			.bottom_search {
				width: 74%;
				// height: 10rem;
				height: 30%;
				margin: 0 auto;
				padding-top: 3rem;
				// display: flex;
				// justify-content: center;
				// align-items: center;
				/deep/.el-input-group__append {
					// border-left: 0;
					// width: 6rem;
					// text-align: center;
					// // opacity: 0.3;
					// background: #a63928;
					// border-radius: 4px;
					// color: #ffffff;
				}
				// /deep/.el-input-group__append:hover {
				// 	border-left: 0;
				// 	width: 6rem;
				// 	text-align: center;
				// 	opacity: 0.3;
				// 	background: #a63928;
				// 	border-radius: 4px;
				// 	font-family: PingFangSC-Semibold;
				// 	font-weight: 600;
				// 	// font-size: 1.2rem;
				// 	color: #ffffff;
				// }

				.input_search {
					/deep/.el-input-group__append
						button.el-button {
						border-left: 0;
						width: 9rem;
						height: 6rem;
						text-align: center;
						background: #a63928;
						border-radius: 4px;
						color: #ffffff;
						font-size: 1rem;
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
						left: 35px;
						transition: all 0.3s;
						/* margin: 0 auto; */
						line-height: 7.1rem;
					}

					/deep/.el-input__inner {
						height: 6rem !important;
						line-height: 6rem !important;
						background: #ffffff;
						border: 0;
						border-top-left-radius: 8px;
						border-bottom-left-radius: 8px;
						padding-left: 5rem !important;
						font-size: 1.1rem;
						color: #333333;
					}

					/deep/.el-input__suffix
						.el-input__inner {
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
					background: url('img/箭头1.png') center
						center no-repeat;
				}
				/deep/.el-select
					.el-input
					.el-select__caret.is-reverse {
					background: url('img/箭头2.png') center
						center no-repeat;
				}
				.mb_footer_btn {
					display: none;
				}
			}
		}
	}

	@media only screen and (max-width: 768px) {
		.bg_img {
			background: url('img/imgmb/bg5.png');
			background-size: 100% 100%;
			.right_text {
				position: fixed;
				float: right;
				width: 7rem;
				right: 2rem;
				top: 2rem;
				font-size: 1.7rem;
				color: #997836;
				span {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					margin-right: 4px;
					height: 2rem !important;
					line-height: 2rem !important;
				}
			}
			.index_title_logo_search {
				height: 80%;
				display: flex;
				flex-direction: column;
				margin: 0;
				text-align: center;
				.title_text {
					text-align: center;
					width: 100%;
					height: 7rem;
					margin-bottom: 2rem;
					// margin-top: 0rem;
					// margin-left: 15%;
					p {
						display: none;
					}
					.bg_title_img {
						display: block;
						background: url('img/imgmb/bg5_title.png');
						background-size: 100% 100%;
						width: 88%;
						margin-left: 6%;
						height: 7rem;
						.bg_title_text {
							display: block;
							position: absolute;
							font-size: 1rem;
							width: 70%;
							margin-left: 10%;
							margin-top: 2rem;
							font-family: Alibaba-PuHuiTi-M;
							font-weight: M;
							color: #eedfbd;
						}
						img {
							width: 100%;
							height: 5rem;
						}
					}
				}
				.img_center {
					flex: 1;
					display: flex;
					justify-content: center;
					align-items: center;
					img {
						display: inline-block;
						vertical-align: middle;
						height: 10rem;
						margin-left: 2rem;
					}
				}
				.bottom_search {
					// width: 76%;
					width: 82%;
					height: 45%;
					// margin: 0 auto;
					display: flex;
					flex-direction: column;
					/deep/.el-input-group__append {
						display: none;
					}

					.input_search {
						/deep/.el-input-group__append
							button.el-button {
							border-left: 0;
							width: 0rem;
							height: 0rem;
							text-align: center;
							background: #a63928;
							border-radius: 4px;
							color: #ffffff;
							display: none;
						}
						/deep/.el-input-group__append
							button.el-button.is-disabled {
							border-left: 0;
							width: 0rem;
							height: 0rem;
							opacity: 0.3;
							text-align: center;
							background: #a63928;
							border-radius: 4px;
							color: #ffffff;
							display: none;
						}
						/deep/.el-input__prefix {
							// left: 15px;
							left: 8px;
							transition: all 0.3s;
							// line-height: 4.9rem;
							line-height: 4.8rem;
						}

						/deep/.el-input__inner {
							height: 4rem !important;
							line-height: 4rem !important;
							border-radius: 8px;
							// padding-left: 3rem !important;
							// font-size: 1.1rem;
							padding-left: 2.2rem !important;
							font-size: 1.1rem;
						}

						/deep/.el-input__suffix
							.el-input__inner {
							// right: 5px;
							right: 1px;
							transition: all 0.3s;
							padding: 0;
							margin: 0;
							color: #999999 !important;
							font-weight: 500 !important;
							font-family: PingFangSC-Medium !important;
						}
						/deep/.el-input__suffix {
							// right: 5px;
							right: 1px;
						}
						.search_png {
							// height: 1.5rem;
							height: 1.4rem;
						}
						.mb_text_action {
							margin-top: 6px;
						}
					}
					.select_lang {
						/deep/.el-input__inner {
							background: #ffffff;
							padding: 0 !important;
							margin: 0 !important;
							font-size: 1.1rem;
							// width: 4rem;
							width: 3.5rem;
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
						background: url('img/箭头1.png')
							center center no-repeat;
					}
					/deep/.el-select
						.el-input
						.el-select__caret.is-reverse {
						background: url('img/箭头2.png')
							center center no-repeat;
					}

					.mb_footer_btn {
						display: block;
						margin-top: 20px;
						width: 100%;
						/deep/.el-button--default {
							border: 1.55px solid
								#b42e1d;
							border-radius: 154.84px;
							width: 100%;
							// padding: 0 7rem;
							height: 4rem;
							background: #b42e1d;
							border-radius: 43.5px;
							font-family: PingFangSC-Semibold;
							font-weight: 600;
							font-size: 1.4rem;
							color: #ffffff;
							text-align: center;
						}
						/deep/.el-button--default.is-disabled {
							opacity: 0.2 !important;
						}
					}
				}
			}
		}
	}
}
</style>