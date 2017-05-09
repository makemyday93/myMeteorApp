import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';

import { collection } from '../collection/data.js';

import './main.html';

Template.body.helpers({
  tasks() {
    return collection.find({}, {fields: {'code': 0}}).fetch().reverse();
    // Code should not be sent to the front-end for security reason
  },
})

/*
  Please note that header and the rest of HTML body is seperated to two templates
  due to the reason of implementing events for body directly will cause all butt-
  ons to be binded to the same events. 
*/

Template.top.events({
  'click button'(event, instance) {
    // Use prompt window to handle input
    var input_msg = window.prompt("Message?");
    if(!input_msg) {
      return;
    }
    var input_code = window.prompt("Please Enter Your Code?");
    if(!input_code) {
      window.alert("Message not posted!");
      return;
    }

    // Random primary key to avoid repeating
    var randId = Random.id();
    collection.insert({_id: randId, message: input_msg, code: input_code});
  },
})

Template.task.events({
  'click button'(event, instance) {
    // Use prompt window to handle input
    var input_code = window.prompt("Please Enter Your Code?");
    Meteor.call('remove', {
      _id: event.target.value,  // Button value is binded to the record primary key
      code: input_code
    }, (err, res) => {
      if (err) {
        window.alert(err);
      } else {
        window.alert("Message Successfully Removed");
      }
    });
  },
})

