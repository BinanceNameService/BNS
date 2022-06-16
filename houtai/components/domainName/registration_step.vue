<template>
    <div class="pc_registration_step">
        <div class="bg_img">
            <div class="top_search">
                <el-input
                    class="input_search"
                    placeholder="请输入域名或地址"
                    v-model="domainSearch"
                >
                    <template slot="prepend">
                        <img
                            style="margin-left: 9rem"
                            slot="prefix"
                            :src="miniPng"
                            alt=""
                        >
                        <img
                            style="margin-left: 1rem; margin-bottom: 5px;"
                            slot="prefix"
                            :src="cutJpg"
                            alt=""
                        >
                    </template>
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
                    >
                        <el-option
                            v-for="item in LanageListOpts"
                            :key="item.value"
                            :label="item.value"
                            :value="item.label"
                        >
                            <span style="float: left">{{ item.label }}</span>
                            <span style="float: right; margin-left: 20px; color: #8492a6; font-size: 13px">
                                <el-radio
                                    v-model="selectRadio"
                                    :label="item.value"
                                > </el-radio>
                            </span>
                        </el-option>

                    </el-select>

                    <span slot="append">
                        <el-button>查询</el-button>
                    </span>
                </el-input>
            </div>
            <div class="title_text">
                <p class="web-font">我们是BRICK 我们认为WEB3.0属于每一位投资者</p>
            </div>

            <connectWallet></connectWallet>
            <div class="bottom_text">
                <p>
                    <img
                        :src="aboutPng"
                        alt=""
                    >
                    <span>关于</span>
                </p>

            </div>

            <div class="domian_name_search">
                <div>
                    <p></p>
                    <div>域名</div>

                    <div class="right_content">
                        <p class="title_name">
                            <span class="title_name_left">tknoppk.cm</span>
                            <span class="title_name_right">
                                <img
                                    :src="collectionSelPng"
                                    alt=""
                                >
                                <span
                                    :style="{ color: registrationColorChange ? '#999999' : '#a63928'}"
                                    @click="registrationBtn"
                                >注册</span>
                                <el-divider direction="vertical"></el-divider>
                                <span @click="registrationDetailBtn">详情</span>
                                <el-divider direction="vertical"></el-divider>
                                <span @click="childDomainName">子域名</span>
                            </span>
                        </p>

                        <div class="desc_content">
                            <div class="desc_left_content">
                                <div class="span_tips">您很快就可以完成域名注册</div>
                                <div class="span_action">*您可以收藏喜欢的域名，以便于浏览器关闭以后重新查看这个域名。</div>
                            </div>
                            <div class="desc_right_content">
                                <el-button><img
                                        :src="noticePng"
                                        alt=""
                                    ><span>通知我</span></el-button>
                            </div>
                        </div>

                        <div class="step_content">
                            <div class="step_process">
                                <div class="step_left_process">
                                    <el-progress
                                        class="progress_circle"
                                        type="circle"
                                        :percentage="25"
                                        color="#a63928"
                                        :format="format1"
                                    >
                                    </el-progress>
                                    <div class="step_text">
                                        <div class="step_text_title">请求注册</div>
                                        <div class="step_text_desc">需要在钱包中确认一笔交易，这是完成域名注册所需的两笔交易中的第一笔。如果第1步完成之后的24小时内没有进行第2步，则需要从第1步重新开始。</div>
                                    </div>
                                </div>
                                <div class="step_center_process">
                                    <el-progress
                                        class="progress_circle"
                                        type="circle"
                                        :percentage="25"
                                        color="#a63928"
                                        :format="format2"
                                    ></el-progress>
                                    <div class="step_text">
                                        <div class="step_text_title">等一分钟</div>
                                        <div class="step_text_desc">需要等待一段时间，以确保其他人没有尝试注册相同的名字，同时也是在保护你的注册请求。</div>
                                    </div>
                                </div>
                                <div class="step_right_process">
                                    <el-progress
                                        class="progress_circle"
                                        type="circle"
                                        :percentage="25"
                                        color="#a63928"
                                        :format="format3"
                                    ></el-progress>
                                    <div class="step_text">
                                        <div class="step_text_title">完成注册</div>
                                        <div class="step_text_desc">点击“注册”按钮，并在钱包中再次确认一笔交易，只有在这次交易确认后，才能确定是不是成功注册了这个域名。</div>
                                    </div>
                                </div>
                            </div>
                            <el-progress
                                :text-inside="true"
                                :stroke-width="20"
                                :percentage="33"
                                status="exception"
                                :show-text="false"
                            ></el-progress>

                            <el-steps style="margin-top: 20px">
                                <el-step title="">
                                    <span slot="icon">Step 1</span>
                                </el-step>
                                <el-step title="">
                                    <span slot="icon">Step 2</span>
                                </el-step>
                                <el-step title="">
                                    <span slot="icon">Step 3</span>
                                </el-step>
                            </el-steps>
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
import noticePng from 'img/通知.png';
import collectionPng from 'img/收藏.png';
import collectionSelPng from 'img/收藏.sel.png';
import miniPng from 'img/701651807815_.png';
import aboutPng from 'img/关于我们.png';
import unnamedPng from 'img/unnamed.png';
import connectWallet from './components/connectWallet.vue';
export default {
	components: { connectWallet },
	data() {
		return {
			registrationColorChange: false, //点击后 改变颜色
			active: 1,
			openLinkShowFlag: false,
			domainSearch: '',
			searchPng,
			noticePng,
			collectionPng,
			collectionSelPng,
			unnamedPng,
			cutJpg,
			miniPng,
			aboutPng,
			select: 'CN',
			selectRadio: '简体中文 (CN)',
			LanageListOpts: [
				{
					label: 'English (EN)',
					value: 'EN',
				},
				{
					label: '简体中文 (CN)',
					value: 'CN',
				},
				{
					label: '日本语 (JA)',
					value: 'JA',
				},
			],
		};
	},
	methods: {
		openLinkBtn(flag) {
			this.openLinkShowFlag = flag;
		},
		registrationBtn() {
			this.registrationColorChange =
				!this.registrationColorChange;
			console.log('注册---step');
			registrationBtn();
		},

		registrationDetailBtn() {
			console.log('详情---step');
			registrationDetailBtn();
		},

		childDomainName() {
			console.log('子域名---step');
			childDomainName();
		},
		format1(percentage) {
			return '1';
		},
		format2(percentage) {
			return '2';
		},
		format3(percentage) {
			return '3';
		},
	},
};
</script>

