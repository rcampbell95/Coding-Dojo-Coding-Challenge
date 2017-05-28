 class BTNode {
    constructor(value){
        this.value = value;
        this.left = null;
		this.right = null;
		this.parent = null;
    }

 }

 class BST {
	 constructor() {
		this.root = null;
		
		this.add = function(value) {
			var newNode = new BTNode(value);
			var previousNode = null;
			var currentNode = this.root;
			
			while(currentNode != null) {
				previousNode = currentNode;
				if(value < currentNode.value) {
					currentNode = currentNode.left;
				}
				else {
					currentNode = currentNode.right;
				}
			}
			
			newNode.parent = previousNode;
			if(previousNode == null) {
				this.root = newNode;			
			}
			
			else if(value < previousNode.value) {
				previousNode.left = newNode;
			}
			else {
				previousNode.right = newNode;
			}
		}
		
		// Helper function for remove
		// Moves the subtree rooted at attachNode
		// and anchors it at anchorNode
		this.transplant = function(anchorNode, attachNode) {
			if(anchorNode.parent == null) {
				this.root = attachNode;
			}
			else if(anchorNode == anchorNode.parent.left) {
				anchorNode.parent.left = attachNode;
			}
			else {
				anchorNode.parent.right = attachNode;
			}
			if(attachNode != null) {
				attachNode.parent = anchorNode.parent;
			}
		}
		
		// Helper function for remove
		// Finds the minimum value within the
		// subtree rooted at the given node
		// and returns the node
		this.treeMin = function(node) {
			var minNode = node;
			while(node != null) {
				minNode = node.left;
			}
			return minNode;
		}
		
		// Helper function for remove that
		// deletes a node from the tree
		this.treeDelete = function(node) {
			if(node.left == null) {
				this.transplant(node, node.right);
			}
			else if(node.right == null) {
				this.transplant(node, node.left);
			}
			else {
				var minNode = this.treeMin(node.right);
				if(minNode.parent != node) {
					this.transplant(minNode, minNode.right);
					minNode.right = node.right;
					minNode.right.parent = minNode;
				} 
				transplant(node, minNode);
				minNode.left = node.left;
				minNode.left.parent = minNode;
			}
		}
		
		// Helper function for remove
		// Returns the node corresponding
		// to the given value
		this.search = function(value) {
			var currentNode = this.root;
			console.log(currentNode.value);
			
			if(currentNode == null) {
				return "Tree is empty";
			}
			
			while(currentNode.value != value) {
				if(value < currentNode.value) {
					currentNode = currentNode.left;
				}
				else {
					currentNode = currentNode.right;
				}
				
				if(currentNode == null) {
					return null;
				}
			}
			
			return currentNode;
		}
		
		this.remove = function(value) {
			var nodeToDelete = this.search(value);
			if(nodeToDelete == null) {
				return;
			}
			this.treeDelete(nodeToDelete);
		}
		
		// Recursively calculates the height
		// of the two subtrees and returns the
		// greater value
		this.getHeightRecursive = function(node) {
			if(node == null) {
				return -1;
			}
			else {
				var leftHeight = this.getHeightRecursive(node.left) + 1;
				var rightHeight = this.getHeightRecursive(node.right) + 1;
				
				if(leftHeight > rightHeight) {
					return leftHeight;
				}
				else {
					return rightHeight;
				}
			}
			
		}
		
		this.getHeight = function() {
			return this.getHeightRecursive(this.root);
		}

	 }
 }
 
