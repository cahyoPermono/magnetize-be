const ProcessEvaluation = require('./ProcessEvaluation');

exports.ProcessEvaluationPost = async (body) => {
    const data = { ...body };
    await ProcessEvaluation.create(data);
};

exports.allProcessEvaluationGet = async () => {
    const data = await ProcessEvaluation.findAll();
    return data;
};

exports.ProcessEvaluationGet = async (id) => {
    return await ProcessEvaluation.findOne({
        where: { id: id },
    });
};

exports.ProcessEvaluationDelete = async (id) => {
    const del = await ProcessEvaluation.findOne({ where: { id: id } });
    if (del) {
        del.destroy();
    }
};