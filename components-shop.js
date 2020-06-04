Vue.component("shop", {
	data: function() {
		return {
			/*nbShow : 100,
			selNums : "",
			selItems : [],
			selNames : "",*/
			selected: "0",
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

			<shop-items :shop="boutiquesList[selected]" ></shop-items> \
		</div>
	`,

});