<style lang="less" scoped>
.pc_registration_step {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img {
		width: 100%;
		height: 100%;
		background: url('img/bg.png');
		background-size: 100% 100%;
		position: absolute;
		.top_search {
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
				opacity: 0.7;
				background: #a63928;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				font-size: 1.2rem;
				color: #ffffff;
			}
			.input_search {
				/deep/.el-input__prefix {
					left: 5px;
					transition: all 0.3s;
					line-height: 7.1rem;
				}

				/deep/.el-input__inner {
					height: 6rem !important;
					line-height: 6rem !important;
					background: #ffffff;
					border: 0;
					padding-left: 3.5rem !important;
					font-size: 1.1rem;
					color: #666666;
				}

				/deep/.el-input__suffix {
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

		.title_text {
			position: fixed;
			top: 20%;
			left: 37%;
			p {
				margin-top: 0px;
				font-family: Alibaba-PuHuiTi-M;
				font-weight: M;
				font-size: 1.3rem;
				color: #eedfbd;
			}
		}

		.left_content {
			color: #999999;
			font-size: 0.9rem;
			font-weight: 400;
			left: 3rem;
			top: 4rem;
			position: fixed;
			float: left;
			.content_left_img {
				height: 3.1rem;
				width: 3.1rem;
				float: left;
				margin-right: 20px;
				margin-top: 3.5rem;
			}
			.content_right_text {
				float: right;
				margin-top: 2.5rem;
				p {
					margin-bottom: 9px;
				}
				li {
					margin-bottom: 9px;
				}
				.link_btn {
					height: 2.8rem;
					line-height: 2.8rem;
					padding: 0 2.5rem;
					border: 2px solid #a63928;
					background: #eee0bd;
					color: #a63928;
					// margin: 0px 5px;
				}
			}
		}
		.bottom_text {
			top: 17rem;
			position: fixed;
			left: 3rem;
			p {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 1.5rem;
				color: #a63928;
				height: 2rem;
				line-height: 2rem;
			}
		}
		.domian_name_search {
			margin: 0 13%;
			width: 74%;
			margin: 0 9% 0 17%;
			position: fixed;
			bottom: 3rem;
			// p {
			// 	height: 20vh;
			// }
			.right_content {
				// height: 45vh;
				// margin: 2.5rem 0;
				position: relative;
				padding: 1.5rem;
				font-size: 1rem;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: #000000;
				width: 72vw;
				background: #ffffff;
				box-shadow: 0 2px 20px 0
					rgba(153, 119, 53, 0.29);
				border-radius: 8px;
				.title_name {
					height: 1.8rem;
					line-height: 1.8rem;
					margin-top: 0;
					border-bottom: 1.55px solid #d8d8d8;
					padding-bottom: inherit;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					font-size: 1.25rem;
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					.title_name_left {
						color: #333333;
					}
					.title_name_right {
						color: #999999;
						img {
							margin-right: 2rem;
							vertical-align: middle;
							margin-bottom: 7px;
						}
					}
				}

				.desc_content {
					display: flex;
					justify-content: space-between;
					flex-direction: row;
					padding-bottom: 2rem;
					.desc_left_content {
						.span_tips {
							display: block;
							height: 2rem;
							font-size: 1.5rem;
							margin-bottom: 0.5rem;
						}
						.span_action {
							height: 1.2rem;
							font-size: 0.89rem;
							color: #999999;
						}
					}
					.desc_right_content {
						float: right;
						.el-button--default:hover {
							color: #a63928;
						}
						img {
							vertical-align: middle;
							margin-right: 5px;
							margin-bottom: 1px;
						}

						.el-button--default {
							color: #a63928;
							border: 1.55px solid
								#a63928;
							border-radius: 154.84px;
							background-color: #ffffff;
							width: 7.5rem;
							height: 3rem;
						}
					}
				}
			}
		}
		.step_content {
			height: 14rem;
			.step_process {
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				font-family: PingFangSC-Regular;
				padding-bottom: 2.8rem;
				/deep/.el-progress-circle {
					width: 3.5rem !important;
					height: 3.5rem !important;
					line-height: 3.5rem !important;
				}
				.progress_circle {
					float: left;
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
					height: 80px;
					font-weight: 400;
					font-size: 0.89rem;
					color: #333333;
				}
				.step_left_process {
					width: 33%;
					/deep/.el-icon-check:before {
						content: '';
					}
				}
				.step_center_process {
					width: 33%;
				}
				.step_right_process {
					width: 33%;
				}
			}

			// .progress_circle svg > path:first-of-type {
			// 	stroke: red !important;
			// }
			// /deep/ .el-progress__text {
			// 	color: pink;
			// }
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
}
</style>