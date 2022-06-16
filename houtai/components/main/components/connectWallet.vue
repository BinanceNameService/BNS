<template>
    <div class="dialog_connect_wallet_index">
        <div class="title_wallet_callus">
            <div class="left_content">
                <div class="unconnect_right">
                    <el-avatar
                        v-if="selectedAccount"
                        class="content_left_img"
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                    ></el-avatar>
                    <div
                        class="uncontent_right_text"
                        v-if="selectedAccount"
                    >
                        <p class="unwallet_text">
                            {{(selectedAccount && selectedAccount.length > 8) ? (selectedAccount.slice(0,4) + '...' + selectedAccount.slice(-4)) : selectedAccount}}
                        </p>
                        <li>{{i18n.main_net}}</li>
                        <el-button
                            class="unconnect_wallet_btn"
                            @click="disconnectWallet"
                        >{{i18n.connected}}</el-button>
                    </div>
                </div>
                <div
                    class="content_right_text"
                    v-if="!selectedAccount"
                >
                    <p class="connect_wallet_text">{{i18n.connectwallet}}</p>
                    <el-button
                        class="connect_wallet_btn"
                        @click="connectWallet"
                    >{{i18n.connect}}</el-button>
                </div>

            </div>
            <div :class="{right_text: $store.state.language === 'EN' || $store.state.language === 'CN',right_text_en_block: $store.state.language === 'EN'}">
                <span @click="openContactBtn">{{i18n.contactus_title}}</span>
                <span @click="myEnsBtn">{{i18n.mybns}}</span>
            </div>
            <!-- <div
                class="right_text_cn"
                v-if="$store.state.language === 'CN'"
            >
                <span @click="openContactBtn">{{i18n.contactus_title}}</span>
                <span @click="myEnsBtn">{{i18n.mybns}}</span>
            </div> -->
        </div>
        <div class="bottom_text">
            <p @click="myEnsBtn">
                <img
                    :src="namePng"
                    alt=""
                >
                <span>{{i18n.mydomain}}</span>
            </p>
            <p>
                <img
                    :src="aboutPng"
                    alt=""
                >
                <span>{{i18n.contactus_left}}</span>
            </p>

        </div>
    </div>
</template>

