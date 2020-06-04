Vue.component("shopItems", {
	props: [ 'shop' ],
	template: `
	<div>\
		<ol> \
			<li v-for="(it,index) in shop.items" >{{it.name}} <button v-on:click="buy(it)">{{it.price}} gp</button></li> \
		</ol> \
	</div>
	`,
	methods: {
		buy : function(item) {
			//personnages[0].items.push(items[id])
			//console.log(this.$parent.$parent);

			//selected_street = this.$parent.$parent.selected_street;
			//shopid = this.$parent.$parent.$children[1].selected;
			if(this.$parent.$parent.$children[0].persos[this.$parent.$parent.$children[0].selected].buy(item)) {
				this.$props.shop.items.splice(this.$props.shop.items.indexOf(item),1);
			}
		}
	}
});
