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
	addWord(dict[''],'cat');
	addWord(dict[''],'crap');
	addWord(dict[''],'cap');
	addWord(dict[''],'dracula');
	printTree(dict[''],'','');
}


function getRoot(tree){
	for( key in tree){
		return key;
	}
}
	 
function addWord (children,word){

	if(word.length===1){
		console.log("We're in here now.");
		if(word in children){
			console.log("word in children");
			if(!('' in children[word])){
				children.push('');
			}
		}
		else{
			console.log("word not in children");
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

function printTree(children,wordSegment,indent){
	console.log(indent,wordSegment);
	for(child in children){
		if(child==0){
			console.log(indent.concat('    '),wordSegment,"(word)");
		}else{
			printTree(children[child], wordSegment.concat(child),indent.concat('    '));
		}
	}
}
