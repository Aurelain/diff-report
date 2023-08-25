/**
 *
 */
const cls = (...args) => {
    const names = [];
    for (const item of args) {
        if (item) {
            names.push(item);
        }
    }
    return names.join(' ');
};

export default cls;
