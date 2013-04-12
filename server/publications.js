
Meteor.publish('Numbers', function () {
    return Numbers.find();
});

Meteor.publish('Profiles', function () {
    return Profiles.find();
});

Meteor.users.find().observe({
   added : function (doc) {
       if ( Numbers.findOne({ owner : doc._id }) )
           return;

       Numbers.insert({ owner : doc._id , numbers : [] });
       Profiles.insert({
           owner : doc._id,
           name : doc.services.facebook.name,
           uid : doc.services.facebook.id,
           username : doc.services.facebook.username
       });
   }
});
