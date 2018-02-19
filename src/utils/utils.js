const config = {
    debug: true
};

const log = s => !config.debug || console.log(s);

export default {
    log
};
