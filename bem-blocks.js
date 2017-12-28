
var paths = [];

var blockObjects = [];
var addBlockObject = function(name,item,level){
    var block = {name:name, item:item, level:level};
    blockObjects.push(block);
};

function parseForTree(name){

	var regex = /[\)\+]*[\+][\(]|[\)][\+]|[\)]|[\(]|[\>]|[\+]|[\^]+/;
	var level = 0;

	var blockArr = name.split(regex);
	var levelArr = [];

	blockArr.forEach(function(item, i) {

		var index = name.search(item)-1;
		var position = index;
		
		if(index>0){
			for (var j = index; j>0; j--){
				if ( (name[j]==')') && ((position-j)<=3) ){
					level = levelArr[levelArr.length-1];
					levelArr.splice(levelArr.length-1,1)
					break;
				}
			}
		}

		var check = true;
		while(name[index]=='('){
			index--;
			check = false;
		}

		switch (name[index]) {
			case '>':
				level = level + 1;
				break;
			case '+':
				level = level;
				break;
			case '^':
				var it = index;
				while(name[it]=='^'){
					it--;
					level = level - 1;
				}
				break;
		}

		if (!check){
			levelArr.push(level);
		}

		if (item != ""){
			addBlockObject(item, name[index],level);
			// blockObjects.push(function () {
			// 	name: item,
			// 	symb: name[index],
			// 	level: level
			// });
		}

	});

	var roots = '';

	blockObjects.forEach(function(block, index) {
		var hyphen = '';
		var path = block.name;

		var current = index;

		var c = block.level;

		for (var j = 0; j<block.level;j++){
			hyphen += '— ';
		}
		
		for (var i = 1; i<=current; i++){
			
			var name = '';
			var bO = blockObjects[current].level;
			var bO_i = blockObjects[current-i].level;


			if ((bO > bO_i)&&((bO_i != c))) {
				name = blockObjects[current-i].name;
				path = name + '/' + path;
				c--;
			}
			
		}

		paths.push(path);
		
		console.log('-------------');
		console.log(hyphen+block.name);
	});
	
}

// var regex = /[\]\+]*[\+][\[]|[\]][\+]|[\]]|[\[]/ig;

// parseForTree('b>b1+b2>b21>b211>b2222>b33>b85+b213+b787');
// parseForTree('b1>b3+b4+b5>b6+b21+b22+b23>b33');
// parseForTree('b1+b2+b3+b4')
// parseForTree('b1>b2>b3>b4+b5+b6')
// parseForTree('b1>b2+b3>b4+b5>b6+b7>b8+b9')
// parseForTree('b1+b2+(b3>b31+b32>b321+b322)+b4');
// parseForTree('b1+b2+(b3>b31+(b32>b321+b322)+b33)+b4');
// parseForTree('b1+(b2>b21+b22+b23)+b8+b10+(b3>b31+b32)+(b4>b41+b42)')
// parseForTree('b1+(b2>b21+b22+b23)+b8>b10+(b3>b31+b32)+(b4>b41+b42)')
// parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5');
// parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5+(b3>b31+b32)+b4+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('(main>home+about)+header+footer')
// parseForTree('header+(main>home+about)+footer')
// parseForTree('(b1+b2)+(b3+b4)')

// parseForTree('header+main>home+about>slogan^^footer')
parseForTree('header+(main>(home>slogan)+about)+footer')


console.log(paths);