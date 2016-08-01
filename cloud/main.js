Parse.Cloud.afterSave("Post", function(request) {
   query = new Parse.Query(Parse.Installation);

   Parse.Push.send({
     where: query,
     data: { alert: request.object.get("songName") + ': ' + request.object.get("previewUrl") }
   }, { useMasterKey: true })
   .then(function() {
     // Push sent!
     console.log(request.params);
     response.success();
   }, function(error) {
     // There was a problem :disappointed:
   });
});
