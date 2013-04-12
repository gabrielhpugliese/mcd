Template.profile.rendered = function () {
    if ( Session.get('profilesLoading') )
        return;
        
    var profile = Profiles.findOne({ owner : Meteor.userId() });
    
    new dgCidadesEstados({
        estado: document.getElementById('state'),
        cidade: document.getElementById('city'),
        estadoVal : profile.state,
        cidadeVal : profile.city
    });
}

Template.profile.numbers = function () {
    var numbers = [],
        myNumbers = Numbers.find({ owner : Meteor.userId() }).fetch();

    function contains_number (num) {
        if ( _.contains(_.flatten(_.pluck(myNumbers, 'numbers')), num) )
            return 'active';
        return '';
    }

    for ( var i = 700; i < 724; i++ ) {
        numbers[i] = { 'val' : i, class : contains_number(i) };
    }

    return numbers;
}


Template.profile.events({
    'click button.number:not(.active)' : function (event) {
        var $self = $(event.target),
            number = $self.text();

        Meteor.call('insert_number', number, function (error, result) {
            if (error)
                console.log(error);
        });
    },
    'click button.number.active' : function (event) {
        var $self = $(event.target),
            number = $self.text();

        Meteor.call('remove_number', number, function (error, result) {
            if (error)
                console.log(error);
        });
    },
    'click #save_location' : function (event) {
        event.preventDefault();
        var state = $('#state').val(),
            city = $('#city').val();
            
        Meteor.call('save_profile', state, city, function (error, result) {
            if (error)
                console.log(error);
            else
                $('.alert').show();
                $('.alert p').text('Localização salva com sucesso.');
        });
    }
});