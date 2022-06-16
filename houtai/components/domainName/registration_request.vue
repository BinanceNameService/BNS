<template>
    <div
        class="pc_registration_request"
        :key="searchText"
    >
        <registered
            v-if="openLinkShowFlag"
            :openLinkShowFlag="openLinkShowFlag"
        ></registered>
        <div
            class="bg_img"
            :style="{height: bodyHeight+ 'px'}"
        >
            <titleEnsSearch
                @changeText="changeText"
                @inIt="inIt"
            ></titleEnsSearch>
            <div class="title_text">
                <img
                    v-if="$store.state.language === 'CN'"
                    :src="titlePng"
                    alt=""
                >
                <img
                    v-if="$store.state.language === 'EN'"
                    :src="titleEnPng"
                    alt=""
                >
            </div>
            <connectWallet></connectWallet>
            <div class="domian_name_search">
                <div class="domian_name_content">
                    <p style="margin: 6px 0">{{i18n.bns}}</p>
                    <div class="right_content">
                        <p class="title_name">
                            <span class="title_name_left">{{searchText}}.bsc</span>
                            <span class="title_name_right">

                            </span>
                        </p>

                        <div class="number_content">
                            <div class="number_top_content">
                                <div class="reg_payment_left_select">
                                    <p class="payment_top">
                                        <el-select
                                            v-model="paymentMethod"
                                            :placeholder="i18n.payment_option"
                                            @change="paymentMethodChange"
                                        >
                                            <el-option
                                                v-for="item in paymentMethodOpts"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value"
                                            >
                                            </el-option>
                                        </el-select>
                                    </p>
                                    <span class="number_left_bottom">{{i18n.payment}}</span>

                                </div>
                                <div class="reg_number_left">
                                    <p class="number_left_top">
                                        <img
                                            :src="reducePng"
                                            alt=""
                                            @click="reduceCount"
                                            :disabled="years == 0"
                                        >
                                        <span>
                                            <span class="left_top_year">{{years}} </span>
                                            <span class="left_top_year_unit">{{i18n.years}}</span>
                                        </span>
                                        <img
                                            @click="addCount"
                                            :src="addPng"
                                            alt=""
                                        >

                                    </p>
                                    <span class="number_left_bottom">{{i18n.period}}</span>
                                </div>
                                <div class="reg_number_center">
                                    <p class="number_center_top">
                                        <img
                                            :src="linkPng"
                                            alt=""
                                        >

                                    </p>
                                </div>
                                <div class="reg_number_right">
                                    <p class="number_right_top">
                                        <span class="number_brick">{{price}}</span>
                                        <span>{{currencyUnit}}</span>
                                    </p>
                                    <span class="number_right_bottom">{{i18n.pricetopay}}</span>
                                </div>

                            </div>
                            <div class="number_bottom_content">
                                <p class="number_bottom_title">
                                    <span class="number_count">{{price}}</span>
                                    <span class="number_unit">{{currencyUnit}} = ${{toUsdtPrice}}</span>
                                </p>
                                <p class="number_bottom_desc">
                                    {{i18n.low_long_price}}
                                </p>

                            </div>

                        </div>
                        <div class="desc_content">
                            <div class="desc_left_content">
                                <div class="span_tips">{{i18n._steps}}</div>
                            </div>
                        </div>

                        <div class="step_content">
                            <div class="step_process">
                                <div class="step_left_process">
                                    <div class="left_circle">
                                        <p :style="{color: approveBtnDisabled ? '#a63928' : '#d8d8d8', border: approveBtnDisabled ? '2px solid #a63928' : '1px solid #d8d8d8'}">1</p>
                                    </div>
                                    <div class="step_text">
                                        <div class="step_text_title">{{i18n.approval}}</div>
                                        <div class="step_text_desc">{{i18n.approval_desc}}</div>
                                    </div>
                                </div>
                                <div class="step_center_process">
                                    <div class="left_circle">
                                        <p :style="{color: registBtnDisabled ? '#a63928' : '#d8d8d8', border: registBtnDisabled ? '2px solid #a63928' : '1px solid #d8d8d8'}">2</p>
                                    </div>
                                    <div class="step_text">
                                        <div class="step_text_title">{{i18n.registration}}</div>
                                        <div class="step_text_desc">{{i18n.registration_desc}}</div>
                                    </div>

                                </div>

                                <span class="mb_span_tips">
                                    <img
                                        :src="warnPng"
                                        alt=""
                                    >

                                    <!-- {{tips}} -->
                                    <span v-if="!approveBtnDisabled">
                                        {{ i18n.attention_approval}}
                                    </span>
                                    <span v-if="approveBtnDisabled">
                                        {{ i18n.approved}}
                                    </span>
                                </span>
                            </div>
                            <div class="bottom_right">
                                <div class="footer_btn">
                                    <el-button
                                        v-if="['USDT','BRICK'].includes(paymentMethod)"
                                        @click="approveToken"
                                        :disabled="approveBtnDisabled"
                                        :loading="approveBtnLoading"
                                    >{{i18n.approval_btn}}</el-button>
                                    <el-button
                                        type="primary"
                                        :disabled="!approveBtnDisabled || registBtnDisabled"
                                        :loading="registBtnLoading"
                                        @click="requestRegistration"
                                    >{{i18n.register_btn}}</el-button>

                                </div>
                                <span>
                                    <img
                                        :src="warnPng"
                                        alt=""
                                    >

                                    <!-- {{tips}} -->
                                    <span v-if="!approveBtnDisabled">
                                        {{ i18n.attention_approval}}
                                    </span>
                                    <span v-if="approveBtnDisabled">
                                        {{ i18n.approved}}
                                    </span>
                                </span>

                            </div>

                        </div>

                    </div>
                </div>
            </div>

            <div class="index_title_regist_button">
                <div class="mb_title_text">
                    <div class="bg_title_img">
                        <p class="bg_title_text">
                            <span class="web-font">{{i18n.title_top}}</span>
                            <br>
                            <span class="web-font">{{i18n.title_bottom}}</span>
                        </p>
                    </div>
                </div>
                <div class="mb_domian_name_search">
                    <div class="domian_name_content">
                        <p style="margin: 6px 0">{{i18n.bns}}</p>
                        <div class="right_content">
                            <p class="title_name">
                                <span class="title_name_left">{{searchText}}.bsc</span>
                            </p>

                            <div class="number_content">
                                <div class="number_top_content">
                                    <div class="reg_payment_left_select">
                                        <p class="payment_top">
                                            <el-select
                                                v-model="paymentMethod"
                                                :placeholder="i18n.payment_option"
                                                @change="paymentMethodChange"
                                                :popper-append-to-body="false"
                                            >
                                                <el-option
                                                    v-for="item in paymentMethodOpts"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value"
                                                >
                                                </el-option>
                                            </el-select>
                                        </p>
                                        <span class="number_left_bottom">{{i18n.payment}}</span>
                                    </div>
                                    <div class="reg_number_left">
                                        <p class="number_left_top">
                                            <img
                                                :src="reducePng"
                                                alt=""
                                                @click="reduceCount"
                                                :disabled="years == 0"
                                            >
                                            <span>
                                                <span class="left_top_year">{{years}} </span>
                                                <span class="left_top_year_unit">{{i18n.years}}</span>
                                            </span>
                                            <img
                                                @click="addCount"
                                                :src="mbAddPng"
                                                alt=""
                                            >

                                        </p>
                                        <span class="number_left_bottom">{{i18n.period}}</span>
                                    </div>
                                    <div class="reg_number_center">
                                        <p class="number_center_top">
                                            <img
                                                :src="linkPng"
                                                alt=""
                                            >
                                        </p>
                                    </div>
                                    <div class="reg_number_right">
                                        <p class="number_right_top">
                                            <span class="number_brick">{{price}}</span>
                                            <span>{{currencyUnit}}</span>
                                        </p>
                                        <span class="number_right_bottom">{{i18n.pricetopay}}</span>
                                    </div>

                                </div>
                                <div class="number_bottom_content">
                                    <p class="number_bottom_title">
                                        <span class="number_count">{{price}}</span>
                                        <span class="number_unit">{{currencyUnit}} = ${{toUsdtPrice}}</span>
                                    </p>
                                    <p class="number_bottom_desc">
                                        {{i18n.low_long_price}}
                                    </p>
                                </div>
                            </div>

                            <div class="desc_content">
                                <div class="desc_left_content">
                                    <div class="span_tips">{{i18n._steps}}</div>
                                </div>
                            </div>

                            <div class="step_content">
                                <div class="step_process">
                                    <div class="step_left_process">
                                        <div class="left_circle">
                                            <p :style="{color: approveBtnDisabled ? '#a63928' : '#d8d8d8', border: approveBtnDisabled ? '2px solid #a63928' : '1px solid #d8d8d8'}">1</p>
                                        </div>

                                        <div class="step_text">
                                            <div class="step_text_title">{{i18n.approval}}</div>
                                            <div class="step_text_desc">{{i18n.approval_desc}}</div>
                                        </div>
                                    </div>
                                    <div class="step_center_process">
                                        <div class="left_circle">
                                            <p :style="{color: registBtnDisabled ? '#a63928' : '#d8d8d8', border: registBtnDisabled ? '2px solid #a63928' : '1px solid #d8d8d8'}">2</p>
                                        </div>
                                        <div class="step_text">
                                            <div class="step_text_title">{{i18n.registration}}</div>
                                            <div class="step_text_desc">{{i18n.registration_desc}}</div>
                                        </div>
                                    </div>

                                    <span class="mb_span_tips">
                                        <img
                                            :src="warnPng"
                                            alt=""
                                        >

                                        <!-- {{tips}} -->
                                        <span v-if="!approveBtnDisabled">
                                            {{ i18n.attention_approval}}
                                        </span>
                                        <span v-if="approveBtnDisabled">
                                            {{ i18n.approved}}
                                        </span>
                                    </span>
                                </div>
                                <div class="bottom_right">
                                    <div class="footer_btn">
                                        <el-button
                                            v-if="['USDT','BRICK'].includes(paymentMethod)"
                                            @click="approveToken"
                                            :disabled="approveBtnDisabled"
                                            :loading="approveBtnLoading"
                                        >{{i18n.approval_btn}}</el-button>
                                        <el-button
                                            type="primary"
                                            :disabled="!approveBtnDisabled || registBtnDisabled"
                                            :loading="registBtnLoading"
                                            @click="requestRegistration"
                                        >{{i18n.register_btn}}</el-button>

                                    </div>
                                    <span>
                                        <img
                                            :src="warnPng"
                                            alt=""
                                            style=" margin-bottom: 4px; margin-right: 1rem; height: 1rem; width: 1rem;"
                                        >

                                        <!-- {{tips}} -->
                                        <span v-if="!approveBtnDisabled">
                                            {{ i18n.attention_approval}}
                                        </span>
                                        <span v-if="approveBtnDisabled">
                                            {{ i18n.approved}}
                                        </span>
                                    </span>

                                </div>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="mb_bottom_button">
                    <div class="footer_btn">
                        <!-- v-if="['USDT','BRICK'].includes(paymentMethod)" -->
                        <el-button
                            @click="approveToken"
                            :disabled="approveBtnDisabled"
                            :loading="approveBtnLoading"
                        >{{i18n.approval_mb_btn}}</el-button>
                        <el-button
                            type="primary"
                            :disabled="!approveBtnDisabled || registBtnDisabled"
                            :loading="registBtnLoading"
                            @click="requestRegistration"
                        >{{i18n.register_mb_btn}}</el-button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import cutJpg from 'img/cut.jpg';
