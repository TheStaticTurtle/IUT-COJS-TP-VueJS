Vue.component("gameMaster", {
	data: function() {
		return {
			itemCats: itemCats,
			itemName: null,
			itemCat: null,
			itemPrice: null,
			itemStreet: 0,
			itemBoutique: 0,
			itemEffect: null,
			playerName: null,
			playerLevel: null,
			playerGP: null,
			playerVitality: null,
			playerStrength: null,
			playerArmor: null,
			itemErrors: [],
			playerErrors: []
		}
	},
	props: ["streets"],
	template: `
	<div>
		<div style="border: solid; text-align: center">\
			<h2>New Item</h2>
		<p>
			<label for="itemName">Name: </label>
			<input type="text" id="itemName" v-model="itemName" name="itemName" required>
		</p>

		<p>
			<label for="itemCat">Category: </label>
			<select id="itemCat" v-model="itemCat" name="itemCat">
				<option v-for="cat in itemCats" v-bind:value="cat">
					{{ cat }}
				</option>
			</select>
		</p>

		<p>
		  <label for="itemPrice">Price: </label>
		  <input type="number" id="itemPrice" v-model="itemPrice" name="itemPrice" required>
		</p>

		<p>
			<label for="itemEffect">Effect: </label>
			<input type="text" id="itemEffect" v-model="itemEffect" name="itemEffect" required>
		</p>

		<p>
		  <label for="itemStreet">Rue: </label>
		  <select id="itemStreet" v-model="itemStreet" name="itemStreet">
			<option v-for="(street, index) in streets" v-bind:value="index">
			  {{ street.name }}
			</option>
		  </select>
		</p>

		<p>
		  <label for="itemBoutique">Boutique: </label>
		  <select v-if="streets[itemStreet] != null" id="itemBoutique" v-model="itemBoutique" name="itemBoutique">
			<option v-for="(boutique, index) in streets[itemStreet].shops" v-bind:value="index">
			  {{ boutique.name }}
			</option>
		  </select>
		</p>

		<p>
		  <input type="submit" value="Create item" v-on:click="checkItemForm">
		</p>
		</div>

	  <div style="border: solid; text-align: center">\
			<h2>New Player</h2> 
		<p>
		  <label for="playerName">Name: </label>
		  <input type="text" id="playerName" v-model="playerName" name="playerName" required>
		</p>

		<p>
		  <label for="playerLevel">Level: </label>
		  <input type="number" id="playerLevel" v-model="playerLevel" name="playerLevel" required>
		</p>

		<p>
		  <label for="playerGP">GP: </label>
		  <input type="number" id="playerGP" v-model="playerGP" name="playerGP" required>
		</p>

		<p>
		  <label for="playerVitality">Vitality: </label>
		  <input type="number" id="playerVitality" v-model="playerVitality" name="playerVitality" required>
		</p>

		<p>
		  <label for="playerStrength">Strength: </label>
		  <input type="number" id="playerStrength" v-model="playerStrength" name="playerStrength" required>
		</p>

		<p>
		  <label for="playerArmor">Armor: </label>
		  <input type="number" id="playerArmor" v-model="playerArmor" name="playerArmor" required>
		</p>

		<p>
		  <input type="submit" value="Create player" v-on:click="checkPlayerForm">
		</p>
		</div>
	</div>
	`,
	watch:{
		itemStreet: function(newVal, oldVal) {
			this.itemBoutique = 0;
		}
	},
	methods: {
		checkItemForm: function(e) {
			this.itemErrors = [];
			if (this.itemName && this.itemCat && this.itemPrice != null && this.itemBoutique != null && this.itemEffect != null) {
				console.log("boutiques["+this.itemBoutique+"].items.push(new Item(0, "+this.itemName+", +"+this.itemCat+", "+this.itemPrice+", 'A+10', 'assets/helmet.png'));");
				//boutiques[this.itemBoutique].items.push(new Item(0, this.itemName, this.itemCat, this.itemPrice, '', "assets/helmet.png"));

				let data = {
					name: this.itemName,
					type: this.itemCat,
					price: parseInt(this.itemPrice),
					effect: this.itemEffect
				};

				console.log(data);

				axios.post(url+'items/create', data)
				.then(response => {
					console.log(response);
					if (response.data.err == 1) {
						alert("Cannot create item: " + response.data.data);
					}
					else {
						var item = response.data.data;
						let shopData = {
							idShop: this.streets[this.itemStreet].shops[this.itemBoutique].id,
							idItem: item["_id"]
						};
						axios.put(url+'shops/additem', shopData)
						.then(response => {
							console.log(response);
							if (response.data.err == 1) {
								alert("Cannot add item to boutique: " + response.data.data);
							}
							else {
								alert("Item created!");
								this.streets[this.itemStreet].shops[this.itemBoutique].items.push(new Item(item["_id"], this.itemName, this.itemCat, this.itemPrice, this.itemEffect, ""));
							}
						})
						
					}
				})

				return;
			}
			if (!this.itemName){
				this.itemErrors.push("Item name required.");
			}
			if (!this.itemCat){
				this.itemErrors.push("Item category required.");
			}
			if (this.itemPrice == null){
				this.itemErrors.push("Item price required.");
			}
			if (this.itemBoutique == null){
				this.itemErrors.push("Item boutique required.");
			}
			if (this.itemEffect == null){
				this.itemErrors.push("Item effect required.");
			}
		},
		checkPlayerForm: function(e) {
			this.playerErrors = [];
			if (this.playerName && this.playerGP) {

				let playerData = {
					name: this.playerName,
					level: parseInt(this.playerLevel),
					gold: parseInt(this.playerGP),
					life: parseInt(this.playerLevel),
					vitality: parseInt(this.playerVitality),
					strength: parseInt(this.playerStrength),
					armor: parseInt(this.playerArmor)
				};

				axios.post(url+'persos/create', playerData)
				.then(response => {
					console.log(response);
					if (response.data.err == 1) {
						alert("Cannot create player: " + response.data.data);
					}
					else {
						alert("Player created!");
					}
				})
			}
		}
	}
});
