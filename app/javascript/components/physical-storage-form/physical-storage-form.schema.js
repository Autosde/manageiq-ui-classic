import { componentTypes, validatorTypes } from '@@ddf';
import React from 'react';

const loadProviders = () =>
  API.get(
    '/api/providers?expand=resources&attributes=id,name,supports_block_storage&filter[]=supports_block_storage=true&filter[]=supports_add_storage=true',
  ).then(({ resources }) =>
    resources.map(({ id, name }) => ({ value: id, label: name })));

const loadFamilies = (id) => API.get(`/api/providers/${id}?attributes=type,physical_storage_families`)
  // eslint-disable-next-line camelcase
  .then(({ physical_storage_families }) => physical_storage_families.map(({ name, id }) => ({
    label: name,
    value: id,
  })));

function getCapabilityName(capabilityId) {
  return new Promise(async function (resolve, reject) {
    const result = await API.get(`/api/storage_capabilities/${capabilityId}?attributes=name`)
    resolve(result['name'])
  })
}

// const getCapabilityName = (capabilityId) =>
//   API.get(`/api/storage_capabilities/${capabilityId}?attributes=name`)


const loadCapabilityValues = (familyId) =>
  API.get(
    `/api/physical_storage_families/${familyId}?attributes=storage_capability_values`)
  .then(
    ({storage_capability_values}) =>
      storage_capability_values.map(({storage_capability_id, ems_ref, value}) => ({
        label: getCapabilityName(storage_capability_id) + ": " + value,
        value: ems_ref
      })))

// const loadCapabilityValues = (familyId) =>
//           getCapabilityName(2).then((result) => console.log("This looks very Promise: ", result))


const createSchema = (edit, ems, initialValues, state, setState, familyId, setFamilyId) => {
  let emsId = state.ems_id;
  if (initialValues && initialValues.ems_id) {
    emsId = initialValues.ems_id;
  }

  return ({
    fields: [
      {
        component: 'validation-button',
        name: 'Validate',
        id: 'validate-credentials-button',
        skipSubmit: true,
        validationDependencies: ['management_ip', 'user', 'password'],
        fields: [
          {
            component: componentTypes.SELECT,
            name: 'ems_id',
            key: `${emsId}`,
            id: 'ems_id',
            label: __('Provider:'),
            isRequired: true,
            isDisabled: edit || ems,
            loadOptions: loadProviders,
            includeEmpty: true,
            onChange: (value) => setState({ ...state, ems_id: value }),
            validate: [{ type: validatorTypes.REQUIRED }],
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'name',
            id: 'name',
            label: __('Name:'),
            isDisabled: true,
            hideField: !edit,
          },
          {
            component: componentTypes.SELECT,
            name: 'physical_storage_family_id',
            id: 'physical_storage_family_id',
            label: __('System Type:'),
            isRequired: true,
            isDisabled: edit,
            validate: [{ type: validatorTypes.REQUIRED }],
            loadOptions: () => (emsId ? loadFamilies(emsId) : Promise.resolve([])),
            onChange: (value) => setFamilyId(value),
            includeEmpty: true,
            key: `physical_storage_family_id-${emsId}`,
            condition: {
              when: 'ems_id',
              isNotEmpty: true,
            },
          },
          {
            component: componentTypes.RADIO,
            id: 'capabilities',
            name: 'capabilities',
            label: __('Capabilities'),
            isRequired: true,
            options: [
              {
                label: 'Default',
                value: 'Default',
              },
              {
                label: 'Custom',
                value: 'Custom',
              },
          ],
            condition: {
              when: 'physical_storage_family_id',
              isNotEmpty: true,
            },
          },
          {
            component: componentTypes.SELECT,
            name: 'capabilities_values',
            id: 'capabilities_values',
            label: __('capabilities values:'),
            isRequired: true,
            isMulti: true,
            simpleValue: true,
            isDisabled: edit,
            loadOptions: () => (familyId ? loadCapabilityValues(familyId) : Promise.resolve([])),
            // loadOptions: loadCapabilityValues(familyId),
            includeEmpty: false,
            condition: {
              when: 'capabilities',
              is: 'Custom',
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'edit',
            id: 'edit',
            label: 'edit',
            hideField: true,
            initialValue: '',
          },
          {
            component: componentTypes.CHECKBOX,
            id: 'edit_authentication',
            name: 'edit_authentication',
            label: __('Edit Authentication'),
            initialValue: false,
            condition: {
              when: 'edit',
              is: 'yes',
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'management_ip',
            id: 'management_ip',
            type: 'text',
            label: __('Management IP:'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            condition: {
              or: [{ when: 'edit_authentication', is: true }, { when: 'edit', is: '' }],
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'user',
            id: 'user',
            type: 'text',
            label: __('User:'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            condition: {
              or: [{ when: 'edit_authentication', is: true }, { when: 'edit', is: '' }],
            },
          },
          {
            component: componentTypes.TEXT_FIELD,
            name: 'password',
            type: 'password',
            id: 'physical_storage_password',
            label: __('Password:'),
            isRequired: true,
            validate: [{ type: validatorTypes.REQUIRED }],
            condition: {
              or: [{ when: 'edit_authentication', is: true }, { when: 'edit', is: '' }],
            },
          },
        ]
      }
    ],
  });
};

export default createSchema;
