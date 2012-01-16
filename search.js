function Trie(){

	/*Underlying JS Array Structure*/
	this.dict = new Array();

	/*Friendly Public functions*/
	

	this.addWord = function(word){
		//Adds word to the trie by calling helper function.
		addWordHelper(this.dict,word);
	}

	this.display = function(){
		//Displays the trie in console for debugging purposes.
		console.log("***Tree***");
		displayHelper(this.dict,'','');
	}	
	this.search = function (word){
		//Returns array of all words starting with search string.
		var results = searchHelper(this.dict,word,'');
		return results;
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
		//Recursively adds a word to the trie.
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
	
	function searchHelper(children,searchString,wordSegment){
		if(!(searchString[0] in children)){
			return null;
		}

		else{
			if(searchString.length == 1){
				var leaves = new Array();
				traverse(children[searchString],wordSegment.concat(searchString),leaves);
				return leaves;
			}
			
			else{
				return searchHelper(children[searchString[0]],searchString.substring(1,searchString.length),wordSegment.concat(searchString[0]));
			}
		}
	}
			

	function traverse(children,wordSegment,leaves){
		for(child in children){
			if(child==0){
				leaves.push(wordSegment);
			}else{
				traverse(children[child], wordSegment.concat(child),leaves);
			}
		}
	}
}	


function autocomplete(){
	var searchString = $(this).val();
	
	if(searchString!==''){
		console.log(searchString);
		var results = trie.search(searchString);
		$("ul li").remove();
		if(results){
			console.log("Found ",results.length,"results");
			for(var i=0;i<results.length;i++){
				console.log("Appending -- ",results[i]);
				$("ul").append("<li>"+results[i]+"</li>");
			}
			$("li").first().addClass('selected');
		}
		else{
			console.log("No results to display.");
			$("ul").append("<li>No Results.</li>");
		}
		document.getElementsByClassName("autocompleteBox")[0].style.display = "block";
	}else{
		console.log("No search string.");
		document.getElementsByClassName("autocompleteBox")[0].style.display = "none";
	}
	
}
function initialize(){
	$('.searchTextArea').keyup(autocomplete);
	trie = new Trie();
	trie.addWord('cat');
	trie.addWord('crap');
	trie.addWord('cap');
	trie.addWord('dracula');
	//trie.display();
	console.log(trie.search('ca'));
	console.log(trie.search('c'));
	console.log(trie.search('z'));
}

