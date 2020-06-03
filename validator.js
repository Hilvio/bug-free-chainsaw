const csv = require('csvtojson');

const validate = data => data.forEach(validateFields);

const validateFields = (row, index) => {
    const errors = Object.entries(row)
    .map(([key, value]) => validateField(key, value))
    .filter(error => !!error)

    const errorCount = errors ? errors.length : 0;

    if (errorCount > 0) {
        const rowNumber = index + 1;
        const message = `Row "${rowNumber}" contains "${errorCount}" errors:`
        console.error(message);
        errors.forEach(([error, value]) => console.error({ error, value }))
        console.error('')
    }
}

const validateField = (key, value) => {

    if (key === 'ID') { return validateId(value) }
    if (key === 'Name') { return validateName(value) }
    if (key === 'Foundation year') { return validateYear(value) }
    if (key === 'URL') { return validateUrl(value) }
    if (key === 'Address') { return validateAddress(value) }
    if (key === 'City') { return validateCity(value) }
    if (key === 'Contact email') { return validateEmail(value) }
    if (!VALID_FIELDS.includes(key)) { return [ 'UNKNOWN_FIELD', value ] }
}

const VALID_FIELDS = ['ID', 'Name', 'Foundation year', 'URL', 'Address', 'City', 'Contact email'];

const isEmpty = value => value === '';
const isEmailAddress = value => value.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)
const isUrl = value => value.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)
const isYear = value => value.match(/^\d{4}$/);

const validateId = value => {
    if (isEmpty(value)) { return [ 'ID_EMPTY', value ] }
}

const validateName = (value) => {
    if (isEmpty(value)) { return [ 'NAME_EMPTY', value ] }
}

const validateYear = (value) => {
    if (isEmpty(value)) { return [ 'FOUNDATION_YEAR_EMPTY', value ] }
    if (!isYear(value)) { return [ 'FOUNDATION_YEAR_INVALID', value ] }
}

const validateUrl = (value) => {
    if (isEmpty(value)) { return [ 'URL_EMPTY', value ] }
    if (!isUrl(value)) { return [ 'URL_INVALID', value ] }
}

const validateAddress = (value) => {
    if (isEmpty(value)) { return [ 'ADDRESS_EMPTY', value ] }
}

const validateCity = (value) => {
    if (isEmpty(value)) { return [ 'CITY_EMPTY', value ] }
}

const validateEmail = (value) => {
    if (isEmpty(value)) { return [ 'CONTACT_EMAIL_EMPTY', value ] }
    if(!isEmailAddress(value)) { return [ 'CONTACT_EMAIL_INVALID', value ] }
}

csv()
    .fromFile('./ankkalinnan_asiakkaat.csv')
    .then(validate);