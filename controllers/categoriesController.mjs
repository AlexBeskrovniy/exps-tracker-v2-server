export const getCategories = async (req, res) => {
    try {
        const categories = req.user.categories;
        res
            .status(200)
            .json(categories);
    } catch (err) {
        console.error(err)
        res.status(400).end();
    }
};

export const createCategory = async (req, res) => {
    try {
        const existedCategory = req.user.categories.find(category => category.name === req.body.name);
        if (existedCategory) {
            res.status(400).send({ message: `Category ${req.body.name} already exists` });
        } else {
            req.user.categories.push(req.body);
            await req.user.save();
            res
            .status(201)
            .json({...req.body });
        }
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = req.user.categories.id(req.body.id);
        if (category) {
            category.name = req.body.name;
            category.description = req.body.description;
            req.user.records.map(record => {
                if (record?.categoryID?.toString() === req.body.id) {
                    record.categoryName = req.body.name;
                }
            });
        }

        await req.user.save();

        res.status(200).json({...req.body});
    } catch (err) {
        console.error(err)
        res.status(400).send({ message: err.message });
    }
}

export const deleteCategory = async (req, res) => {
    try {
        req.user.categories.id(req.body.id).remove();

        req.user.records.map(record => {
            if (record?.categoryID?.toString() === req.body.id) {
                record.categoryID = null;
                record.categoryName = null;
            }
        });

        await req.user.save();

        res.status(200).json({...req.body});
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: err.message });
    }
}