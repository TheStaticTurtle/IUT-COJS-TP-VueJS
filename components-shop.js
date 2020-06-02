Vue.component("shop", {
	data: function() {
		return {
			/*nbShow : 100,
			selNums : "",
			selItems : [],
			selNames : "",*/


			selected: "0",
      boutique: boutiques[0],
		}
	},
	props: [ 'boutiquesList' ],
	template: `
		<div>\
			<label>Boutique </label> \
			<select v-model="selected"> \
				<option v-for="(boutique,index) in boutiquesList" v-bind:value="index"> \
					{{ boutique.name }} \
				</option> \
			</select> \ 

			<shop-items :item-list="boutique.items"></shop-items> \
		</div>
	`,
	watch:{
		selected : function(newVal, oldVal) {
      this.boutique = boutiques[newVal];
		}
	},
	/*methods: {
		remove : function(id) {
			//this.selItems.forEach(e=> { let idx=items.indexOf(e); items.splice(idx,1); });
			//this.selNums="";
			//this.$emit('items-removed',this.selNames); // send an event to parent.
		}
	},
	watch:{
		selNums : function(newVal, oldVal) {
			let lst = newVal.split(",");
			this.selNames = "";
			this.selItems = [];
			lst.forEach(e => {if ((e-1<this.nbShow) && (items[e-1] != undefined) && (this.selItems.indexOf(items[e-1]) == -1)) {
				this.selNames += items[e-1].name+" ";
				this.selItems.push(items[e-1]);
			}});
		}
	},*/
});
