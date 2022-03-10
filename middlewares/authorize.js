const Role = {
    Candidate: 0,
    Recruiter: 1,
    Admin: 2
};

const authorizeRecruiter = (req, res, next) => {
    if (req.role === Role.Recruiter) next();
    else res.status(403).send('Forbidden');
};

const authorizeAdmin = (req, res, next) => {
    if (req.role === Role.Admin) next();
    else res.status(403).send('Forbidden');
}

module.exports = { authorizeAdmin, authorizeRecruiter };