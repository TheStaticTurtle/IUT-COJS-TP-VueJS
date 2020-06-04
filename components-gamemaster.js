Vue.component("gameMaster", {
	data: function() {
		return {
      boutiques: boutiques,
      itemCats: itemCats,
      itemName: null,
      itemCat: null,
      itemPrice: null,
      itemBoutique: null,
      playerName: null,
      playerGP: null,
      itemErrors: [],
      playerErrors: []
		}
	},
	props: [],
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
          <label for="itemBoutique">Boutique: </label>
          <select id="itemBoutique" v-model="itemBoutique" name="itemBoutique">
            <option v-for="(boutique, index) in boutiques" v-bind:value="index">
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
          <label for="playerGP">GP: </label>
          <input type="number" id="playerGP" v-model="playerGP" name="playerGP" required>
        </p>

        <p>
          <input type="submit" value="Create player" v-on:click="checkPlayerForm">
        </p>
  		</div>
    </div>
	`,
  methods: {
    checkItemForm: function(e) {
      this.itemErrors = [];
      if (this.itemName && this.itemCat && this.itemPrice != null && this.itemBoutique != null) {
        //console.log("boutiques["+this.itemBoutique+"].items.push(new Item(0, "+this.itemName+", +"+this.itemCat+", "+this.itemPrice+", 'A+10', 'assets/helmet.png'));");
        boutiques[this.itemBoutique].items.push(new Item(0, this.itemName, this.itemCat, this.itemPrice, '', "assets/helmet.png"));
        alert("Created item "+this.itemName+"!");
        return;
      }
      if (!this.itemName){
        this.itemErrors.push("Item name required.")
      }
      if (!this.itemCat){
        this.itemErrors.push("Item category required.")
      }
      if (this.itemPrice == null){
        this.itemErrors.push("Item price required.")
      }
      if (this.itemBoutique == null){
        this.itemErrors.push("Item boutique required.")
      }
    },

    checkPlayerForm: function(e) {
      this.playerErrors = [];
      if (this.playerName && this.playerGP) {
        personnages.push(new Perso(this.playerName, 1, this.playerGP));
        alert("Created player " + this.playerName + "!");
        return;
      }
    }
  }
});
