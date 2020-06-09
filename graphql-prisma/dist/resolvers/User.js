'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _getuserid = require('../utils/getuserid');

var _getuserid2 = _interopRequireDefault(_getuserid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = {
    posts: {
        fragment: 'fragment userId on User { id}',
        resolve: function resolve(parent, args, _ref, info) {
            var prisma = _ref.prisma,
                request = _ref.request;


            var userId = (0, _getuserid2.default)(request, false);
            return prisma.query.posts({
                where: {
                    published: true,
                    author: {
                        id: userId
                    }
                }
            });
            //     if(userID && userId === parent.id && parent.posts.published){
            //         return parent.author.posts
            //     }else{
            //         return null
            //     }
        }
    },
    email: {
        fragment: 'fragment userId on User { id }',
        resolve: function resolve(parent, args, _ref2, info) {
            var request = _ref2.request;


            var userId = (0, _getuserid2.default)(request, false);
            if (userId && userId === parent.id) {
                return parent.email;
            } else {
                return null;
            }
        }
    }
};

exports.default = User;