
var paths = [];

function parseForTree(command){

	var regex = /[\)\+]*[\+][\(]|[\)][\+]|[\)]|[\(]|[\>]|[\+]|[\^]+/,
		level = 0,
		blockArr = command.split(regex),
		blockObjects = [],
		levelArr = [];

	blockArr.forEach(function(item, i) {

		var index = command.search(item)-1,
			saveLevel = false;
		
		if(index>0){
			for (var j = index; j>0; j--){
				if ( (command[j]==')') && ((index-j)<=3) ){
					level = levelArr[levelArr.length-1];
					levelArr.splice(levelArr.length-1,1)
					break;
				}
			}
		}

		if(command[index]=='('){
			index--;
			saveLevel = true;
		}

		switch (command[index]) {
			case '>':
				level = level + 1;
				break;
			case '+':
				level = level;
				break;
			case '^':
				var it = index;
				while(command[it]=='^'){
					it--;
					level = level - 1;
				}
				break;
		}

		if (saveLevel){
			levelArr.push(level);
		}

		if (item != ""){
			var block = {name:item, symb:command[index], level:level};
			blockObjects.push(block);
		}

	});

	blockObjects.forEach(function(block, index) {
		var hyphen = '',
			path = block.name,
			layer = block.level;

		for (var j = 0; j<block.level;j++){
			hyphen += '— ';
		}
		
		for (var i = 1; i<=index; i++){
			
			var name = '';
			var bO = blockObjects[index].level;
			var bO_i = blockObjects[index-i].level;

			if ( (bO > bO_i) && (bO_i < layer) ) {
				name = blockObjects[index-i].name;
				path = name + '/' + path;
				layer--;
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
parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5+(b3>b31+b32)+b4+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('b2>b21+(b212>b2121+b2122)+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('(main>home+about)+header+footer')
// parseForTree('header+(main>home+about)+footer')
// parseForTree('(b1+b2)+(b3+b4)')

// parseForTree('header+main>home+about>slogan^^footer')
// parseForTree('header+(main>(home>slogan)+about)+footer')

console.log(paths);