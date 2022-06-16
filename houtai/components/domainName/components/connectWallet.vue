<template>
    <div class="dialog_connect_wallet">
        <div class="left_content">
            <el-avatar
                v-if="selectedAccount"
                class="content_left_img"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <div
                class="content_right_text"
                v-if="selectedAccount"
            >
                <p class="wallet_text">
                    {{(selectedAccount && selectedAccount.length > 8) ? (selectedAccount.slice(0,4) + '...' + selectedAccount.slice(-4)) : selectedAccount}}
                </p>
                <li>{{i18n.main_net}}</li>
                <el-button
                    class="connect_wallet_btn"
                    @click="disconnectWallet"
                >{{i18n.connected}}</el-button>
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
		myEnsBtn() {
			this.$router.push({
				path: '/my/enslist',
			});
		},
		async connectWallet() {
			await onConnect(this);
			// this.selectedAccount = getAccount();
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
	},
};
</script>

<style lang="less">
.dialog_connect_wallet {
	.left_content {
		display: block;
		color: #999999;
		font-size: 0.9rem;
		font-weight: 400;
		left: 3rem;
		top: 4.5rem;
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
				font-size: 0.89rem;
			}
			.wallet_text {
				color: #666666;
				font-size: 1rem;
			}
			.connect_wallet_text {
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
	.bottom_text {
		top: 16rem;
		position: fixed;
		left: 3rem;
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
		.left_content {
			display: none;
			position: fixed;
			float: left;
			left: 3rem;
			top: 1rem;
			.content_left_img {
				height: 3.1rem;
				width: 3.1rem;
				float: left;
				margin-right: 20px;
				margin-top: 3.5rem;
			}
			.content_right_text {
				float: right;
				margin-top: 1rem;
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