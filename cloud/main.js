Parse.Cloud.afterSave("Post", function(request) {
  // Our "Message" class has a "text" key with the body of the message itself
  var messageText = request.object.get('songName');

  var pushQuery = new Parse.Query(Parse.Installation);
  pushQuery.equalTo('deviceType', 'ios'); // targeting iOS devices only

  Parse.Push.send({
    where: pushQuery, // Set our Installation query
    data: {
      alert: "songName: " + messageText
    }
  }).then(function() {
    // Push was successful
  }, function(error) {
    throw "Got an error " + error.code + " : " + error.message;
  });
});
