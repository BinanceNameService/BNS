<template>
    <div class="pc_contact">
        <div
            class="bg_img_pc"
            :style="{ background: $store.state.language === 'CN' ?  'url(/houtai/img/联系工棚.png)' : 'url(/houtai/img/联系工棚EN.png)', 'background-size': '100% 100%'}"
        >
            <div class="contact_us tvps-font">
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://twitter.com/bnsdomains_?s=21&t=9-LTuHI_jTlzDOr4yDW0LA">@Brick_BSC</a>

                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://Brick_BSC@outlook.com">
                            Brick_BSC@outlook.com
                        </a>
                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://t.me/brickcn">
                            @Brickcn
                        </a>
                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://t.me/Gon9tou">
                            @Gon9tou
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div class="bg_img_mb">
            <!-- :style="{ background: $store.state.language === 'CN' ?  'url(/houtai/img/联系工棚.png)' : 'url(/houtai/img/联系工棚EN.png)', 'background-size': '100% 100%'}" -->
            <div class="contact_us tvps-font">
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://twitter.com/bnsdomains_?s=21&t=9-LTuHI_jTlzDOr4yDW0LA">@Brick_BSC</a>

                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://Brick_BSC@outlook.com">
                            Brick_BSC@outlook.com
                        </a>
                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://t.me/brickcn">
                            @Brickcn
                        </a>
                    </p>
                </div>
                <div class="top_div">
                    <p></p>
                </div>
                <div class="bottom_div">
                    <p>
                        <a href="https://t.me/Gon9tou">
                            @Gon9tou
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			bodyHeight: '',
		};
	},
	mounted() {
		this.bodyHeight =
			document.documentElement.clientHeight ||
			document.body.clientHeight;
		console.log('this.bodyHeight', this.bodyHeight);
	},
	computed: {
		i18n: function () {
			return this.$store.state.i18n[
				this.$store.state.language
			];
		},
	},
};
</script>

<style lang="less" scoped>
.pc_contact {
	width: 100%;
	margin: 0;
	padding: 0;
	.bg_img_pc {
		width: 100%;
		height: 100%;
		// background: url('img/联系工棚.png');
		// background-size: 100% 100%;
		position: absolute;
		display: block;
		.contact_us {
			// font-family: 'DINCond' !important;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			text-align: center;
			height: 80%;
			margin: 6% 8% 8% 37%;
			.top_div {
				height: 28%;
				display: flex;
				justify-content: center;
				align-items: center;
				// background-color: pink;
				// opacity: 0.3;
				// line-height: 10rem;
				p {
					font-size: 2rem;
					margin: auto;
					// margin: 0;
					// height: 50%;
					// margin-top: 25%;
					// displays
				}
			}
			.bottom_div {
				height: 22%;
				display: flex;
				justify-content: center;
				align-items: center;
				// background-color: blue;
				// opacity: 0.3;
				// line-height: 10rem;
				p {
					font-size: 2rem;
					margin: auto;
					a {
						color: #000000;
						text-decoration: none;
					}
					// margin: 0;
					// height: 50%;
					// margin-top: 25%;
					// display: flex;
					// justify-content: center;
					// align-items: center;
				}
			}
		}
	}
	.bg_img_mb {
		// display: none;
	}
	@media only screen and (max-width: 768px) {
		.bg_img_pc {
			display: none;
		}
		.bg_img_mb {
			width: 100%;
			height: 100%;
			background: url('img/imgmb/联系我们备份2.png');
			background-size: 100% 100%;
			position: absolute;
			display: block;
			.contact_us {
				// font-family: 'DINCond' !important;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				text-align: center;
				height: 100%;
				margin: 0;
				.top_div {
					height: 22%;
					display: flex;
					justify-content: center;
					align-items: center;
					// line-height: 10rem;
					p {
						font-size: 1.3rem;
						// margin: 0;
						// height: 50%;
						// margin-top: 25%;
						// displays
					}
				}
				.bottom_div {
					height: 28%;
					display: flex;
					justify-content: center;
					align-items: center;
					// line-height: 10rem;
					p {
						font-family: 'DINCond' !important;
						font-size: 1.3rem;
						a {
							color: #000000;
							text-decoration: none;
						}
						// margin: 0;
						// height: 50%;
						// margin-top: 25%;
						// display: flex;
						// justify-content: center;
						// align-items: center;
					}
				}
			}
		}
	}
}
</style>