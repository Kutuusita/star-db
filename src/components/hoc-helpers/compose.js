
const compose = (...funcs) => (comp) => {
    return funcs.reduceRight((orevResult, f) => f(orevResult), comp);
}

export default compose;