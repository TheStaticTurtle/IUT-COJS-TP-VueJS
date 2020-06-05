Vue.component("game", {
	data: function() {
		return {
			gameMaster: false,
			cheatMode: false,
			selected_street_model: 0,
			streets: [],
		}
	},
	props: ['title', 'streetsList'],
	template: `
		<div>\
			<h1>{{title}}</h1> \
			<div style="position: absolute; right:0px; top:0px;">
				<input type="checkbox" id="gameMasterCheckbox" v-model="gameMaster">
				<label for="gameMasterCheckbox">Game Master Mode</label>
				<div v-if="gameMaster == false">
					<input type="checkbox" id="cheatModeCheckbox" v-model="cheatMode">
					<label for="cheatModeCheckbox">Cheat mode</label>
				</div>
			</div>
			<div v-if="gameMaster"> \
				<gameMaster :streets="streets"></gameMaster>
			</div> \
			<div v-if="cheatMode && gameMaster == false" style="position: absolute; left:0px; bottom:0px;"> \
				<cheatMode></cheatMode>
			</div> \
			<div v-if="gameMaster == false"> \
				<players></players> \

				<label>Rue </label> \
				<select v-model="selected_street_model"> \
					<option v-for="(street,index) in streets" v-bind:value="index"> \
						{{ street.name }} \
					</option> \
				</select> \
				<shop v-if="streets[selected_street_model] != null" :boutiques-list="streets[selected_street_model].shops"></shop> \
			</div> \
		</div> \
	`,
	watch:{
		selected_street_model: function(newVal, oldVal) {
			this.$children[1].selected = 0;
		},
		gameMaster : function(newVal, oldVal) {
			if(newVal == true) {
				document.body.style.backgroundImage = `url(assets/bg_gamemaster.png)`;
			} else {
				document.body.style.backgroundImage = `url(assets/bg.png)`;
			}
		},
	},
	mounted() {
		// get all streets
		axios.get(url+'streets/get')
		.then(response => {
			this.streets.splice(0, this.streets.length);
			response.data.forEach((street, streetIndex) => {
				this.streets.push(new Street(street["_id"], street["name"], []));
				street["shops"].forEach((shop, shopIndex) => {
					//console.log("Adding " + shop["name"] + " to " + this.streets[streetIndex].name);
					this.streets[streetIndex].shops.push(new Shop(shop["_id"], shop["name"], []));
					shop["items"].forEach((item, itemIndex) => {
						this.streets[streetIndex].shops[shopIndex].items.push(new Item(item["_id"], item["name"], item["type"], item["price"], item["effect"], "assets/fireball.png"));
					});
				});
			});
		})
	}
});
