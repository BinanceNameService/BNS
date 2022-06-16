<template>
    <div class="pc_registration_info">
        <div
            class="bg_img"
            :style="{height: bodyHeight+ 'px'}"
        >
            <titleEnsSearch @changeEnsText="changeEnsText"></titleEnsSearch>
            <connectWallet></connectWallet>
            <div class="ens_name_info">
                <div class="right_content">
                    <div class="content_bottom">
                        <p>
                            <span>{{i18n.bns_details}}</span>
                        </p>
                        <div
                            class="checkbox_bottom"
                            v-if="domianNameList"
                        >
                            <div
                                class="checkbox_content"
                                v-for="(item, index) in domianNameList"
                                :label="item.domianName"
                                :key="index"
                            >
                                <div class="content_left_desc">
                                    <span>{{i18n.domain}}{{item.domianName}}</span>
                                    <span>{{i18n.administrator}}{{item.owner}}</span>
                                    <span>{{i18n.owner}}{{item.holder}}</span>
                                    <span>{{i18n.registration_period}}{{item.years}}</span>
                                    <span>{{i18n.expiration}}{{item.resisterTime}}</span>
                                    <span>{{i18n.registration_time}}{{item.expireTime}}</span>
                                </div>
                            </div>

                        </div>
                        <div
                            v-if="!domianNameList || domianNameList.length == 0"
                            style="text-align:center; padding-bottom:20px;"
                        >{{i18n.no_data}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import connectWallet from './components/connectWallet.vue';
import titleEnsSearch from './components/titleEnsSearch.vue';
import registered from 'houtai/components/main/components/registered.vue';
import { getNode } from 'houtai/web3_eth.js';
export default {
	components: { connectWallet, registered, titleEnsSearch },
	data() {
		return {
			bodyHeight: '',
			domianNameList: [],
		};
	},
	mounted() {
		this.bodyHeight =
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		this.ensName = this.$route.query.text || '';
		this.getNode(this.ensName);
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},
	methods: {
		async getNode() {
			let record = await getNode(this.ensName);
			console.log('getNode record:', record);
			let nodeInfo = record.info;
			var nodeShowInfo = {
				domianName: this.ensName + '.bsc',
				holder: record.holder,
				owner: record.owner,
				resisterTime: this.dateFormat(
					nodeInfo.register_time,
				),
				expireTime: this.dateFormat(
					nodeInfo.expired_time,
				),
				years:
					(nodeInfo.expired_time -
						nodeInfo.register_time) /
					(86400 * 365),
				// collection: false,
				checkbox: false,
			};
			this.domianNameList = [];
			this.domianNameList.push(nodeShowInfo);
			console.log('ens info:', this.domianNameList);
		},
		changeEnsText(text) {
			console.log('changeEnsText: ', text);
			this.ensName = text;
			this.getNode();
		},
		dateFormat(timestamp) {
			let date = new Date(timestamp * 1000);
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? '0' + MM : MM;
			let d = date.getDate();
			d = d < 10 ? '0' + d : d;
			let h = date.getHours();
			h = h < 10 ? '0' + h : h;
			let m = date.getMinutes();
			m = m < 10 ? '0' + m : m;
			let s = date.getSeconds();
			s = s < 10 ? '0' + s : s;
			return (
				y +
				'-' +
				MM +
				'-' +
				d +
				' ' +
				h +
				':' +
				m +
				':' +
				s
			);
		},
	},
};
</script>

<style lang="less" scoped>
.pc_registration_info {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img {
		width: 100%;
		// height: 100%;
		background: url('img/bg3.png');
		background-size: 100% 100%;
		position: absolute;

		.ens_name_info {
			width: 70%;
			margin: 4rem 7% 0 23%;
			p {
				margin-bottom: 20px;
				margin-top: 6px;
			}
			.right_content {
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
				.content_bottom {
					padding: 1rem 2.1rem 0 2.1rem;
					p {
						font-family: PingFangSC-Semibold;
						font-weight: 600;
						font-size: 22px;
						color: #a63928;
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						margin-top: 0;
						.el-button--primary {
							border: 1.55px solid
								#a63928;
							border-radius: 154.84px;
							background-color: #a63928;
							width: 12rem;
							height: 3rem;
						}
					}
					.checkbox_bottom {
						width: 100%;
						height: 100%;
						max-height: 25rem;
						overflow: scroll;
						.checkbox_content {
							// border-bottom: 1px solid
							// 	#d8d8d8;
							// height: 7rem;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							.content_left_desc {
								p {
									font-family: PingFangSC-Semibold;
									font-weight: 600;
									font-size: 1.2rem;
									color: #000000;
									margin-bottom: 8px;
								}
								span {
									font-family: PingFangSC-Regular;
									font-weight: 400;
									font-size: 0.89rem;
									color: #999999;
									display: block;
									margin-bottom: 8px;
								}
							}
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
			.ens_name_info {
				width: 80%;
				margin: 10%;
				margin-top: 9.5rem;
				height: 70%;
				overflow: scroll;

				p {
					margin-bottom: 20px;
					margin-top: 6px;
				}
				.right_content {
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
					border-radius: 8px;
					.content_bottom {
						padding: 1rem 2.1rem 0 2.1rem;
						p {
							font-family: PingFangSC-Semibold;
							font-weight: 600;
							font-size: 22px;
							color: #a63928;
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							margin-top: 0;
							.el-button--primary {
								border: 1.55px
									solid
									#a63928;
								border-radius: 154.84px;
								background-color: #a63928;
								width: 12rem;
								height: 3rem;
							}
						}

						.checkbox_bottom {
							width: 100%;
							height: 100%;
							// max-height: 28rem;
							// overflow: scroll;
							.checkbox_content {
								border-bottom: 1px
									solid
									#d8d8d8;
								// height: 7rem;
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								.content_left_desc {
									p {
										font-family: PingFangSC-Semibold;
										font-weight: 600;
										font-size: 1.2rem;
										color: #000000;
										margin-bottom: 8px;
									}
									span {
										font-family: PingFangSC-Regular;
										font-weight: 400;
										font-size: 0.89rem;
										color: #999999;
										display: block;
										margin-bottom: 8px;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}
</style>