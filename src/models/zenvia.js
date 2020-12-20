class ZenviaWhatsAppMessage {
    from = '';
    to = '';
    contents = [{
        type: '',
        text: '',
        payload: ''
    }];

    constructor(obj = null) {
        Object.assign(this, obj);
    }
}

module.exports = ZenviaWhatsAppMessage