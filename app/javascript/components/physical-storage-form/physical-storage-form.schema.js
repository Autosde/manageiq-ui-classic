import { componentTypes, validatorTypes } from '@@ddf';

function createSchema(data) {
  return {
    fields: [
      {
        component: componentTypes.SELECT,
        name: 'ems_id',
        id: 'ems_id',
        label: __('Provider:'),
        options: data.provider.options,
        onChange: data.provider.onChange,
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'name',
        id: 'name',
        label: __('Name:'),
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },
      {
        component: componentTypes.SELECT,
        name: 'physical_storage_family_id',
        id: 'physical_storage_family_id',
        label: __('System Type:'),
        options: data.systemTypes.options,
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'management_ip',
        id: 'management_ip',
        label: __('Management IP:'),
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'user',
        id: 'user',
        label: __('User:'),
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'password',
        type: 'password',
        id: 'physical_storage_password',
        label: __('Password:'),
        validate: [{
          type: validatorTypes.REQUIRED,
          message: __('Required'),
        }],
      },

    ],
  };
}

export default createSchema;
