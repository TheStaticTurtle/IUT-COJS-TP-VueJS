Vue.component("cheatMode", {
	data: function() {
		return {
		}
	},
	props: [],
	template: `
		<div>
			<h3>Cheat mode</h3>
      <div>
        <button v-on:click="changeGD(-50)" class="btn btn-info">-50</button>
        <button v-on:click="changeGD(-10)" class="btn btn-info">-10</button>
        <button v-on:click="changeGD( -5)" class="btn btn-info">-5</button>
        <button v-on:click="GD( -1)" class="btn btn-info">-1</button>
        <img style="height:32px; padding:5px 10px 5px 10px" src="assets/gold.png"><img>
        <button v-on:click="changeGD( +1)" class="btn btn-info">+1</button>
        <button v-on:click="changeGD( +5)" class="btn btn-info">+5</button>
        <button v-on:click="changeGD(+10)" class="btn btn-info">+10</button>
        <button v-on:click="changeGD(+50)" class="btn btn-info">+50</button>
      </div>
      <div>
        <button v-on:click="changeHP(-50)" class="btn btn-info">-50</button>
        <button v-on:click="changeHP(-10)" class="btn btn-info">-10</button>
        <button v-on:click="changeHP( -5)" class="btn btn-info">-5</button>
        <button v-on:click="changeHP( -1)" class="btn btn-info">-1</button>
        <img style="height:32px; padding:5px 10px 5px 10px" src="assets/hearth.png"><img>
        <button v-on:click="changeHP( +1)" class="btn btn-info">+1</button>
        <button v-on:click="changeHP( +5)" class="btn btn-info">+5</button>
        <button v-on:click="changeHP(+10)" class="btn btn-info">+10</button>
        <button v-on:click="changeHP(+50)" class="btn btn-info">+50</button>
      </div>
      <div>
        <button v-on:click="changeLVL(-50)" class="btn btn-info">-50</button>
        <button v-on:click="changeLVL(-10)" class="btn btn-info">-10</button>
        <button v-on:click="changeLVL( -5)" class="btn btn-info">-5</button>
        <button v-on:click="changeLVL( -1)" class="btn btn-info">-1</button>
        <img style="height:32px; padding:5px 10px 5px 10px" src="assets/xp.png"><img>
        <button v-on:click="changeLVL( +1)" class="btn btn-info">+1</button>
        <button v-on:click="changeLVL( +5)" class="btn btn-info">+5</button>
        <button v-on:click="changeLVL(+10)" class="btn btn-info">+10</button>
        <button v-on:click="changeLVL(+50)" class="btn btn-info">+50</button>
      </div>
		</div>
	`,
  methods: {
    changeLVL: function(step) {
      this.$parent.$children[0].persos[this.$parent.$children[0].selected].level += step
    },
    changeHP: function(step) {
      this.$parent.$children[0].persos[this.$parent.$children[0].selected].health += step
    },
    changeGD: function(step) {
      this.$parent.$children[0].persos[this.$parent.$children[0].selected].gold += step
    }
  }
});
