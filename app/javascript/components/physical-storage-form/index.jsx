import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'patternfly-react';
import MiqFormRenderer from "../../forms/data-driven-form";
import createSchema from './physical-storage-form.schema';
import {API} from "../../http_api";
import miqRedirectBack from "../../helpers/miq-redirect-back";


const PhysicalStorageForm = ({  providers, redirect}) => {


  const [systemTypes, setSystemTypes] = useState([]);

  const onSubmit = async (values) => {
    const message = __('Physical storage added');
    API.post('/api/physical_storages', {'action': 'create_new_physical_storage', 'resource': values})
       .then(() => miqRedirectBack(message, 'success', redirect)).catch((e) => {
         console.log('ERROR', e);
        miqSparkleOff();
    });
  };

  const onCancel = () => {
    const message = __('Adding of physical storage was cancelled by the user')
    miqRedirectBack(message, 'success', redirect);
  };

  useEffect(()=> {
    if(providers && providers.length > 0) {

      loadSystemTypes(providers[0].value)
    }
  }, [])

  const loadSystemTypes = async (emsId) => {
    miqSparkleOn();
    const {physical_storage_families} = await API.get(`/api/providers/${emsId}?attributes=type,physical_storage_families`, null)
      .catch((e) => {console.log(e)});
    setSystemTypes(physical_storage_families.map(item=> {
                                                          return {
                                                            label: item.name,
                                                            value: item.id
                                                          }
                                                        }));
    miqSparkleOff();
  }

  const onProviderChanged = (emsId) => {
    loadSystemTypes(emsId);
  }

  return (<Grid fluid style={{ paddingTop: 20 }}>
    <MiqFormRenderer
      initialValues={{
        ems_id: ''
      }}
      schema={createSchema({
        provider: {
          onChange: onProviderChanged,
          options: providers
        },
        systemTypes: {
          options: systemTypes
        }
      })}
      onSubmit={onSubmit}
      onCancel={onCancel}
      buttonsLabels={{
        submitLabel: window.__('Add'),
        cancelLabel: window.__('Cancel'),
      }}
    />
  </Grid>);
}


PhysicalStorageForm.propTypes = {
  providers: PropTypes.array,
  redirect: PropTypes.string,
};

PhysicalStorageForm.defaultProps = {
  providers: undefined,
  redirect: undefined,
};

export default PhysicalStorageForm;
