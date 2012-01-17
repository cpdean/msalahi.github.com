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
		$(".autocompleteBox").show();
	}else{
		console.log("No search string.");
		$(".autocompleteBox").hide();
	}
	
}

	
function initialize(){
	var dictionary = genDict();
	trie = new Trie();
	for(var i=0;i<genDict;i++){
		console.log(dictionary[i]);
		trie.addWord(dictionary[i]);
	}
	$('.searchTextArea').keyup(autocomplete);
}

function genDict(){
	var dict = new Array();
	dict.push("aardvark");
	dict.push("aardwolf");
	dict.push("aaron");
	dict.push("aback");
	dict.push("abacus");
	dict.push("abaft");
	dict.push("abalone");
	dict.push("abandon");
	dict.push("abandoned");
	dict.push("abandonment");
	dict.push("abandons");
	dict.push("abase");
	dict.push("abased");
	return dict;
}
