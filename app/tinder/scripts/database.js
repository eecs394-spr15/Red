
//Parse.initialize("u2bfRPj1KCw1vgvHBcYL6rmcNz3UfsJV83Dd1AKB", "nVbK9d630ykRnibWoFrK7S9ntLkXveBPEGeXQDL7");

//createSample();
//addItemToList();
/*
function addItemToList(title, description) {
	document.getElementById("item-list").innerHTML =
		document.getElementById("item-list").innerHTML + 
	 '      <a class="item item-thumbnail-left item-button-right" href="#"> \
        <img src="Couch.jpg"> \
        <h2>Pretty Hate Machine</h2> \
        <p>Nine Inch Nails</p> \
        <div class="buttons"> \
          <div class="col-top"> \
            <button class="button button-icon icon button-clear button-positive"> \
            <i class="icon super-ios7-checkmark-outline"></i> \
            </button> \
            <br> \
            <button class="button button-icon icon  button-clear button-positive"> \
            <i class="icon super-ios7-close-outline"></i> \
            </button> \
          </div> \
        </div> \
      </a>';
}

function pullItems () {
	var ItemForSale = Parse.Object.extend("ItemForSale");
	var query = new Parse.Query(ItemForSale);
	query.get("7hBkPZWLPQ", {
		success: function(anItem) {
			addItemToList(anItem.get("title"),anItem.get("description"));
		},
		error: function(anItem,error) {
			alert('Failed to query object, with error code: ' + error.message);
		}
});

function createSample () {
	var ItemForSale = Parse.Object.extend("ItemForSale");
	var anItem = new ItemForSale;
	anItem.set("title","bike");
	anItem.set("description","brand new bike");
	anItem.save(null, {
		success: function(anItem) {
			//alert('New item created with objectId: '+anItem.id);
		},
		error: function(anItem,error) {
			alert('Failed to create new object, with error code: ' + error.message);
		}
	});
}
*/