import searchPng from 'img/搜索.png';
import titlePng from 'img/bg2_title.png';
import titleEnPng from 'img/bg2_title_en.png';
import noticePng from 'img/通知.png';
import addPng from 'img/增加.png';
import mbAddPng from 'img/imgmb/增加.png';
import reducePng from 'img/减少.png';
import linkPng from 'img/链接.png';
import warnPng from 'img/警告.png';
import collectionPng from 'img/收藏.png';
import collectionSelPng from 'img/收藏.sel.png';
import miniPng from 'img/701651807815_.png';
import aboutPng from 'img/关于我们.png';
import unnamedPng from 'img/unnamed.png';
import connectWallet from './components/connectWallet.vue';
import titleEnsSearch from './components/titleEnsSearch.vue';
import registered from 'houtai/components/main/components/registered.vue';
import {
	buyWithEth,
	buyWithUsdt,
	buyWithBrick,
	approve,
	getPrice,
	usdtPrice,
	bnbPrice,
	brickPrice,
} from 'houtai/web3_eth.js';
export default {
	components: { connectWallet, registered, titleEnsSearch },
	data() {
		return {
			bodyHeight: '',
			isExist: null,
			openLinkShowFlag: false,
			searchEnsLoading: false,
			fontColor: 'blue',
			approveBtnDisabled: false,
			approveBtnLoading: false,
			registBtnDisabled: false,
			registBtnLoading: false,
			years: 2,
			price: 99999999999,
			currencyUnit: 'BRICK',
			currencyPrice: '999999999',
			toUsdtPrice: '0',
			searchText: '',
			searchPng,
			titlePng,
			titleEnPng,
			noticePng,
			warnPng,
			reducePng,
			linkPng,
			addPng,
			mbAddPng,
			collectionPng,
			collectionSelPng,
			unnamedPng,
			cutJpg,
			miniPng,
			aboutPng,
			// tips: '请注意! 使用brick,usdt购买时需要先授权',
			tips: this.$store.state.i18n[this.$store.state.language]
				.attention_approval,
			// tips: '',

			paymentMethod: 'BRICK',
			paymentMethodOpts: [
				{
					value: 'BNB',
					label: 'BNB',
				},
				{
					value: 'USDT',
					label: 'USDT',
				},
				{
					value: 'BRICK',
					label: 'BRICK',
				},
			],
		};
	},
	async mounted() {
		this.bodyHeight =
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		this.searchText = this.$route.query.text || '';
		let flag = localStorage.getItem('STATUS')
			? localStorage.getItem('STATUS')
			: '';
		//钱包已连接 查询
		if (flag) {
			this.inIt();
		}
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},
	methods: {
		async inIt() {
			this.bodyHeight =
				document.documentElement.clientHeight ||
				document.body.clientHeight;
			this.searchText = this.$route.query.text || '';
			await getPrice(this.searchText);
			this.price =
				(brickPrice / 1e18).toFixed(0) * this.years;
			this.toUsdtPrice =
				(usdtPrice / 1e18).toFixed(0) *
				this.years *
				0.85;
		},
		async changeText(text) {
			console.log('changeText', text);
			this.searchText = text;
			if (this.paymentMethod == 'BNB') {
				this.approveBtnDisabled = true;
				this.registBtnDisabled = false;
				this.approveBtnLoading = false;
				this.registBtnLoading = false;
			} else {
				this.approveBtnDisabled = false;
				this.registBtnDisabled = false;
				this.approveBtnLoading = false;
				this.registBtnLoading = false;
			}
			await getPrice(this.searchText);
			this.price =
				(brickPrice / 1e18).toFixed(0) * this.years;
			this.toUsdtPrice =
				(usdtPrice / 1e18).toFixed(0) * this.years;
		},

		openLinkBtn(flag) {
			this.openLinkShowFlag = flag;
		},
		approveToken() {
			var _this = this;
			approve(
				this.paymentMethod,
				function () {
					_this.approveBtnLoading = true;
				},
				function () {
					_this.approveBtnLoading = false;
				},
				function () {
					// _this.tips = '已经授权';
					_this.tips =
						_this.$store.state.i18n[
							_this.$store.state.language
						].approved;
					_this.approveBtnDisabled = true;
					_this.approveBtnLoading = false;
				},
			);
		},

		requestRegistration() {
			let _router = this.$router;
			let _name = this.searchText.toLowerCase() + '.bsc';
			var _this = this;
			var _loadingTrue = function () {
				// loading 转圈
				_this.registBtnLoading = true;
			};
			var _loadingFalse = function () {
				// loading转圈停止 进入disabled
				_this.registBtnLoading = false;
				_this.registBtnDisabled = true;
			};
			var _cb = function () {
				_router.push({
					path: '/registration/info',
					query: {
						text: this.searchText
							? this.searchText
							: undefined,
					},
				});
			};

			console.log('_name', _name);

			//TODO 再次确认是否已被注册
			// TODO 传入 price进行计算 1e18
			if (this.paymentMethod === 'BNB') {
				buyWithEth(
					_name,
					_cb,
					_loadingTrue,
					_loadingFalse,
					this.years,
					this.price * 1e18,
				);
			} else if (this.paymentMethod === 'USDT') {
				buyWithUsdt(
					_name,
					_cb,
					_loadingTrue,
					_loadingFalse,
					this.years,
					this.price * 1e18,
				);
			} else if (this.paymentMethod === 'BRICK') {
				buyWithBrick(
					_name,
					_cb,
					_loadingTrue,
					_loadingFalse,
					this.years,
					this.price * 1e18,
				);
			}
		},
		paymentMethodChange(val) {
			console.log('paymentMethodChange');
			this.currencyUnit = val;
			if (val == 'BNB') {
				this.approveBtnDisabled = true;
				this.registBtnDisabled = false;
			} else {
				this.approveBtnDisabled = false;
				this.registBtnDisabled = false;
			}

			this.updatePrice();
		},
		addCount() {
			this.years++;
			this.updatePrice();
		},
		reduceCount() {
			if (this.years > 0) {
				this.years--;
			}

			this.updatePrice();
		},

		updatePrice() {
			if (this.currencyUnit === 'BNB') {
				this.price =
					(bnbPrice / 1e18).toFixed(5) *
					this.years;
			} else if (this.currencyUnit === 'USDT') {
				this.price =
					(usdtPrice / 1e18).toFixed(0) *
					this.years;
			} else if (this.currencyUnit === 'BRICK') {
				this.price =
					(brickPrice / 1e18).toFixed(0) *
					this.years;
			}

			this.toUsdtPrice =
				(usdtPrice / 1e18).toFixed(0) * this.years;
			if (this.currencyUnit === 'BRICK') {
				this.toUsdtPrice = this.toUsdtPrice * 0.85;
			}
		},
		format1() {
			return 1;
		},
		format2() {
			return 2;
		},
		format3() {
			return 3;
		},
	},
};
</script>

