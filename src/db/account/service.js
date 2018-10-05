const Model = require('./model');

exports.create = data => new Model(data).save();

exports.index = (query, page, limit) => Model.paginate(query, {
    page,
    limit,
});

exports.getOne = _id => Model.findById(_id);

exports.update = (_id, data) => Model.findByIdAndUpdate(_id, data);

exports.delete = _id => Model.findByIdAndDelete(_id);

exports.destroy = () => Model.deleteMany();

exports.authenticate = (email, password, callback) => Model.authenticate(email, password, callback);
