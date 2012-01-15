function helloWorld(messages){
	this.messages = messages;
		
	this.doIt = function (){
		for(var i=0; i<messages.length;i++){
			alert(messages[i]);
		}
	}
}

function initialize(){
	dict = new Array();
	dict[''] = new Array();
	addWord(dict,'a');
	addWord(dict,'m');
	addWord(dict,'t');
	printTree(dict,'');
	console.log(dict);
	console.log(dict['']);
}


function getRoot(tree){
	for( key in tree){
		return key;
	}
}
	 
function addWord (tree,word){
	console.log(tree);
	var root = getRoot(tree);
	var children = tree[root];
	console.log(root);
	console.log(children);
	console.log("---");	
	if(children===undefined){
		children = new Array();
	}

	if(word.length===1){
		if(word in children){
			if(!('' in children[word])){
				children[word].splice(0,0,'');
			}
		}
		else{
			children[word] = new Array('');
		}
	}
	else{
		if(!(word[0] in children)){
			children[word[0]] = new Array();
		}
		addWord(children[word[0]],word.substring(1,word.length));
	}
}

function printTree(tree,indent){
	root = tree[0];
	console.log(indent.concat(root));
	for(child in tree[root]){
		if(child!==''){
			printTree(child, indent.concat('    '));
		}
	}
}
