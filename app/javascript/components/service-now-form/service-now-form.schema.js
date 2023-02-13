import { componentTypes, validatorTypes } from '@@ddf';

const createSchema = () => ({
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'subject',
    label: 'Subject',
    isRequired: true,
    validate: [{ type: validatorTypes.REQUIRED }]
  },{
    component: componentTypes.TEXT_FIELD,
    name: 'details',
    label: 'Details',
    isRequired: true,
    validate: [{ type: validatorTypes.REQUIRED }]
  }]
});


export default createSchema;

