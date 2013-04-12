Template.people.profile = function (userId) {
    return Profiles.findOne({ owner : userId });
}

Template.people.list = function () {
    var query = {
            numbers : { $in : Session.get('search_numbers') },
            // owner : { $not : Meteor.userId() }
        },
        filters = Session.get('filters');
    
    if ( filters ) {
        query['state'] = filters.state;
        query['city'] = filters.city;     
    }
    
    return Numbers.find(query);
}

// Deps.autorun(function () {
    // var filters = Session.get('filters');
//     
    // if ( filters ) {
        // window.onload = function() {
            // new dgCidadesEstados({
                // estado: $('#locale-filter .state').get(0),
                // cidade: $('#locale-filter .city').get(0),
                // estadoVal : filters.state,
                // cidadeVal : filters.city
            // });
        // }
    // } 
// });

Template.people.events({
    'click #search button' : function (event) {
        var numbers = $('#search input').val();

        numbers = _.map(numbers.split(','), function (num) {
            return +num;
        });

        Session.set('search_numbers', numbers);
    },
    'click #apply_filter' : function (event) {
        event.preventDefault();
        var state = $('#locale-filter .state').val(),
            city = $('#locale-filter .city').val();
        
        Session.set('filters', { state : state , city : city });
    },
    'click #send-msg' : function (event) {
        var $self = $(event.target),
            userId = $self.parent().attr('id');
        
        Session.set('msg_user_id', userId);
        $('#betaModal').modal();
    },
    'click #betaModal button' : function (event) {
        event.preventDefault();
        
        Meteor.call('send_msg', Session.get('msg_user_id'), $('#betaModal textarea').val(), function (error, result) {
            if (error)
                console.log(error);
            else {
                $('#betaModal').modal('hide');
                $('.alert').show();
                $('.alert p').text('Mensagem enviada com sucesso.');
            }
        });
        
    }
    // 'click #remove_filter' : function (event) {
        // event.preventDefault();
//         
        // $('#remove_filter').hide();
        // $('#restore_filter').show();
        // Session.set('filters', {});
    // },
    // 'click #restore_filter' : function (event) {
        // event.preventDefault();
//         
        // var profile = Profiles.findOne({ owner : Meteor.userId() });
        // Session.set('filters', { state : profile.state, city : profile.city });
        // $('#restore_filter').hide();
        // $('#remove_filter').show();
    // },
});

