import validateEmail from '../validator/emailValidator';
import formValidator from '../validator/formValidator';
import AutocompletedAddressForm from '../services/address/AutocompletedAddressForm';
import AddressObject from '../services/address/AddressObject';

export default (formType) => {
    const form = dom('form[name="adherent_registration"]') || dom('form[name="become_adherent"]');
    const rootIdField = `#${form.name}`;

    const emailField = dom('#adherent_registration_emailAddress_first');
    const confirmEmailField = dom('#adherent_registration_emailAddress_second');
    const captchaBlock = dom('div.g-recaptcha');
    const countryField = dom(`${rootIdField}_address_country`);
    const cityNameField = dom(`${rootIdField}_address_cityName`);
    const genderField = dom(`${rootIdField}_gender`);
    const customGenderField = dom(`${rootIdField}_customGender`);
    const zipCodeField = dom(`${rootIdField}_address_postalCode`);
    const regionField = dom(`${rootIdField}_address_region`);

    if (null === countryField.value || 'FR' === countryField.value) {
        hide(regionField);
    }

    const address = new AddressObject(
        dom(`${rootIdField}_address_address`),
        zipCodeField,
        cityNameField,
        regionField,
        countryField
    );

    const autocompleteAddressForm = new AutocompletedAddressForm(
        dom('.address-autocomplete'),
        dom('.address-block'),
        address
    );

    autocompleteAddressForm.once('changed', () => {
        countryField.dispatchEvent(new CustomEvent('change', {
            target: countryField,
            detail: {
                zipCode: zipCodeField.value,
                cityName: cityNameField.value,
            },
        }));
    });

    autocompleteAddressForm.buildWidget();

    /**
     * Display/hide the second email field according the value of first email field
     *
     * @param event
     */
    const checkEmail = (event) => {
        if (validateEmail(event.target.value)) {
            removeClass(confirmEmailField.parentElement, 'visually-hidden');
        } else {
            addClass(confirmEmailField.parentElement, 'visually-hidden');
        }
    };

    /**
     * Display/hide the custom gender field according if the gender field value is "other"
     */
    const checkGender = () => {
        if ('other' === genderField.value) {
            removeClass(customGenderField.parentElement, 'visually-hidden');
        } else {
            addClass(customGenderField.parentElement, 'visually-hidden');
            customGenderField.value = '';
        }
    };

    /**
     * Display captcha block when the ZipCode is filled and remove the listener from ZipCode field
     *
     * @param event
     */
    const displayCaptcha = (event) => {
        if (captchaBlock
            && event.target.value
            && -1 !== captchaBlock.parentElement.className.indexOf('visually-hidden')
        ) {
            removeClass(captchaBlock.parentElement, 'visually-hidden');
            off(zipCodeField, 'input', displayCaptcha);
        }
    };

    if (emailField) {
        on(emailField, 'input', checkEmail);
        emailField.dispatchEvent(new Event('input'));
    }

    on(genderField, 'change', checkGender);
    checkGender();

    on(zipCodeField, 'input', displayCaptcha);
    zipCodeField.dispatchEvent(new Event('input'));

    formValidator(formType, form);
};
