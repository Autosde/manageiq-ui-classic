import validateName from "../../helpers/validate-names";
import {componentTypes, validatorTypes} from "../../forms/data-driven-form";

const createSchema = (dynamicFields) => ({
  fields: [
    {
      component: componentTypes.TEXT_FIELD,
      name: 'resource_name',
      id: 'resource_name',
      label: __('Resource Name'),
      isRequired: true,
      validate: [
        {
          type: validatorTypes.REQUIRED,
        },
        {
          type: 'pattern',
          pattern: '^[a-zA-Z0-9\-_. ]*$',
          message: __('The name can contain letters, numbers, spaces, periods, dashes and underscores'),
        },
        {
          type: 'pattern',
          pattern: '^[^ ]+( +[^ ]+)*$',
          message: __('The name must not begin or end with a space'),
        },
        {
          type: 'pattern',
          pattern: '^[a-zA-Z_]',
          message: __('The name must begin with a letter or an underscore'),
        },
        async(value) => validateName('cloud_volumes', value, false),
      ],
    },
    ...dynamicFields,
  ],
});

export default createSchema;
