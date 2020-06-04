var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
  {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
  {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
  {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
  {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
  //{slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
  {slot:'bag', limit:10, types: [ '*' ]}
];

var gameMaster = false;

function countNulls(arr) {
  out = 0;
  arr.forEach((item, i) => {
    if(item == null) out +=1;
  });
  return out;
}

class Item {
  constructor(id, name, type, price, effect,img) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.type = type;
    this.price = price;
    this.effect = effect;
  }
}


class Perso {
  constructor(name, level, gold) {
    this.name = name;
    this.level = level;
    this.slots = [
      {name:'head', items:[null]},
      {name:'body', items:[null]},
      {name:'hands', items:[null, null]},
      {name:'belt', items:[null, null, null]},
      {name:'bag', items:[null,null,null,null,null,null,null,null,null,null]}
    ];
    this.boughtItems = []; // list of item bought but not yet assigned
    this.health = 50*this.level; // the actual level of life
    this.gold=gold;

    this.vitaliy = this.level*50;
    this.armor = 10;
    this.strength = this.level*20;
    this.updateCaracs();
  }

  updateCaracs() {
    this.vitaliy = this.level*50;
    this.armor = 0;
    this.strength = this.level*20;

    for(let i=0;i<this.slots.length;i++) {
      for(let j=0;j<this.slots[i].items.length;j++) {
          let item = this.slots[i].items[j];
          if(item != null) {

            // search for arrmor
            if (item.effect[0] == 'A') {
              let val = item.effect.substring(2,item.effect.length);
              if (item.effect[1] == '+') this.armor += eval(val);
              else if (item.effect[1] == '-') this.armor -= eval(val);
            }
            // search for vitality effects
            if (item.effect[0] == 'L') {
              let val = item.effect.substring(2,item.effect.length);
              if (item.effect[1] == '+') this.vitality += eval(val);
              else if (item.effect[1] == '-') this.vitality -= eval(val);
            }
            // search for strength effects
            if (item.effect[0] == 'S') {
              let val = item.effect.substring(2,item.effect.length);
              if (item.effect[1] == '+') this.strength += eval(val);
              else if (item.effect[1] == '-') this.strength -= eval(val);
            }

          }
      }
    }

    if (this.life > this.vitality) this.life = this.vitality;
  }

  /* modified version for TP 4:
       - called from buy() in vue instance, where checks/confirmation are done.
       - item parameter is an item object
  */
  buy(item) {
    if(this.gold >= item.price) {
      if(countNulls(this.slots[4].items) > 0) {
        for (var i = 0; i < this.slots[4].items.length; i++) {
          if(this.slots[4].items[i] == null) {
            this.slots[4].items[i] = item;
            break;
          }
        }
        this.gold -= item.price;
        this.updateCaracs();
        return true;
      }
    }
    return false;
  }

  canDropTo(slotId, itemSlotId, item) {
    this.slots[slotId].items.forEach((item, i) => {
      if(itemSlotId == i && item != null) return false
    });

    var out = false;
    itemLimits.forEach((itemLimit, i) => {
      if(itemLimit.slot == this.slots[slotId].name) {
        out = itemLimit.types.includes(item.type) || itemLimit.types == "*" ;
      }
    });

    return out;
  }
}

var boutiques = [
  {name:"SuperU", items: [
    	new Item(0, 'broigne'          , 'armor'  , 200  , 'A+10', "assets/broigne.png"),
    	new Item(0, 'hauberk'          , 'armor'  , 500  , 'A+10', "assets/hauberk.png"),
    	new Item(0, 'dagger'           , 'weapon' , 100  , 'A+10', "assets/dagger.png"),
    	new Item(0, 'long sword'       , 'weapon' , 300  , 'A+10', "assets/lsword.png"),
    	new Item(0, 'torch'            , 'lighter', 2    , 'A+10', "assets/torch.png"),
    	new Item(0, 'protection potion', 'potion' , 100  , 'A+10', "assets/potion_protection.png"),
    	new Item(0, 'fireball'         , 'spell'  , 1000 , 'A+10', "assets/fireball.png"),
    	new Item(0, 'invisibility'     , 'spell'  , 1000 , 'A+10', "assets/invisibility.png"),
    	new Item(0, 'apple'            , 'food'   , 1    , 'A+10', "assets/apple.png"),
    	new Item(0, 'beef'             , 'food'   , 5    , 'A+10', "assets/beef.png"),
  ]},
  {name:"Cora", items: [
    	new Item(0, 'Potion magique'   , 'potion' , 350  , 'A+10', "assets/potion_magic.png"),
  ]},
  {name:"Aldi", items: [
    	new Item(0, 'Elssas Cola'      , 'food'   , 200  , 'A+10', "assets/potion_magic.png"),
  ]},
];

var personnages = [
  new Perso("AZERTY", 100, 500),
  new Perso("QWERTY", 56, 500),
];
/*
var personnages = [
  {
    name:"AZERTY",
    lvl:5,
    health:80 ,
    gold:5000,
    items: [
      null,
      null,
      null,
      null,
    ],
    items_arrmor: [
      null,
      null,
      null,
      null,
    ]
  },
  {
    name:"QWERTY",
    lvl:5,
    health:80 ,
    gold:5000,
    items: [
      null,
      null,
      null,
      new Item(0, 'Potion magique'   , 'potion' , 350  , 'A+10', "assets/potion_magic.png"),
    ],
    items_arrmor: [
    	new Item(0, 'helmet'           , 'helmet' , 200  , 'A+10', "assets/helmet.png"),
      null,
      null,
      null,
    ]
  },
];*/
