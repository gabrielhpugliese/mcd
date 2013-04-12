Meteor.subscribe('Numbers');
Session.set('profilesLoading', true);
Meteor.subscribe('Profiles', function () {
    Session.set('profilesLoading', false);
});

Meteor.startup(function () {
    Session.set('search_numbers', [700,701,702,703,704,705,706,707,708,709,710,711,712,713,714,715,716,717,718,719,720,721,722,723]);
});

