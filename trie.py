import elementtree.ElementTree as ET

class TrieNode:
    def __init__(self,head,isEnd=False):
        assert type(head) is str, "Value of 'head' must be a string: Given %s" % type(head)
        assert type(isEnd) is bool, "Value of 'isEnd' must be a boolean: Given %s" % type(isEnd)
        self.head = head.lower()
        self.children = []
        self.isEnd = isEnd
	self.num_words = 0

    def __repr__(self):
        return self.head
    
    def addChild(self,word):
        #Adds new TrieNode with 'letter' as root value.
        #Returns index at which inserted node can be found.
        
	letter = word[0]
        child = None
        index = None
	child_added = False
	for index in xrange(len(self.children)):
	    node = self.children[index]
	    if letter < node.head:
		self.children.insert(index,TrieNode(letter))
		child = self.children[index]
		child_added = True
		break
	    elif node.head == letter:
		child = self.children[index]
		break
	if not child:
		self.children.append(TrieNode(letter))
		child = self.children[-1]
		child_added = True
		
	if len(word)>1:
		word_added = child.addChild(word[1:])
		if word_added: self.num_words+=1
		return word_added
	else:
		child.isEnd = True
		if child_added: self.num_words+=1
		return child_added

    def toXML(self):
    	root = ET.Element("Trie")

		
class Trie:
    def __init__(self):
        self.root = TrieNode('')

    def addWord(self,word):
        assert type(word) is str,"Word provided was not a string: %s" % word
        assert len(word)>0 , "Cannot add empty word to Trie."
        current = self.root
	current.addChild(word)
    def display(self,current=None,indent=0,word=''):
        if not current:
            current = self.root
            print "*****\nWords\n*****\n"
        if current.isEnd:
            print '\t' * indent + word + current.head + "(word)"
        else:
            print '\t' * indent + word + current.head + "("+str(current.num_words)+" words)"
        for child in current.children:
            self.display(child, indent+1,word+current.head)


t = Trie()


t.addWord("brother")
t.addWord("brothez")
t.addWord("brothed")
t.addWord("behhhh")
t.addWord("aaa")

t.display()
        
