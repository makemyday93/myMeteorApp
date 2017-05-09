import { Meteor } from 'meteor/meteor';
import { assert } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';

import { collection } from '../collection/data.js';
import '../server/main.js';

if (Meteor.isServer) {
  describe('Test', () => {
    describe('Post Messages Test', () => {
        before(() => {
            // Clear collection for test
            collection.remove({});
        });

        it('Can post message', () => {
            Meteor.call('post', {
                message: "test message 1",
                code: "001"
            }, (err, res) => {
                if (err) {
                } else {
                    
                }
            });

            const newMessage = collection.find({ message: "test message 1" }).fetch()[0];
            assert.equal(newMessage.code, '001');
        });

        it('Show 1 message', () => {
            var messages = collection.find({});
            assert.equal(messages.count(), 1);
        });
    });

    describe('Delete Message Test', () => {
        before(() => {
            // Clear collection for test
            collection.remove({});
            Meteor.call('post', {
                message: "123",
                code: "001"
            }, (err, res) => {
                if (err) {
                } else {
                    
                }
            });
            Meteor.call('post', {
                message: "456",
                code: "002"
            }, (err, res) => {
                if (err) {
                } else {
                    
                }
            });
        });

        it('Can delete owned message', () => {
            var messages = collection.find({ message: "123" }).fetch();

            Meteor.call('remove', {
                _id: messages[0]._id,
                code: '001'
            }, (err, res) => {
                if (err) {
                } else {
                    
                }
            });
            var messages = collection.find({});
            assert.equal(messages.count(), 1);

            var message = collection.findOne();
            messageId = message._id;
        });

        it('Cannot delete not owned message', () => {
            var messages = collection.find({ message: "456" }).fetch();

            Meteor.call('remove', {
                _id: messages[0]._id,
                code: "random"
            }, (err, res) => {
                if (err) {
                    
                } else {
                    
                }
            });
            var messages = collection.find({});
            assert.equal(messages.count(), 1);
        });
    });
  });
}