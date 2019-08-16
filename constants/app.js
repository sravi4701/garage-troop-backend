const Enum = require('../classes/abstract_enum');

const APP_CONTANTS = new Enum({
    STANDARD_LIST_LIMIT: 20,
    STANDARD_LIST_NO_LIMIT: -1,
    DEFAULT_SKIP: 0
});

module.exports = APP_CONTANTS;
