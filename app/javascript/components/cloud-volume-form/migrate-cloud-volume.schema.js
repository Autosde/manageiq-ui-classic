import {componentTypes} from "../../forms/data-driven-form";
import filterResourcesByCapabilities from "../../helpers/storage_manager/filter-resources-by-capabilities";
import {getCapabilityUuid} from "../../helpers/storage_manager/filter-by-capabilities-utils";

async function getStorageResources(volumeId) {
  let [emsId, originResourceId] = await getParams(volumeId);

  const [resource, provider] = await Promise.all([
    API.get(`/api/storage_resources/${originResourceId}`),
    API.get(`/api/providers/${emsId}?attributes=capabilities`)
  ]);

  const appropriateResources = await Promise.all([resource.capabilities, provider.capabilities])
    .then((responses) => {
      const capsUuids = translateCapsArrToUuids(responses[0], responses[1]);
      return filterResourcesByCapabilities(capsUuids, responses[1]);
    });

  appropriateResources.unshift({label: `<${__('Choose')}>`, value: '-1'});

  const idx = appropriateResources.findIndex((item) => item.value === originResourceId);
  appropriateResources.splice(idx, 1);

  return appropriateResources;
}

const translateCapsArrToUuids = (capsArr, providerCapabilities) => {
  let capsUuids = []
  Object.keys(capsArr).forEach((capabilityName) => {
    capsUuids.push(getCapabilityUuid(providerCapabilities, capabilityName, capsArr[capabilityName][0]))
  })
  return capsUuids
}

async function getParams(volumeId) {
  let emsId;
  let originResourceId;

  await API.get(`/api/cloud_volumes/${volumeId}`)
    .then(volume => {
      emsId = volume.ems_id;
      originResourceId = volume.storage_resource_id;
    });

  return [emsId, originResourceId]
}

const createSchema = (dynamicFields, volume_id) => ({
  fields: [
    {
      component: componentTypes.SELECT,
      name: 'dest_resource',
      id: 'dest_resource',
      label: __('Storage Resource Name'),
      loadOptions: () => getStorageResources(volume_id),
      isRequired: true,
      validate: [],
    },
    ...dynamicFields,
  ],
});

export default createSchema;
