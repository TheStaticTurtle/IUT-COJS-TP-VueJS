/*


			<div :style="{position: 'absolute', left:'calc((100% - (64px * ' + persos[selected].items.length + ')) / 2)', right:'calc((100% - (64px * ' + persos[selected].items.length + ')) / 2)'}"> \
		 	 <table class="table table-bordered" style="border: 3px solid #292b2c"> \
		 		 <tr> \
		 			 <th class="p-0 playerinventory" scope="col" v-for="(it,index) in persos[selected].items"> \
		 				 <div class="h-100" v-if="it != null"> \
		 					 <a data-toggle="tooltip" v-bind:title="it.name" > \
		 						 <img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="it.img"></img> \
		 					 </a> \
		 				 </div>\
		 			 </th> \
		 		 </tr> \
		 	 </table> \
		  </div> \



			*/
Vue.component("players", {
	data: function() {
		return {
			selected: 0,
			persos: [],
			renderComponent: true
		}
	},
	template: `
	<div v-if="renderComponent">\
		<label>Joueur: </label> \
		<select v-model="selected"> \
			<option v-for="(player, index) in persos" v-bind:value="index"> \
				{{ player.name }} \
			</option> \
		</select> \

		<div v-if="persos[selected] != null" style="position: absolute; left:calc((100% - (64px * 6)) / 2); right:calc((100% - (64px * 6)) / 2); bottom:0px; ">\
			<h3> {{ persos[selected].name }} Lvl{{ persos[selected].level }}</h3>
			<div class="container-inline" style="padding-bottom: 10px">\
				<div class="row">\
					<div class="col">\
						<div class="progress"> \
							<img class="h-100" src="assets/strength.png" ></img> \
							<p>{{persos[selected].strength}} strength</p>
							<div class="progress-bar" style="background-color: #AA00FF" role="progressbar" :style="{width: persos[selected].strength/2500*100+'%'}" v-bind:aria-valuenow="persos[selected].strength" aria-valuemin="0" aria-valuemax="2500"></div> \
						</div> \
					</div>\
					<div class="col">\
					</div> \
				</div>\
				<div class="row" style="padding-top:5px">\
					<div class="col">\
						<div class="progress"> \
							<img class="h-100" src="assets/hearth_green.png" ></img> \
							<p>{{persos[selected].vitaliy}} vitality</p>
							<div class="progress-bar bg-success" role="progressbar" :style="{width: persos[selected].vitaliy/5500*100+'%'}" v-bind:aria-valuenow="persos[selected].vitaliy" aria-valuemin="0" aria-valuemax="5500"></div> \
						</div> \
					</div>\
					<div class="col">\
						<div class="progress"> \
							<img class="h-100" src="assets/armor.png" ></img> \
							<p>{{persos[selected].armor}} armor</p>
							<div class="progress-bar" role="progressbar":style="{width: persos[selected].armor/500*100+'%'}" v-bind:aria-valuenow="persos[selected].armor" aria-valuemin="0" aria-valuemax="500"></div> \
						</div> \
					</div>\
				</div>\
				<div class="row" style="padding-top:5px">\
					<div class="col">\
						<div class="progress"> \
							<img class="h-100" src="assets/hearth.png" ></img> \
							<p>{{persos[selected].health}} hp</p>
							<div class="progress-bar bg-danger" role="progressbar" :style="{width: persos[selected].health/5500*100+'%'}" v-bind:aria-valuenow="persos[selected].health" aria-valuemin="0" aria-valuemax="5500"></div> \
						</div> \
					</div>\
					<div class="col">\
						<div class="progress"> \
							<img class="h-100" src="assets/gold.png" ></img> \
							<p>{{persos[selected].gold}} gp</p>
							<div class="progress-bar bg-warning" role="progressbar":style="{width: persos[selected].gold/5000*100+'%'}" v-bind:aria-valuenow="persos[selected].gold" aria-valuemin="0" aria-valuemax="5000"></div> \
						</div> \
					</div>\
				</div>\
			</div>\

			<table class="table" style=""> \
				<tr style="padding:0;"> \
					<td style="padding:0;" colspan="3"> Hands: </td> \
					<td style="padding:0;" colspan="3"> Belt: </td> \
				</tr> \
				<tr> \
					<td class="p-0 playerinventory" scope="col" v-for="(it,index) in persos[selected].slots[2].items" @dragover.prevent @drop="drop(2, index)"> \
						<div class="h-100" v-if="it != null"> \
							<a data-toggle="tooltip" v-bind:title="it.name" > \
								<img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="it.img" draggable="true" @dragstart="dragStart(2, index)" @dragend="dragEnd()"></img> \
							</a> \
						</div>\
					</td> \

					<td class="p-0 playerinventory_no" scope="col"> \
					</td> \

					<td class="p-0 playerinventory" scope="col" v-for="(it,index) in persos[selected].slots[3].items" @dragover.prevent @drop="drop(3, index)"> \
						<div class="h-100" v-if="it != null"> \
							<a data-toggle="tooltip" v-bind:title="it.name" > \
								<img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="it.img" draggable="true" @dragstart="dragStart(3, index)" @dragend="dragEnd()"></img> \
							</a> \
						</div>\
					</td> \
				</tr> \
			</table> \
		</div>\

		<div v-if="persos[selected] != null" style="position: absolute; left:calc((100% - (32px * 10))); right:0px; bottom:0px; ">\
			Bag:
			<table class="table" > \
				<tr> \
					<td class="p-0 playerinventory_tiny" scope="col" v-for="(it,index) in persos[selected].slots[4].items" @dragover.prevent @drop="drop(4, index)"> \
						<div class="h-100" v-if="it != null"> \
							<a data-toggle="tooltip" v-bind:title="it.name" > \
								<img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="it.img" draggable="true" @dragstart="dragStart(4, index)" @dragend="dragEnd()"></img> \
							</a> \
						</div>\
					</td> \
				</tr> \
			</table> \
		</div>\

		<div v-if="persos[selected] != null" style="position: absolute; top:calc((100% - (64px * 2)) / 2); bottom:calc((100% - (64px * 2)) / 2); right:0px; ">\
			Armor:
			<table class="table table-bordered" style="border: 3px solid #292b2c"> \
				<tr class="playerinventory"> \
					<td class="p-0 playerinventory" scope="col" @dragover.prevent @drop="drop(0, 0)"> \
						<div class="h-100" v-if="persos[selected].slots[0].items[0] != null"> \
							<a data-toggle="tooltip" v-bind:title="persos[selected].slots[0].items[0].name" > \
								<img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="persos[selected].slots[0].items[0].img" draggable="true" @dragstart="dragStart(0, 0)" @dragend="dragEnd()"></img> \
							</a> \
						</div>\
					</td> \
				</tr> \
				<tr> \
					<td class="p-0 playerinventory" scope="col" @dragover.prevent @drop="drop(1, 0)"> \
						<div class="h-100" v-if="persos[selected].slots[1].items[0] != null"> \
							<a data-toggle="tooltip" v-bind:title="persos[selected].slots[1].items[0].name" > \
								<img style="padding-top: 8px;padding-left: 8px;" class="h-75" v-bind:src="persos[selected].slots[1].items[0].img" draggable="true" @dragstart="dragStart(1, 0)" @dragend="dragEnd()"></img> \
							</a> \
						</div>\
					</td> \
				</tr> \
			</table> \
		</div> \
	</div> \
	`,
  methods: {
    handleData: function(e) {
      alert(e)
    },
		forceRerender() {
        this.renderComponent = false;
        this.$nextTick(() => {
          this.renderComponent = true;
      });
    },
		dragStart(slot, index) {
      //console.log("start dragging "+this.persos[selected].slots[slot].items[index].name);
      this.idDrag = index;
			this.idDragSlot = slot;
    },
    dragEnd() {
      //console.log("stop dragging");
      this.idDrag = -1;
    },
		drop(slot, id) {
	    //console.log(this.persos[selected].slots[this.idDragSlot].items[this.idDrag].name + " from " + this.persos[selected].slots[this.idDragSlot].name + " dropped on " + this.persos[selected].slots[slot].name);
			if (this.persos[this.selected].canDropTo(slot, id, this.persos[this.selected].slots[this.idDragSlot].items[this.idDrag])) {
				for (var i = id; i < this.persos[this.selected].slots[slot].items.length; i++) {
					if(this.persos[this.selected].slots[slot].items[i] == null) {
						this.persos[this.selected].slots[slot].items[i] = this.persos[this.selected].slots[this.idDragSlot].items[this.idDrag];
						this.persos[this.selected].slots[this.idDragSlot].items[this.idDrag] = null;
						break;
					}
				}
			} else {
				alert("You can't drop an " + this.persos[this.selected].slots[this.idDragSlot].items[this.idDrag] + " on the " + this.persos[this.selected].slots[slot].name + " slot")
			}
			this.forceRerender()
		}
  },
	watch:{
		selected : function(newVal, oldVal) {
      //this.persos[selected] = persos[newVal];
		}
	},
	mounted() {
		// get all streets
		axios.get(url+'persos/get')
		.then(response => {
			this.persos.splice(0, this.persos.length);
			response.data.forEach((perso, persoIndex) => {
				this.persos.push(new Perso(perso["name"], perso["level"], perso["gold"], perso["life"], perso["strength"], perso["armor"]));
				perso["slots"].forEach((slot, slotIndex) => {
					slot["items"].forEach((item, itemIndex) => {
						this.persos[persoIndex].slots[slotIndex].items[itemIndex] = (new Item(item["_id"], item["name"], item["type"], item["price"], item["effect"], ""));
					});
				});
			});
		})
	}
});
