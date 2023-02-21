const DepartementCategories = require("./DepartementCategories");

exports.departementCategoriesPost = async (body) => {
    const departementCategories = { ...body };
    await DepartementCategories.create(departementCategories);
};

exports.allDepartementCategoriesGet = async () => {
    const data = await DepartementCategories.findAll();
    return data;
};

exports.departementCategoriesGet = async (id) => {
    return await DepartementCategories.findOne({
        where: { id: id },
    });
};

exports.departementCategoriesDelete = async (id) => {
    const del = await DepartementCategories.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};