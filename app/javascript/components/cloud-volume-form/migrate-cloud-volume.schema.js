import validateName from "../../helpers/validate-names";
import {componentTypes, validatorTypes} from "../../forms/data-driven-form";

const storageResources = async (volume_id) => {
  console.log("vol_id = ", volume_id);
  const originResourceId = await API.get(`/api/cloud_volumes/${volume_id}`)
    .then((resource) => {
      console.log("volume resource = ", resource);
      return resource.storage_resource_id;
    })
  return API.get(`/api/storage_resources?expand=resources`)
    .then(({resources}) => {
      const storageResourceOptions = resources.map(({id, name, ems_ref}) => ({label: name, value: ems_ref, id: id}));
      storageResourceOptions.unshift({label: `<${__('Choose')}>`, value: '-1'});
      const idx = storageResourceOptions.findIndex((item) => item.id === originResourceId);
      storageResourceOptions.splice(idx, 1);
      return storageResourceOptions
    })
};

const createSchema = (dynamicFields, volume_id) => ({
  fields: [
    {
      component: componentTypes.SELECT,
      name: 'dest_resource',
      id: 'dest_resource',
      label: __('Storage Resource Name'),
      loadOptions: () => storageResources(volume_id),
      isRequired: true,
      validate: [],
    },
    ...dynamicFields,
  ],
});

export default createSchema;
