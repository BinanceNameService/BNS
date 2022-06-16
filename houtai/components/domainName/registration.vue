<template>
    <div class="pc_registration">
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
                            <el-radio
                                v-model="selectRadio"
                                :label="item.label"
                            > </el-radio>
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
                    <el-input
                        class="domian_input_search"
                        placeholder="请输入域名或地址"
                        v-model="domainInput"
                        :style="{ 'border-left': domainInput ? '4px solid #a63928' : 0 }"
                    >
                        <div
                            slot="suffix"
                            class="input_slot_suffix"
                        >
                            <span>可注册</span>
                            <img
                                :src="collectionPng"
                                alt=""
                            >
                        </div>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchPng from 'img/搜索.png';
import collectionPng from 'img/收藏.png';
import collectionSelPng from 'img/收藏.sel.png';
import cutJpg from 'img/cut.jpg';
import miniPng from 'img/701651807815_.png';
import aboutPng from 'img/关于我们.png';
import unnamedPng from 'img/unnamed.png';
import connectWallet from './components/connectWallet.vue';
// import { onDisconnect } from 'houtai/web3_eth.js';
export default {
	components: { connectWallet },
	data() {
		return {
			openLinkShowFlag: false,
			domainInput: '',
			domainSearch: '',
			searchPng,
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
			// this.openLinkShowFlag = flag;
			onDisconnect();
		},
	},
};
</script>

<style lang="less" scoped>
.pc_registration {
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
			p {
				height: 25vh;
			}
			div {
				margin-bottom: 1.2rem;
				font-family: PingFangSC-Medium;
				font-weight: 500;
				font-size: 1.4rem;
				color: #000000;
			}
			/deep/.el-input-group__append {
				border-left: 0;
				width: 6rem;
				text-align: center;
				background: #a63928;
				border-radius: 4px;
				color: #ffffff;
			}
			/deep/.el-input-group__append:hover {
				border-left: 0;
				width: 6rem;
				text-align: center;
				opacity: 0.7;
				background: #a63928;
				border-radius: 4px;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				font-size: 1.2rem;
				color: #ffffff;
			}
			.domian_input_search {
				/deep/.el-input__prefix {
					left: 35px;
					transition: all 0.3s;
					line-height: 7.1rem;
				}

				/deep/.el-input__inner {
					height: 6rem !important;
					line-height: 6rem !important;
					background: #ffffff;
					border: 0;
					border-top-left-radius: 8px;
					border-bottom-left-radius: 8px;
					padding-left: 2.2rem !important;
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
			.input_slot_suffix {
				font-size: 1.2rem;
				height: 6rem !important;
				line-height: 6rem !important;
				span {
					color: #999999;
				}
				img {
					height: 1.4rem;
					width: 1.5rem;
					margin: 0 2.1rem;
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
	}
}
</style>