Numbers = new Meteor.Collection('numbers');
Profiles = new Meteor.Collection('profiles');

function only_owner (userId, doc) {
    return (userId && doc.owner === userId);
}

Numbers.allow({
    insert : only_owner,
    update : only_owner,
    remove : only_owner
})
