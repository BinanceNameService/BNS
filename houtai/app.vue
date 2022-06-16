<template>
    <div>
        <router-view :key="key"></router-view>
    </div>
</template>

<script>
export default {
	data() {
		return {
			key: new Date().getTime(),
		};
	},
	watch: {
		key: function () {
			this.key = new Date().getTime();
			console.log('this.key', this.key);
		},
	},
	/* methods:{
        test:function(){
            let a= data=>{
                console.log(2)
            };
            return a
        }
    }*/
};
</script>

<style>
h1 {
	font-size: 100px;
}
</style>


