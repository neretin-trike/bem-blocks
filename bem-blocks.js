
var paths = [];

function replaceAt(string, index, replace) {
	return string.substring(0, index) + replace + string.substring(index + 1);
}

function replaceBrackets(remain){

	var openArr = [],
		closeArr = [],
		ancesArr = [];

	for (var i = 0; i<remain.length; i++){
		if (remain[i]=="("){
			openArr.push(i)
		}
		if (remain[i]==")"){
			closeArr.push(i)
		}
		if (remain[i]==">"){
			ancesArr.push(i)
		}
	}

	remain = replaceAt(remain, openArr[0], "["); 
	levelSearch: for (var i = 1; i<=closeArr.length; i++){
		if (openArr[i]>closeArr[i-1]){
			remain = replaceAt(remain, closeArr[i-1], "]"); 
			for (var j = 0; j<ancesArr.length; j++){
				if ((closeArr[i-1]<ancesArr[j])&&(ancesArr[j]<openArr[i])){
					break levelSearch;
				}
			}
			remain = replaceAt(remain, openArr[i], "["); 
		}
	}
	remain = replaceAt(remain, closeArr[closeArr.length-1], "]"); 

	return remain;
}

function splitForDescendants(remain,bro){
	var regex = /[\]][\+]|[\[]|[\]]/ig;
	var newBro = remain.split(regex);

	if (newBro.length != 0){

		newBro.forEach(function(item, i) {
			if (item.indexOf('>') == -1){
	
				var temp = item.split('+');
	
				if (temp.length != 1){
					newBro.splice(i,1);
	
					temp.forEach(el => {
						newBro.push(el);
					});
				}
			}
		});

		bro.splice(1,1);

		var positiveArr = newBro.filter(function(arg) {
			return arg != "";
		});

		positiveArr.forEach(element => {
			bro.push(element);
		});
	}

	return bro;
}

// function parseForTree(name, path = '',hyphen = ''){
// 	var bro = [];

// 	var posAncestor = name.indexOf('>');
// 	var posDescendant = name.indexOf('+');

// 	if ( ((posAncestor!= -1) && (posAncestor < posDescendant) && (name.search('[\(]|[\)]') == -1) )  
// 		 || (posDescendant ==-1)){

// 		var roots = name.slice(0,posAncestor);
// 		var remain = name.slice(posAncestor+1, name.length);

// 		hyphen += '— ';
		
// 		if (posAncestor != -1){
			
// 			console.log(hyphen+roots);

// 			path += '/' + roots;
// 			paths.push(path);
// 			console.log('··············');
// 			parseForTree(remain,path,hyphen);
// 		}
// 		if (posAncestor == -1){
			
// 			console.log(hyphen +remain);
			
// 			path += '/' + remain;
// 			paths.push(path);
// 			console.log('··············');
// 		}
// 	}
// 	else{
// 		if (posDescendant != -1){

// 			if (name[0]=='('){
// 				name = replaceBrackets(name);	
// 				bro = splitForDescendants(name,bro);				
// 			}
// 			else{
// 				if (posAncestor == -1){

// 					bro = name.split('+');
// 				}
// 				else{
// 					var roots = name.slice(0,posDescendant);
// 					var remain = name.slice(posDescendant+1, name.length);
	
// 					bro[0] = roots;
// 					bro[1] = remain;
	
// 					if( remain.search('[\(]|[\)]') != -1 ){
// 						remain = replaceBrackets(remain);	
// 						bro = splitForDescendants(remain,bro);				
// 					}
// 				}
// 			}

// 			bro.forEach(element => {
// 				parseForTree(element,path,hyphen);
// 			});
// 		}
// 	}
// }


function parseForTree(name){
	var regex = /[\)\+]*[\+][\(]|[\)][\+]|[\)]|[\(]|[\>]|[\+]|[\^]/;

	var level = 0,
		saveLevel = 0,
		levelCount = 0,
		levelSwitch = false,
		iterata = 0;

	var blockArr = name.split(regex);
	
	var symbArr = [];

	var blockObjects = [];

	blockArr.forEach(function(item, i) {

		var index = name.search(item)-1;

		while(name[index]=='('){
			index--;

			// if ((blockObjects[i-1].symb==undefined)||(blockObjects[i-1].symb=='>'))
			symbArr.push(level);

			iterata++;
			levelCount++;
		}
		
		if(index>0){
			for (var j = index; j>0; j--){

				if (name[j]==')'){

					if (levelCount == 0){
						level = blockObjects[i-1].level;
					}
					else{
						levelCount--;
						
						var a = 0;
						level = level - 1;

						// if ((symbArr[levelCount].symb==undefined)||(symbArr[levelCount].symb=='>'))
					}

					var c = 0;
					break;
				}
			}
		}

		switch (name[index]) {
			case '>':
			  level = level + 1;
			  break;
			case '+':
			  level = level;
			  break;
			case '^':
			  level = level - 1;
			  break;
		  }

		blockObjects[i] = {
			name: item,
			symb: name[index],
			level: level
		}


	});


	blockObjects.forEach(block => {
		var hyphen = '';

		for (var i = 0; i <= block.level; i++){
			hyphen += '— ';
		}

		console.log('-------------');
		console.log(hyphen+block.name);
		
	});

	var c = 0;
	
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
parseForTree('b1+(b2>b21+b22+b23)+b8>b10+(b3>b31+b32)+(b4>b41+b42)')
// parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5');
// parseForTree('b2>b21+(b22>b211+(b212>b2121+b2122)+b23)+b5+(b3>b31+b32)+b4+(b6>b61+(b63>b631+b632)+b62)');

// parseForTree('header+(main>home+about)+footer')
// parseForTree('(b1+b2)+(b3+b4)')

// parseForTree('header+main>home+about^footer')


console.log(paths);
