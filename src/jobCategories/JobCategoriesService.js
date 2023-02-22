const JobCategories = require("./JobCategories");

exports.JobCategoriesPost = async (body) => {
    const data = { ...body };
    await JobCategories.create(data);
};

exports.allJobCategoriesGet = async () => {
    const data = await JobCategories.findAll();
    return data;
};

exports.JobCategoriesGet = async (id) => {
    return await JobCategories.findOne({
        where: { id: id },
    });
};

exports.JobCategoriesDelete = async (id) => {
    const del = await JobCategories.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};