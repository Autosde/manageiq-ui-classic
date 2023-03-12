import React from 'react';
import { componentTypes, validatorTypes } from '@@ddf';
import { loadProviderCapabilities } from '../../helpers/storage_manager/load-provider-capabilities';
import { getProviderCapabilities } from '../../helpers/storage_manager/filter-by-capabilities-utils';
import { CustomizedFieldArray } from '../../helpers/customized-field-array';
import validateName from '../../helpers/storage_manager/validate-names';

const loadProviders = () =>
  API.get(
    '/api/providers?expand=resources&attributes=id,name,supports_block_storage'
    + '&filter[]=supports_block_storage=true&filter[]=supports_add_storage=true',
  ).then(({ resources }) =>
    resources.map(({ id, name }) => ({ value: id, label: name })));

const capabilityFields = async(emsId) => getProviderCapabilities(emsId)
  .then((capabilities) => {
    const fields = [];
    Object.keys(capabilities).forEach((capability) => fields.push({
      component: componentTypes.select,
      id: capability,
      name: capability,
      label: capability.charAt(0).toUpperCase() + capability.slice(1),
      initialValue: '-1',
      options: [
        { label: 'N/A', value: '-1' },
        { label: capabilities[capability][0].value, value: capabilities[capability][0].uuid },
        { label: capabilities[capability][1].value, value: capabilities[capability][1].uuid },
      ],
    }));
    return fields;
  });

const createSchema = (edit, ems, initialValues, state, setState) => {
  let emsId = state.ems_id;
  let capabilityFields_;

  if (initialValues && initialValues.ems_id) {
    emsId = initialValues.ems_id;
    capabilityFields_ = capabilityFields(emsId);
  }

  return ({
    fields: [
      {
        component: componentTypes.SELECT,
        name: 'ems_id',
        key: `${emsId}`,
        id: 'ems_id',
        label: __('Storage Manager'),
        placeholder: __('<Choose>'),
        onChange: (value) => {
          emsId = value;
          capabilityFields_ = capabilityFields(emsId);
          return setState({ ...state, ems_id: value });
        },
        loadOptions: loadProviders,
        isDisabled: edit || ems,
        isRequired: true,
        includeEmpty: true,
        validate: [{ type: validatorTypes.REQUIRED }],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'name',
        id: 'name',
        label: __('Name:'),
        isRequired: true,
        validate: [
          { type: validatorTypes.REQUIRED },
          async(value) => validateName('storage_services', value, edit),
        ],
      },
      {
        component: componentTypes.TEXT_FIELD,
        name: 'description',
        id: 'description',
        label: __('Description:'),
        isRequired: false,
      },
      {
        component: componentTypes.SELECT,
        name: 'required_capabilities',
        id: 'required_capabilities',
        label: __('Required Capabilities'),
        placeholder: __('<Choose>'),
        loadOptions: () => (emsId ? loadProviderCapabilities(emsId) : Promise.resolve([])),
        isDisabled: edit,
        isRequired: true,
        isMulti: true,
        validate: [{ type: validatorTypes.REQUIRED }],
        condition: { when: 'ems_id', isNotEmpty: true },
      },
      <CustomizedFieldArray
        arrayName="required_capabilities2"
        arrayFields={capabilityFields_}
        condition={when: 'ems_id', isNotEmpty: true}
      />,
      // customizedFieldArray('required_capabilities2', capabilityFields_),
      // {
      //   component: componentTypes.FIELD_ARRAY,
      //   name: 'required_capabilities2',
      //   id: 'required_capabilities2',
      //   title: __('Required Capabilities'),
      //   condition: { when: 'required_capabilities', isNotEmpty: true },
      //   fields: [
      //     {
      //       component: componentTypes.TEXT_FIELD,
      //       name: 'bla',
      //       label: 'Bla',
      //     },
      //   ],
      // fields: emsId ? capabilityFields_ : [],
      // },
    ],
  });
};

export default createSchema;
