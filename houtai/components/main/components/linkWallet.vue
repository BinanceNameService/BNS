<template>
    <div class="dialog_link_wallet">
        <el-dialog
            title="链接钱包"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            style="margin-top:10vh"
        >
            <el-radio-group
                v-model="radio4"
                size="mini"
            >
                <el-radio
                    label="1"
                    border
                >
                    <div class="radio_content_left">
                        <img
                            class="radio_img"
                            :src="metaMaskFoxPng"
                            alt=""
                        >
                        <span class="radio_text">Metamask</span>
                    </div>
                </el-radio>
                <el-radio
                    label="2"
                    border
                >
                    <div class="radio_content_right">
                        <img
                            class="radio_img"
                            :src="unnamedPng"
                            alt=""
                        >
                        <span class="radio_text">Tokenpocket</span>
                    </div>
                </el-radio>
            </el-radio-group>
            <span
                slot="footer"
                class="dialog-footer"
            >
                <el-button @click="cancleBtn">取消</el-button>
                <el-button
                    type="primary"
                    @click="saveSelectBtn"
                >确认</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import metaMaskFoxPng from 'img/MetaMask_Fox.png';
import unnamedPng from 'img/unnamed.png';
export default {
	props: ['openLinkShowFlag'],
	data() {
		return {
			dialogVisible: false,
			metaMaskFoxPng,
			unnamedPng,
			radio4: '1',
		};
	},
	mounted() {
		console.log('openLinkShowFlag', this.openLinkShowFlag);
		this.dialogVisible = this.openLinkShowFlag;
	},
	methods: {
		handleClose() {
			this.$parent.openLinkBtn(false);
		},
		cancleBtn() {
			this.$parent.openLinkBtn(false);
		},
		saveSelectBtn() {
			this.$parent.openLinkBtn(false);
		},
	},
};
</script>

<style lang="less">
.dialog_link_wallet {
	.el-dialog {
		width: 27.5rem;
		// height: 40vh;
		background: #eedfbd !important;
		border: 1px solid #ededed;
		box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.05);
		border-radius: 8px;
	}
	.el-radio {
		margin-right: 0;
	}
	.el-radio--mini.is-bordered {
		height: 9rem;
		width: 9rem;
		float: left;
		margin-right: 2rem;
	}
	.el-radio-group {
		display: flex;
		flex-direction: row;
		margin-left: 2rem;
	}
	.el-radio.is-bordered {
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 8px;
	}
	.el-dialog__body {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.el-radio.is-bordered.is-checked {
		border: 2px solid #a63928;
		box-sizing: border-box;
		border-radius: 8px;
	}
	.el-radio__inner {
		border: 1px solid #eedebd !important;
		background-color: #eedebd;
		border-radius: 8px;
	}
	.el-radio__input.is-checked .el-radio__inner {
		background-color: #eedebd;
	}
	.el-radio__inner::after {
		background-color: #eedebd;
	}

	.radio_content_left {
		display: flex;
		flex-direction: column;
		img {
			width: 3.5rem;
			margin: 0 auto;
		}
		.radio_text {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 1rem;
			color: #000000;
			text-align: center;
			margin-top: 2rem;
		}
	}

	.radio_content_right {
		padding-bottom: 1rem;
		display: flex;
		flex-direction: column;
		img {
			width: 5rem;
			margin: 0 auto;
		}

		.radio_text {
			font-family: PingFangSC-Regular;
			font-weight: 400;
			font-size: 1rem;
			color: #000000;
			margin-top: 0.5rem;
			text-align: center;
		}
	}

	.el-button {
		width: 7rem;
		height: 3rem;
	}
	.el-button--default:hover {
		color: #a63928;
	}

	.el-button--default {
		color: #a63928;
		border: 1.55px solid #a63928;
		border-radius: 154.84px;
		background-color: #eedebd;
	}
	.el-button--primary {
		border: 1.55px solid #a63928;
		border-radius: 154.84px;
		background-color: #a63928;
	}

	// .radio_content_left:active {
	// 	border: 2px solid #a63928 !important;
	// }
	// .radio_content_left:visited {
	// 	border: 1px solid blue;
	// }
}
</style>