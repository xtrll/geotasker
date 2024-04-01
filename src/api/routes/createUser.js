const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({
            username,
            email,
            password
        })

        await newUser.save();
        res.status(201).json(newUser);
    } catch (e) {
        res.status(500).json({ message: 'Error creating user', e: e.message });
    }
}