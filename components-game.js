Vue.component("game", {
	data: function() {
		return {
			gameMaster: false,
			cheatMode: false,
		}
	},
	props: ['title', 'playerList', 'boutiquesList', 'itemCats'],
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
				<gameMaster></gameMaster>
			</div> \
			<div v-if="cheatMode && gameMaster == false" style="position: absolute; left:0px; bottom:0px;"> \
				<cheatMode></cheatMode>
			</div> \
			<div v-if="gameMaster == false"> \
				<players :player-list="playerList"></players> \
				<shop :boutiques-list="boutiquesList"></shop> \
			</div> \
		</div> \
	`,
	watch:{
		gameMaster : function(newVal, oldVal) {
			if(newVal == true) {
				document.body.style.backgroundImage = `url(assets/bg_gamemaster.png)`;
			} else {
				document.body.style.backgroundImage = `url(assets/bg.png)`;
			}
		},
	},
});
