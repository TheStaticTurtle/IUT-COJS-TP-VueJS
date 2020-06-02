Vue.component("shopItems", {
	props: [ 'itemList' ],
	template: `
	<div>\
		<ol> \
			<li v-for="(it,index) in itemList" >{{it.name}} <button v-on:click="buy(index)">{{it.price}} gp</button></li> \
		</ol> \
	</div>
	`,
	methods: {
		buy : function(id) {
			//personnages[0].items.push(items[id])
			//this.$emit('items-bought',id); // send an event to parent.
			//console.log(this.$parent.$parent);
			items = this.$parent.$parent.$children[1].boutique.items;
			if(this.$parent.$parent.$children[0].player.buy(items[id])) {
				items.splice(id,1);
			}
		}
	}
});
