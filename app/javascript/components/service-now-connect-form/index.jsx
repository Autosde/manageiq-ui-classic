import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MiqFormRenderer from '@@ddf';
import createSchema from './service-now-connect-form.schema';
import miqRedirectBack from '../../helpers/miq-redirect-back';
import {API} from "../../http_api";



const ServiceNowConnectForm = ({ recordId }) => {
  const [{ initialValues, isLoading }, setState] = useState({ isLoading: !!recordId });
  const submitLabel = !!recordId ? __('Save') : __('Add');
  const onSubmit = (values) => API.post('/api/service_nows',{
    action:"connect",
    resource: {
      ...values,}
  }).then((response) => {
    if (response.results) {
      add_flash(__('Service Now instance added sucessfully'), 'success');
    } else {
      add_flash(response.error.message, 'error');
    }
  });

  return !isLoading && (
    <MiqFormRenderer
      schema={createSchema()}
      onSubmit={onSubmit}
      buttonsLabels={{ submitLabel }}
    />
  );
};

ServiceNowConnectForm.propTypes = {
  recordId: PropTypes.string,
};
ServiceNowConnectForm.defaultProps = {
  recordId: undefined,
};


export default ServiceNowConnectForm;
