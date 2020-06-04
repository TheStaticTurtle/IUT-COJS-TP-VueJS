Vue.component("game", {
	data: function() {
		return {
		} 
	},
	props: ['title', 'playerList', 'boutiquesList', 'gameMaster'],
	template: `
		<div>\
			<h1>{{title}}</h1> \
			<div style="position: absolute; right:0px; top:0px;">
				<input type="checkbox" id="gameMasterCheckbox" v-model="gameMaster">
				<label for="gameMasterCheckbox">Game Master Mode</label>
			</div>
			<div v-if="gameMaster"> \
				<form @submit="newItem">
					<p>
						<label for="itemName">Name: </label>
						<input type="text" id="itemName" v-model="itemName" name="itemName">
					</p>
				</form>
			</div> \
			<div v-if="gameMaster == false"> \
				<players :player-list="playerList"></players> \
				<shop :boutiques-list="boutiquesList"></shop> \
			</div> \
		</div> \
	`
});
