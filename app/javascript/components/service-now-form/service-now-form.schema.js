import { componentTypes, validatorTypes } from '@@ddf';

const createSchema = () => ({
  fields: [{
    component: componentTypes.TEXT_FIELD,
    name: 'domain',
    label: 'Service Now domain',
    isRequired: true,
    validate: [{ type: validatorTypes.REQUIRED }]
  },{
    component: componentTypes.TEXT_FIELD,
    name: 'table',
    label: 'Table name',
    isRequired: true,
    validate: [{ type: validatorTypes.REQUIRED }]
  },{
    component: componentTypes.TEXT_FIELD,
    name: 'username',
    label: 'User name',
    isRequired: true,
    validate: [{ type: validatorTypes.REQUIRED }]
  },{
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
