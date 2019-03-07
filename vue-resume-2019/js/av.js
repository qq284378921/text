var APP_ID = 'Ah4oNIFmW4f91tMcAXIczEQH-gzGzoHsz';
var APP_KEY = 'DT6H5QHxRBgihIhFThgz8gKn';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var TestObject = AV.Object.extend('TestObject');
var testObject = new TestObject();
testObject.save({
words: 'Hello World!'
}).then(function(object) {
alert('LeanCloud Rocks!');
})