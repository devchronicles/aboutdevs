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
            if (!condition(req, res)) {
                res.status(200).send([]);
            } else {
                // get each of the parameters
                const funcParams = params.map(p => p(req.query, req.post));
                console.log(funcParams);
                funcParams.push((error, result) => {
                    console.log(result);
                    if (error) {
                        if (process.env.NODE_ENV === 'development') {
                            /*eslint-disable*/
                            console.error(error);
                            /*eslint-enable*/
                        }
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
