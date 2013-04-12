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
    }
});