<style lang="less" scoped>
.pc_registration_request {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img {
		width: 100%;
		// height: 100%;
		background: url('img/bg3.png');
		background-size: 100% 100%;
		position: absolute;

		.title_text {
			// position: fixed;
			// top: 20%;
			// left: 37%;
			display: block;
			p {
				display: none;
				margin-top: 0px;
				font-family: Alibaba-PuHuiTi-M;
				font-weight: M;
				font-size: 1.3rem;
				color: #eedfbd;
			}
			img {
				display: block;
				height: 5rem;
				width: 80%;
				height: 100%;
				margin-left: 15%;
				margin-top: 3rem;
			}
		}
		.domian_name_search {
			display: block;
			width: 70%;
			// margin: 0 8% 0 22%;
			margin: 0 10% 0 20%;
			p {
				margin-bottom: 20px;
				margin-top: 6px;
				position: relative;
			}
			// position: fixed;
			// bottom: 3rem;
			// padding-top: 18rem;
			.right_content {
				// height: 55vh;
				// margin: 2.5rem 0;
				position: relative;
				padding: 1rem 0 2rem 0;
				font-size: 1rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
				// width: 72vw;
				background: #ffffff;
				box-shadow: 0 2px 20px 0
					rgba(153, 119, 53, 0.29);
				border-top-right-radius: 8px;
				border-bottom-right-radius: 8px;
				border-left: 4px solid #a63928;
				.title_name {
					height: 1.8rem;
					line-height: 1.8rem;
					margin-top: 0;
					padding-bottom: 15px;
					border-bottom: 1.55px solid #d8d8d8;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 1rem;
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					.title_name_left {
						color: #333333;
						margin-left: 1rem;
					}
					.title_name_right {
						color: #999999;
						margin-right: 1rem;
						img {
							margin-right: 1rem;
							vertical-align: middle;
							margin-bottom: 7px;
						}
					}
				}

				.number_content {
					margin: 0 1.2rem;
					.number_top_content {
						display: flex;
						flex-direction: row;
						margin-bottom: 1rem;
						img {
							vertical-align: middle;
						}
						.reg_payment_left_select {
							width: 21rem;
							margin-right: 1rem;
							.payment_top {
								padding-bottom: 10px;
								margin: 0;
								border-bottom: 2px;
								margin-bottom: 0;
								border-bottom: 2px
									solid
									#ededed;
								/deep/.el-select {
									width: 100%;
								}
								/deep/.el-input__inner {
									border: 0;
									height: 24px;
									line-height: 24px;
									color: #000000;
									font-size: 1.2rem;
								}
								/deep/.el-select
									.el-input
									.el-select__caret {
									height: 24px;
									line-height: 24px;
								}
								/deep/.el-icon-arrow-up:before {
									content: '';
								}
								/deep/
									.el-select__caret {
									transform: rotateZ(
										0deg
									);
									background: url('img/箭头1.png')
										center
										center
										no-repeat;
								}
								/deep/.el-select
									.el-input
									.el-select__caret.is-reverse {
									background: url('img/箭头2.png')
										center
										center
										no-repeat;
								}
							}
							.number_left_bottom {
								font-family: PingFangTC-Regular;
								font-weight: 400;
								font-size: 0.8rem;
								color: #999999;
							}
						}
						.reg_number_left {
							width: 11rem;
							.number_left_top {
								height: 1.5rem;
								padding-bottom: 10px;
								margin: 0;
								font-size: 1.2rem;
								border-bottom: 2px
									solid
									#ededed;
								.left_top_year {
									margin: 0
										0.5rem;
								}
								.left_top_year_unit {
									margin-right: 1rem;
								}
								img {
									height: 1.5rem;
									// margin-top: 1rem;
								}
							}
							.number_left_bottom {
								font-family: PingFangTC-Regular;
								font-weight: 400;
								font-size: 0.8rem;
								color: #999999;
							}
						}
						.reg_number_center {
							display: block;
							width: 3rem;
							margin-left: 0.5rem;
							.number_center_top {
								padding-bottom: 12px;
								margin: 0;
							}
						}
						.reg_number_right {
							flex: 1;
							.number_right_top {
								border-bottom: 2px
									solid
									#ededed;
								padding-bottom: 10px;
								margin: 0;
								font-size: 1.2rem;
								.number_brick {
									font-weight: 600;
								}
							}
							.number_right_bottom {
								font-family: PingFangTC-Regular;
								font-weight: 400;
								font-size: 0.8rem;
								color: #999999;
							}
						}
					}
					.number_bottom_content {
						display: block;
						font-size: 1rem;
						.number_bottom_title {
							border-bottom: 2px solid
								#ededed;
							// height: 1.5rem;
							margin: 0;
							padding-bottom: 6px;
							.number_count {
								color: #000000;
								font-weight: 600;
							}
							.number_unit {
								font-weight: 400;
								margin: 0 10px;
								padding: 10px 0;
							}
							.number_char {
								font-weight: 400;
								color: #999999;
							}
						}
						.number_bottom_desc {
							// height: 1.2rem;
							font-size: 0.8rem;
							color: #999999;
							font-family: PingFangTC-Regular;
							font-weight: 400;
							// margin: 0;
						}
					}
				}

				.desc_content {
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					margin: 0 1.2rem;
					padding-bottom: 1.2rem;
					.desc_left_content {
						.span_tips {
							display: block;
							height: 1.5rem;
							font-size: 1.5rem;
							margin-bottom: 0.5rem;
						}
						.span_action {
							height: 1rem;
							font-size: 0.8rem;
							color: #999999;
						}
					}
					.desc_right_content {
						img {
							vertical-align: middle;
							margin-right: 5px;
							margin-bottom: 1px;
						}
						float: right;
						.el-button--default:hover {
							color: #a63928;
						}

						.el-button--default {
							color: #a63928;
							border: 1.55px solid
								#a63928;
							border-radius: 154.84px;
							background-color: #ffffff;
							width: 7rem;
							height: 2.5rem;
						}
					}
				}
			}
		}
		.step_content {
			display: flex;
			flex-direction: column;
			.step_process {
				display: flex;
				flex-direction: row;
				// justify-content: space-around;
				font-family: PingFangSC-Regular;
				padding-bottom: 0rem;
				margin: 0 1.2rem;
				/deep/.el-progress-circle {
					width: 3rem !important;
					height: 3rem !important;
					line-height: 3rem !important;
				}

				.progress_circle {
					height: 3rem;
					margin-right: 1rem;
				}
				.step_text {
					width: 70%;
					float: right;
				}
				.step_text_title {
					height: 1.5rem;
					font-weight: 600;
					font-size: 1rem;
					color: #000000;
					padding-bottom: 0.5rem;
				}
				.step_text_desc {
					width: 100%;
					// height: 80px;
					font-weight: 400;
					font-size: 0.8rem;
					color: #333333;
				}
				.left_circle {
					color: #d8d8d8;
					height: 2.5rem;
					width: 2.5rem;
					line-height: 2.5rem;
					margin-right: 1rem;
					box-sizing: border-box;
					p {
						margin: 0;
						text-align: center;
						font-family: PingFangSC-Regular;
						font-weight: 400;
						// height: 2.6rem;
						// line-height: 2.6rem;
						// width: 2.6rem;
						height: 2.5rem;
						line-height: 2.5rem;
						width: 2.5rem;
						border: 2px solid #ccc;
						border-radius: 50%;
					}
				}
				.step_left_process {
					width: 43%;
					display: flex;
					flex-direction: row;
					justify-content: inherit;
					.step_text {
						// margin-right: 5rem;
						margin-right: 10%;
						padding-bottom: 0.5rem;
					}
				}
				.step_center_process {
					width: 43%;
					display: flex;
					flex-direction: row;
					justify-content: inherit;
					.step_text {
						// margin-right: 5rem;
						margin-right: 10%;
					}
				}
				.step_right_process {
					width: 30%;
					display: flex;
					flex-direction: row;
					justify-content: inherit;
				}
				.mb_span_tips {
					display: none;
					// float: right;
					// height: 3rem;
					// line-height: 1.5rem;
					// margin-right: 0;
					// font-size: 0.8rem;
					// color: #ff6e11;
					// margin-top: 0.5rem;
					// img {
					// 	vertical-align: middle;
					// }
				}
			}

			// .progress_circle svg > path:first-of-type {
			// 	stroke: red !important;
			// }
			/deep/ .el-progress__text {
				// color: pink;
				// color: var(--fontColor) !important;
			}
			/deep/.el-progress.is-exception
				.el-progress-bar__inner {
				background-image: linear-gradient(
					270deg,
					#b43f2c 0%,
					#e97659 100%
				);
			}
			/deep/.el-progress-bar__outer {
				height: 1.5rem;
				background: #f7ebea;
				border-radius: 17px;
			}
		}

		.bottom_right {
			display: block;
			margin: 0 1.2rem;
			span {
				float: right;
				height: 3rem;
				line-height: 3rem;
				margin-right: 1rem;
				// height: 20px;
				font-size: 0.8rem;
				color: #ff6e11;
			}
			.footer_btn {
				float: right;
			}
			img {
				vertical-align: middle;
				margin-bottom: 4px;
				margin-right: 1rem;
				height: 1rem;
				width: 1rem;
			}
			/deep/.el-select .el-input.is-focus .el-input__inner {
				border-color: #a63928;
			}
			/deep/.el-select .el-input__inner:focus {
				border-color: #a63928;
			}
			/deep/.el-button--primary {
				border: 1.55px solid #a63928;
				border-radius: 154.84px;
				background-color: #a63928;
				width: 7.5rem;
				height: 3rem;
			}
			/deep/.el-button--primary.is-disabled {
				opacity: 0.3 !important;
			}
			/deep/.el-button--default.is-disabled {
				opacity: 0.3 !important;
			}
			.el-button--default:hover {
				color: #a63928;
			}
			.el-button--default {
				color: #a63928;
				border: 1.55px solid #a63928;
				border-radius: 154.84px;
				background-color: #ffffff;
				width: 7.5rem;
				height: 3rem;
			}
		}
		.index_title_regist_button {
			display: none;
		}
	}
	@media only screen and (max-width: 768px) {
		.bg_img {
			background: url('img/imgmb/bg5.png');
			background-size: 100% 100%;
			.title_text {
				display: none;
			}
			.domian_name_search {
				display: none;
			}
			.step_content {
				display: none;
			}
			.bottom_right {
				display: none;
			}

			.index_title_regist_button {
				height: 80%;
				display: flex;
				flex-direction: column;
				margin-top: 9rem;
				.mb_title_text {
					text-align: center;
					width: 100%;
					height: 6rem;
					// margin-bottom: 2rem;
					p {
						display: none;
					}
					.bg_title_img {
						display: block;
						background: url('img/imgmb/bg5_title.png');
						background-size: 100% 100%;
						width: 88%;
						margin-left: 6%;
						height: 6rem;
						.bg_title_text {
							display: block;
							position: absolute;
							font-size: 1rem;
							width: 70%;
							margin-left: 10%;
							margin-top: 1.5rem;
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
				.mb_domian_name_search {
					flex: 1;
					display: block;
					width: 80%;
					margin: 0 10% 0 10%;
					height: 50%;

					.domian_name_content {
						height: 100%;
						p {
							margin-bottom: 20px;
							margin-top: 6px;
							font-family: PingFangSC-Regular;
						}
						.right_content {
							// height: calc(100vh - 500px);
							height: 85%;
							overflow: scroll;
							position: relative;
							padding: 1rem 0 0 0;
							margin-top: 5px;
							font-size: 1rem;
							font-family: PingFangSC-Regular;
							font-weight: 400;
							color: #000000;
							background: #ffffff;
							box-shadow: 0 2px 20px 0
								rgba(
									153,
									119,
									53,
									0.29
								);
							border-top-right-radius: 8px;
							border-bottom-right-radius: 8px;
							border-left: 4px solid
								#a63928;
							.title_name {
								height: 2rem;
								line-height: 2rem;
								margin-top: 0;
								padding-bottom: 15px;
								margin-bottom: 10px;
								border-bottom: 0.87px
									solid
									#ededed;
								font-family: PingFangSC-Regular;
								font-weight: 400;
								font-size: 1rem;
								display: flex;
								justify-content: space-between;
								flex-direction: row;
								.title_name_left {
									color: #333333;
									margin-left: 1rem;
								}
								.title_name_right {
									color: #999999;
									margin-right: 1rem;
									img {
										margin-right: 1rem;
										vertical-align: middle;
										margin-bottom: 7px;
									}
								}
							}

							.number_content {
								margin: 0 1.2rem;
								.number_top_content {
									display: flex;
									flex-direction: column;
									margin-bottom: 0.5rem;
									.reg_payment_left_select {
										width: 100%;
										display: block;
										margin-bottom: 0.5rem;
										.payment_top {
											// margin-bottom: 0;
											padding-bottom: 0;
											margin-bottom: 0.8rem;
											border-bottom: 2px
												solid
												#ededed;
											/deep/.el-select {
												width: 100%;
												-webkit-tap-highlight-color: transparent !important;
											}
											/deep/.el-input__inner {
												border: 0;
												height: 3rem;
												line-height: 3rem;
												padding-left: 0;
												font-size: 1.1rem;
												color: #000000;
											}
											/deep/.el-input__suffix {
												height: 3rem;
												line-height: 3rem;
											}

											/deep/.el-select
												.el-input
												.el-select__caret {
												height: 24px;
												line-height: 24px;
											}
											.el-select-dropdown__item.selected {
												color: #a63928;
												font-weight: 700;
											}
											/deep/.el-icon-arrow-up:before {
												content: '';
											}
											/deep/
												.el-select__caret {
												transform: rotateZ(
													0deg
												);
												background: url('img/箭头1.png')
													center
													center
													no-repeat;
											}
											/deep/.el-select
												.el-input
												.el-select__caret.is-reverse {
												background: url('img/箭头2.png')
													center
													center
													no-repeat;
											}
										}
										.number_left_bottom {
											font-family: PingFangTC-Regular;
											font-weight: 400;
											font-size: 0.8rem;
											color: #999999;
										}
									}
									img {
										vertical-align: middle;
									}
									.reg_number_left {
										width: 100%;
										margin-bottom: 0.5rem;
										.number_left_top {
											height: 3rem;
											line-height: 3rem;
											padding-bottom: 0;
											margin: 0;
											border-bottom: 2px
												solid
												#ededed;
											display: flex;
											flex-direction: row;
											justify-content: space-between;
											margin-bottom: 0.6rem;
											.left_top_year {
												margin: 0
													0.5rem;
												font-weight: 600;
											}
											.left_top_year_unit {
												margin-right: 0.5rem;
											}
											img {
												height: 1.5rem;
												margin-top: 0.8rem;
												vertical-align: middle;
											}
										}
										.number_left_bottom {
											font-family: PingFangTC-Regular;
											font-weight: 400;
											font-size: 0.8rem;
											color: #999999;
										}
									}
									.reg_number_center {
										display: none;
									}
									.reg_number_right {
										flex: 1;
										.number_right_top {
											height: 3rem;
											line-height: 3rem;
											border-bottom: 2px
												solid
												#ededed;
											padding-bottom: 0;
											margin: 0;
											margin-bottom: 0.6rem;
											.number_brick {
												font-weight: 600;
											}
										}
										.number_right_bottom {
											font-family: PingFangTC-Regular;
											font-weight: 400;
											font-size: 0.8rem;
											color: #999999;
										}
									}
								}
								.number_bottom_content {
									display: block;
									font-size: 1rem;
									.number_bottom_title {
										border-bottom: 2px
											solid
											#ededed;
										margin: 0;
										padding-bottom: 0;
										height: 3rem;
										line-height: 3rem;
										margin-bottom: 0.6rem;
										.number_count {
											color: #000000;
											font-weight: 600;
										}
										.number_unit {
											font-weight: 400;
											margin: 0
												20px;
											padding: 10px
												0;
										}
										.number_char {
											font-weight: 400;
											color: #999999;
										}
									}
									.number_bottom_desc {
										// height: 1.2rem;
										font-size: 0.8rem;
										color: #999999;
										// margin: 0;
									}
								}
							}

							.desc_content {
								display: flex;
								justify-content: space-between;
								flex-direction: row;
								margin: 0 1.2rem;
								padding-bottom: 1.2rem;
								.desc_left_content {
									.span_tips {
										display: block;
										// height: 1.5rem;
										font-size: 1.3rem;
										margin-bottom: 0.5rem;
									}
									.span_action {
										height: 1rem;
										font-size: 0.8rem;
										color: #999999;
									}
								}
								.desc_right_content {
									img {
										vertical-align: middle;
										margin-right: 5px;
										margin-bottom: 1px;
									}
									float: right;
									/deep/.el-button--default.is-disabled {
										opacity: 0.3 !important;
									}
									/deep/.el-button--default:hover {
										color: #a63928;
									}

									/deep/.el-button--default {
										color: #a63928;
										border: 1.55px
											solid
											#a63928;
										border-radius: 154.84px;
										background-color: #ffffff;
										width: 48%;
										height: 2.5rem;
									}
								}
							}
						}
					}
					.step_content {
						display: flex;
						flex-direction: column;
						.step_process {
							display: flex;
							flex-direction: column;
							// justify-content: space-around;
							font-family: PingFangSC-Regular;
							padding-bottom: 1rem;
							margin: 0 1.2rem;
							/deep/.el-progress-circle {
								width: 3rem !important;
								height: 3rem !important;
								line-height: 3rem !important;
							}
							.progress_circle {
								height: 3rem;
								margin-right: 1rem;
							}
							.step_text {
								width: 70%;
								float: right;
							}
							.step_text_title {
								height: 1.5rem;
								font-weight: 600;
								font-size: 1rem;
								color: #000000;
							}
							.step_text_desc {
								width: 100%;
								// height: 80px;
								font-weight: 400;
								font-size: 0.8rem;
								color: #333333;
							}
							.step_left_process {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: inherit;
								.step_text {
									// margin-right: 5rem;
									margin-right: 0;
								}
							}
							.left_circle {
								color: #d8d8d8;
								height: 2.5rem;
								width: 2.5rem;
								line-height: 2.5rem;
								margin-right: 1rem;
								box-sizing: border-box;
								p {
									margin: 0;
									text-align: center;
									font-family: PingFangSC-Regular;
									font-weight: 400;
									// height: 2.6rem;
									// line-height: 2.6rem;
									// width: 2.6rem;
									height: 2.5rem;
									line-height: 2.5rem;
									width: 2.5rem;
									border: 2px
										solid
										#ccc;
									border-radius: 50%;
								}
							}
							.step_center_process {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: inherit;
								.step_text {
									// margin-right: 5rem;
									margin-right: 0;
								}
							}
							.step_right_process {
								width: 100%;
								display: flex;
								flex-direction: row;
								justify-content: inherit;
							}
							.mb_span_tips {
								display: block;
								float: right;
								height: 3rem;
								// line-height: 1.5rem;
								margin-right: 0;
								font-size: 0.8rem;
								color: #ff6e11;
								margin-top: 0.5rem;
								img {
									vertical-align: middle;
									margin-bottom: 4px;
									margin-right: 1rem;
									height: 1rem;
									width: 1rem;
								}
							}
						}

						// .progress_circle svg > path:first-of-type {
						// 	stroke: red !important;
						// }
						/deep/ .el-progress__text {
							// color: pink;
							// color: var(--fontColor) !important;
						}
						/deep/.el-progress.is-exception
							.el-progress-bar__inner {
							background-image: linear-gradient(
								270deg,
								#b43f2c 0%,
								#e97659 100%
							);
						}
						/deep/.el-progress-bar__outer {
							height: 1.5rem;
							background: #f7ebea;
							border-radius: 17px;
						}
					}
				}

				.mb_bottom_button {
					display: block;
					width: 80%;
					margin: 0 10%;
					height: 7rem;
					.footer_btn {
						float: none;
					}
					/deep/.el-button + .el-button {
						margin-left: 0;
					}
					/deep/.el-select
						.el-input.is-focus
						.el-input__inner {
						border-color: #a63928;
					}
					/deep/.el-select
						.el-input__inner:focus {
						border-color: #a63928;
					}
					/deep/.el-button--primary {
						border: 1px solid #a63928;
						border-radius: 154.84px;
						background-color: #a63928;
						width: 45%;
						// height: 3rem;
						height: 3rem;
						font-size: 1.3rem;
						letter-spacing: 1.12px;
						margin-top: 1rem;
					}
					/deep/.el-button--primary.is-disabled {
						opacity: 0.3 !important;
					}
					/deep/.el-button--default.is-disabled {
						opacity: 0.6 !important;
					}
					/deep/.el-button--default:hover {
						color: #a63928;
					}

					/deep/.el-button--default {
						color: #a63928;
						border: 1px solid #a63928;
						border-radius: 154.84px;
						background-color: #ffffff;
						height: 3rem;
						font-size: 1.3rem;
						letter-spacing: 1.12px;
						width: 45%;
						// height: 3rem;
						margin-right: 7%;
					}
				}
			}
		}
	}
}
</style>