Template.people.profile = function (userId) {
    return Profiles.findOne({ owner : userId });
}

Template.people.list = function () {
    return Numbers.find({
        numbers : { $in : Session.get('search_numbers') },
        owner : { $not : Meteor.userId() }
    });
}

Template.people.events({
    'click #search button' : function (event) {
        var numbers = $('#search input').val();

        numbers = _.map(numbers.split(','), function (num) {
            return +num;
        });

        Session.set('search_numbers', numbers);
    }
});

