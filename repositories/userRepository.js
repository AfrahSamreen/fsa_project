const UserModel = require('../models/userModel');

const add = (data) => {
    const user = new UserModel(data);
    return user.save(); // async
};

const update = (email, data) => {
    const { firstName, lastName, mobile,
        qualification, degree, passout,
        skills, gender } = data;
    return UserModel.updateOne({ email }, {
        $set: {
            firstName,
            lastName,
            mobile,
            gender,
            qualification,
            degree,
            skills,
            passout,
            updatedAt: Date.now()
        }
    });
};

const getUsers = (pageIndex, pageSize, options) => {
    const projection = { __v: 0, _id: 0, password: 0 };
    const { name, qualification, degree, skills } = options;
    const filter = {
        $or: [
            { firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } },
        ]
    };
    if (degree) filter.degree = degree;
    if (qualification) filter.qualification = qualification;
    if (skills) {
        const skillsArr = skills.split(',');
        filter.skills = { $all: skillsArr };
    }
    const skipRows = pageIndex * pageSize;

    const sort = options.sort ? { [options.sort]: options.sortDir || 1 } : { updatedAt: -1 };

    return UserModel.find(filter, projection)
        .sort(sort)
        .skip(skipRows)
        .limit(pageSize);
}

const getUserByEmail = (email) => {
    const filter = { email };
    const projection = { __v: 0, _id: 0, password: 0 };
    return UserModel.findOne(filter, projection);
}

const getUserCount = (options) => {
    const { name, qualification, degree, skills } = options;
    const filter = {
        $or: [
            { firstName: { $regex: name, $options: 'i' } },
            { lastName: { $regex: name, $options: 'i' } },
        ]
    };
    if (degree) filter.degree = degree;
    if (qualification) filter.qualification = qualification;
    if (skills) {
        const skillsArr = skills.split(',');
        filter.skills = { $all: skillsArr };
    }
    return UserModel.count(filter);
}

const getUser = (email) => {
    return UserModel.findOne({ email }, { password: 1, email: 1, role: 1, firstName: 1, lastName: 1 });
}

module.exports = {
    add,
    update,
    getUsers,
    getUserByEmail,
    getUserCount,
    getUser
};