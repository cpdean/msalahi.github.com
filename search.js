function Trie(){

	/*Underlying JS Array Structure*/
	this.dict = new Array();
	this.dict['']=new Array();

	/*Friendly Public functions*/
	

	this.addWord = function(word){
		//Adds word to the trie by calling helper function.
		addWordHelper(this.dict[''],word);
	}

	this.display = function(){
		//Displays the trie in console for debugging purposes.
		console.log("***Tree***");
		displayHelper(this.dict[''],'','');
	}	
	function displayHelper(children,wordSegment,indent){
		//Recursively prints out the trie.
		console.log(indent,wordSegment);
		for(child in children){
			if(child==0){
				console.log(indent.concat('    '),wordSegment,"(word)");
			}else{
				displayHelper(children[child], wordSegment.concat(child),indent.concat('    '));
			}
		}
	}

	function addWordHelper(children,word){
		//Recursively adds a word to the try.
		if(word.length===1){
			if(word in children){
				if(!('' in children[word])){
					children.push('');
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
			addWordHelper(children[word[0]],word.substring(1,word.length));
		}

	}

}	

function initialize(){
	var dict = new Trie();
	dict.addWord('cat');
	dict.addWord('crap');
	dict.addWord('cap');
	dict.addWord('dracula');
	dict.display();
}

