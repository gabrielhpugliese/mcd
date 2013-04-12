Meteor.subscribe('Numbers');
Session.set('profilesLoading', true);
Meteor.subscribe('Profiles', function () {
    Session.set('profilesLoading', false);
});

Meteor.startup(function () {
    Session.set('search_numbers', [700,701]);
});

