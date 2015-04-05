
Parse.initialize("u2bfRPj1KCw1vgvHBcYL6rmcNz3UfsJV83Dd1AKB", "nVbK9d630ykRnibWoFrK7S9ntLkXveBPEGeXQDL7");

var TestObject = Parse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({foo: "bar"}).then(function(object) {
  //alert("yay! it worked");
});