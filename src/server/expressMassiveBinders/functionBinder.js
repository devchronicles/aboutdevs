export default {
    /**
     * Returns an Express function
     * @param {function} condition Function called to know whether the main function should
     * be called or if we should just return []
     * @param {*} func
     * @param {*} params
     */
    bind(condition, func, ...params) {
        return (req, res) => {
            const evaluatedCondition = condition(req.query, res.post);
            if (!evaluatedCondition) {
                res.status(200).send([]);
            } else {
                // get each of the parameters
                const funcParams = params.map(p => p(req.query, req.post));
                funcParams.push((error, result) => {
                    if (error) {
                        res.status(200).send([]);
                    } else {
                        res.status(200).send(result);
                    }
                });

                func(...funcParams);
            }
        };
    }
};
