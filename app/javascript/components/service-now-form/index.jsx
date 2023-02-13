import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MiqFormRenderer from '@@ddf';
import createSchema from './service-now-form.schema';
import miqRedirectBack from '../../helpers/miq-redirect-back';
import {API} from "../../http_api";



const ServiceNowForm = ({ recordId }) => {
  const [{ initialValues, isLoading }, setState] = useState({ isLoading: !!recordId });
  const submitLabel = !!recordId ? __('Save') : __('Add');
  const onSubmit = (values) => API.post('/api/service_nows',values).then((response) => {
    if (response.results) {
      add_flash(__('Service Now ticket added sucessfully'), 'success');
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

ServiceNowForm.propTypes = {
  recordId: PropTypes.string,
};
ServiceNowForm.defaultProps = {
  recordId: undefined,
};


export default ServiceNowForm;
