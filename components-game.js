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
				
			</div> \
			<div v-if="gameMaster == false"> \
				<players :player-list="playerList"></players> \
				<shop :boutiques-list="boutiquesList"></shop> \
			</div> \
		</div> \
	`
});
