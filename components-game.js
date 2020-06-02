Vue.component("game", {
	data: function() {
		return {
		} 
	},
	props: [ 'title', 'itemList','playerList','boutiquesList' ],
	template: `
		<div>\
			<h1>{{title}}</h1> \
      <players :player-list="playerList"></players> \
      <shop :boutiques-list="boutiquesList"></shop> \
		</div>
	`
});
