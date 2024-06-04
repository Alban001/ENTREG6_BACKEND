const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async (req, res) => {
    const users = await User.findAll();
    return res.json(users);
});

const create = catchError(async (req, res) => {
    const newUser = await User.create(req.body);
    return res.status(201).json(newUser);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.sendStatus(404);
    return res.json(user);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const [updatedCount, updatedUser] = await User.update(req.body, {
        where: { id },
        returning: true,
    });
    if (updatedCount === 0) return res.sendStatus(404);
    return res.json(updatedUser[0]);
});

const login = catchError(async(req,res)=>{
    const {email, password}= req.body;
    const user = await User.findOne({where : {email: email}});
    if(user === null) {
        return res.status(401).json({message: 'Invalid Users'})
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(isValid === false){
        return res.status(401).json({ message : 'Invalid Credentials'})
    }
    const token = jwt.sign(
        {user},
        process.env.TOKEN_SECRET,
        {expiresIn: "1d"}
    )
    return res.json({user, token})
})


module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    login
};
