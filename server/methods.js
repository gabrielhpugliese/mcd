Meteor.methods({
    'insert_number' : function (number) {
        number = +number;
        if (Numbers.findOne({ owner : Meteor.userId(), numbers : number }))
            throw new Meteor.Error(403, 'Already in db.');

        return Numbers.update({
                owner : Meteor.userId()
            }, {
                $push : { numbers : number }
            });
    },
    'remove_number' : function (number) {
        number = +number;
        if (!Numbers.findOne({ owner : Meteor.userId() , numbers : number }))
            throw new Meteor.Error(404, 'Not in db.');

        return Numbers.update({
                owner : Meteor.userId()
            } , {
                $pull : { numbers : number }
            });
    },
    'save_profile' : function (state, city) {
        return Profiles.update({
                owner : Meteor.userId()
            } , {
                $set : {
                    state : state,
                    city: city
                }
            });
    },
    'send_msg' : function (userId, msg) {
        var sender = Meteor.users.findOne(Meteor.userId()),
            receipt = Meteor.users.findOne(userId);
        
        console.log(sender)
        console.log(receipt)
        console.log(userId)
        Email.send({
            from: sender.services.facebook.email,
            to: receipt.services.facebook.email,
            subject: sender.profile.name + ' te enviou uma mensagem sobre selos do MCD!',
            text: msg
        });
    }
});
