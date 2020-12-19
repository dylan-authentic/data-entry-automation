const elementIds = [
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_First_Name',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_Middle_Name',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_Last_Name',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_DropDown_ccontact_Suffix',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_DropDown_NYCLA_Demographics_LAW_SCHOOL',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_Company',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_Address_Address1',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_Address_Address2',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_Address_City',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_DropDown_Address_State_Province',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_Address_PostalCode',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_DropDown_NYCLA_Demographics_DEPARTMENT',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_Work_Phone',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_ccontact_Email',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_DropDown_NYCLA_SIGN_UP_FORM_NY_ADMIT_YR',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_UserFields_Password',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_TextBox_UserFields_ConfirmPassword',
    '#ctl01_TemplateBody_WebPartManager1_gwpste_container_ocaform_ciocaform_VA_InnerPage_VA_Button_21'
]

function createElementArray(values) {
    return [
        {name: 'firstNameElement', e: values[0]},
        {name: 'middleNameElement', e: values[1]},
        {name: 'lastNameElement', e: values[2]},
        {name: 'suffixElement', e: values[3]},
        {name: 'lawSchoolElement', e: values[4]},
        {name: 'employerNameElement', e: values[5]},
        {name: 'employerAddressElement', e: values[6]},
        {name: 'addressLine2Element', e: values[7]},
        {name: 'cityElement', e: values[8]},
        {name: 'stateElement', e: values[9]},
        {name: 'zipElement', e: values[10]},
        {name: 'judicialDeptElement', e: values[11]},
        {name: 'phoneElement', e: values[12]},
        {name: 'emailElement', e: values[13]},
        {name: 'yearAdmittedElement', e: values[14]},
        {name: 'passwordElement', e: values[15]},
        {name: 'passwordConfirmElement', e: values[16]},
        {name: 'submitButton', e: values[17]}
    ]
}

function switchJudicialValue(num) {
    switch(num) {
        case 1:
            return '1st';
        case 2:
            return '2nd';
        case 3:
            return '3rd';
        case 4:
            return '4th';
        default:
            break;
    }
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

const lib = {
    elementIds,
    createElementArray,
    switchJudicialValue,
    capitalizeFirstLetter
}

module.exports = lib;