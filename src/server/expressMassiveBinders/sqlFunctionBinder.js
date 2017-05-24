export default {
    /**
     * Returns an Express function
     * @param {function} condition Function called to know whether the main function should
     * be called or if we should just return []
     * @param {*} func
     * @param {*} params
     */
    bind(condition, sqlFunction, getParameters, formatEachResult) {
        return (req, res) => {
            const evaluatedCondition = condition(req.query, req.post);
            if (!evaluatedCondition) {
                res.status(200).send([]);
            } else {
                const functionParameters = getParameters(req.query, req.post);
                functionParameters.push((error, results) => {
                    if (error) {
                        res.status(200).send([]);
                    } else {
                        const finalResults = formatEachResult ? results.map(r => formatEachResult(r, req, res)) : results;
                        res.status(200).send(finalResults);
                    }
                });
                sqlFunction(...functionParameters);
            }
        };
    }
};
