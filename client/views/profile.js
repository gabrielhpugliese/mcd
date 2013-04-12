Template.profile.rendered = function () {
    if ( Session.get('profilesLoading') )
        return;

    var profile = Profiles.findOne({ owner : Meteor.userId() });

    new dgCidadesEstados({
        estado: $('#my-locale .state').get(0),
        cidade: $('#my-locale .city').get(0),
        estadoVal : profile.state,
        cidadeVal : profile.city
    });

    // Session.set('filters', { state : profile.state, city : profile.city });
}

var ButtonColor = (function () {
    this.range = function (a, b){
        var r = [];
        for( var i = a; i <= b; i++ )
             r.push(i);

        return r;
    };

    return {
        'brown' : this.range(700, 701),
        'teal' : this.range(704, 706),
        'pink' : this.range(707, 709),
        'orange' : this.range(710, 712),
        'danger' : this.range(713, 715),
        'yellow' : this.range(716, 718),
        'success' : this.range(719, 721),
        'blue' : this.range(722, 723)
    }
}());

function getButtonColor (num) {
    var range;
    _.find(ButtonColor, function (value, key) {
        if ( _.contains(value, num) ) {
            range = key;
            return true;
        }
        return false;
    });

    return 'btn-'+range;
}

Template.profile.numbers = function () {
    var numbers = [],
        myNumbers = Numbers.find({ owner : Meteor.userId() }).fetch();

    function containsNumber (num) {
        if ( _.contains(_.flatten(_.pluck(myNumbers, 'numbers')), num) )
            return 'active';
        return '';
    }

    for ( var i = 700; i < 724; i++ ) {
        numbers[i] = { 'val' : i, 'class' : containsNumber(i) + ' ' + getButtonColor(i) };
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
        var state = $('#my-locale .state').val(),
            city = $('#my-locale .city').val();

        Meteor.call('save_profile', state, city, function (error, result) {
            if (error)
                console.log(error);
            else{
                $('.alert').show();
                $('.alert p').text('Localização salva com sucesso.');
            }
        });
    }
});