import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import { collection } from '../collection/data.js';

Meteor.startup(() => {
  // Clear database for demo purpose
  collection.remove({});
});

Meteor.methods({
  remove: function(req) {
    var id = req._id;
    var record = collection.findOne(id);
    if(record.code != req.code) {
      throw new Meteor.Error("Input Wrong Code");
    } else {
      collection.remove(req._id);
    }
  },

  // A server side call for post message
  // * Currently NOT in use
  //   Post is accomplished in the client side
  post: function(req) {
    // Random primary key to avoid repeating
    var randId = Random.id();
    collection.insert({_id: randId, message: req.message, code: req.code});
  },

  removeAll: function() {
    collection.remove({});
  }
})
