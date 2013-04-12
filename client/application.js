Meteor.subscribe('Numbers');
Meteor.subscribe('Profiles');

Meteor.startup(function () {
    Session.set('search_numbers', [700,701]);
});

