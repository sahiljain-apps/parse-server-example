Parse.Cloud.afterSave("Post", function(request) {
   query = new Parse.Query(Parse.Installation);

   var followingQuery = Parse.Query("Follow");
   followingQuery.where("toUser", request.object.get("fromUser"));

  //  var userQuery = Parse.Query(Parse.User);
  //  userQuery.matchesQuery(self, )
  //
  //  query.matchesQuery("fromUser", followingQuery);

   Parse.Push.send({
     where: query,
     data: { alert: '@ ' +  request.object.get("userName") + ' shared: ' + request.object.get("songName") + ' by: ' + request.object.get("songArtist") }
   }, { useMasterKey: true })
   .then(function() {
     // Push sent!
     console.log(request.params);
     response.success();
   }, function(error) {
     // There was a problem :disappointed:
   });
});
