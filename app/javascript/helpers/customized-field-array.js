import React from 'react';
import { FieldArray } from '@@ddf';
import FormRenderer, { useFieldApi, useFormApi } from '@data-driven-forms/react-form-renderer';
import mapper from '../forms/mappers/componentMapper';

const ArrayItem = ({ fields, name }) => {
  const { renderForm } = useFormApi();
  const editedFields = fields.map((field) => ({ ...field, name: `${name}.${field.name}` }));

  return (
    <>
      {renderForm(editedFields)}
      <br />
    </>
  );
};

const FieldArrayCustom = (props) => {
  const {
    fieldKey, fields, itemDefault, ...rest
  } = useFieldApi(props);

  return (
    <FieldArray key={fieldKey} name={rest.input.name}>
      {(array) => (
        <>
          {array.fields.map((name, index) => (
            <ArrayItem
              key={`${name || fieldKey}`}
              fields={fields}
              name={name}
              fieldKey={fieldKey}
              fieldIndex={index}
            />
          ))}
          {(array.fields.length === 0) && array.fields.push(itemDefault)}
        </>
      )}
    </FieldArray>
  );
};

const componentMapper = {
  ...mapper,
  'custom-field-array': FieldArrayCustom,
};

const CustomizedFieldArray = async(arrayName, arrayFields) => {
  const getFields = (arrayFields) => arrayFields.map((field) => ({
    component: field.component,
    id: field.id,
    name: field.name,
    label: field.label,
    options: field.options,
  }));

  const schema = {
    fields: [
      {
        component: 'custom-field-array',
        name: arrayName,
        fieldKey: 'field_array',
        title: arrayName,
        fields: getFields(arrayFields),
      },
    ],
  };

  return (
    <>
      <FormRenderer
        componentMapper={componentMapper}
        schema={schema}
      />
    </>
  );
};

export { CustomizedFieldArray };