<script>
import aboutPng from 'img/关于我们.png';
import namePng from 'img/域名.png';
import { onConnect, onDisconnect, getAccount, init } from 'houtai/web3_eth.js';
export default {
	// props: ['openLinkShowFlag'],
	data() {
		return {
			selectedAccount: '',
			aboutPng,
			namePng,
		};
	},

	mounted() {
		window.addEventListener('beforeunload', (e) => {
			localStorage.setItem('STATUS', '');
			// localStorage.setItem('STATUS', this.selectedAccount);
			// delete localStorage.getItem('STATUS');
		});
		window.addEventListener('load', async () => {
			init();
			if (localStorage.getItem('STATUS')) {
				await this.connectWallet();
			}
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
		openContactBtn() {
			console.log('联系工棚');
			this.$router.push({
				path: 'contactus',
			});
		},
		myEnsBtn() {
			if (this.selectedAccount) {
				this.$router.push({
					path: '/my/enslist',
				});
			} else {
				alert(
					this.$store.state.i18n[
						this.$store.state.language
					].please_connect_wallet,
				);
			}
		},
		async connectWallet() {
			await onConnect(this);
			let account = getAccount();
			this.selectedAccount = account || '';
			localStorage.setItem('STATUS', this.selectedAccount);
		},
		async disconnectWallet() {
			onDisconnect();
			this.selectedAccount = '';
			localStorage.setItem('STATUS', this.selectedAccount);
		},
	},
};
</script>

<style lang="less">
.dialog_connect_wallet_index {
	.title_wallet_callus {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 9rem;
		.left_content {
			display: flex;
			flex-direction: row;
			.unconnect_right {
				padding-left: 5rem;
				padding-top: 3rem;
				.content_left_img {
					height: 2.5rem;
					width: 2.5rem;
					float: left;
					margin-right: 0.5rem;
					margin-top: 1rem;
				}
			}
			.uncontent_right_text {
				margin-left: 2.5rem;
				p {
					margin-bottom: 6px;
				}
				li {
					margin-bottom: 9px;
					font-size: 0.89rem;
				}
				.unwallet_text {
					color: #666666;
					font-size: 1rem;
				}
				.unconnect_wallet_btn {
					height: 2.8rem;
					line-height: 2.8rem;
					padding: 0 2.5rem;
					border: 2px solid #a63928;
					background: #eee0bd;
					color: #a63928;
					// margin: 0px 5px;
					border-radius: 4px;
				}
			}
			.content_right_text {
				padding-top: 4rem;
				font-family: PingFangSC-Regular;
				p {
					margin-bottom: 9px;
				}
				li {
					margin-bottom: 9px;
					font-size: 0.89rem;
				}
				.wallet_text {
					color: #666666;
					font-size: 1rem;
				}
				.connect_wallet_text {
					margin-top: 9px;
					color: #000000 !important;
				}
				.connect_wallet_btn {
					height: 2.8rem;
					line-height: 2.8rem;
					padding: 0 2.5rem;
					border: 2px solid #a63928;
					background: #eee0bd;
					color: #a63928;
					// margin: 0px 5px;
					border-radius: 4px;
				}
			}
		}
		.right_text {
			font-size: 1rem;
			color: #000000;
			margin-top: 4rem;
			margin-right: 6rem;
			span {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				margin-right: 4px;
				height: 2rem;
				line-height: 2rem;
			}
		}
		.right_text_en_block {
			span {
				margin-left: 0.3rem;
				display: inline;
			}
		}
	}
	.bottom_text {
		top: 13rem;
		position: fixed;
		left: 6rem;
		p {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 1.3rem;
			color: #a63928;
			height: 2rem;
			line-height: 2rem;
			img {
				vertical-align: middle;
				margin-bottom: 5px;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		.title_wallet_callus {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 8rem;
			.left_content {
				display: flex;
				flex-direction: row;
				.unconnect_right {
					padding: 1rem 0 0 2rem;
					.content_left_img {
						height: 2.5rem;
						width: 2.5rem;
						float: left;
						margin-right: 0.5rem;
						margin-top: 1rem;
					}
				}
				.uncontent_right_text {
					margin-left: 2.5rem;
					p {
						margin-bottom: 6px;
					}
					li {
						margin-bottom: 9px;
						font-size: 0.89rem;
					}
					.unwallet_text {
						color: #666666;
						font-size: 1rem;
					}
					.unconnect_wallet_btn {
						height: 2rem;
						line-height: 2rem;
						padding: 0 2.3rem;
						border-radius: 8px;
					}
				}
				.content_right_text {
					padding: 2rem 0 0 1rem;
					p {
						margin-bottom: 9px;
					}
					li {
						margin-bottom: 9px;
						font-size: 0.89rem;
					}
					.wallet_text {
						color: #666666;
						font-size: 1rem;
					}
					.connect_wallet_text {
						margin-top: 9px;
						color: #000000 !important;
					}
					.connect_wallet_btn {
						height: 2rem;
						line-height: 2rem;
						padding: 0 3.3rem;
						border-radius: 8px;
					}
				}
			}
			.right_text {
				font-size: 1rem;
				color: #997836;
				margin-top: 2.3rem;
				margin-right: 2rem;
				padding-top: 0px;
				span {
					font-family: PingFangSC-Regular;
					font-weight: 400;
					margin-right: 4px;
				}
			}
			.right_text_en_block {
				span {
					display: block;
				}
			}
		}
		.bottom_text {
			display: none;
			top: 13rem;
			position: fixed;
			left: 6rem;
			p {
				font-family: PingFangSC-Regular;
				font-weight: 400;
				font-size: 1.3rem;
				color: #a63928;
				height: 2rem;
				line-height: 2rem;
				img {
					vertical-align: middle;
					margin-bottom: 5px;
				}
			}
		}
	}
}
</style>