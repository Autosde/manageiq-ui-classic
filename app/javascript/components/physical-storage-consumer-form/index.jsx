import React, { useState } from 'react';
import PropTypes from 'prop-types';

import MiqFormRenderer from '@@ddf';
import createSchema from './physical-storage-consumer-form.schema';
import miqRedirectBack from '../../helpers/miq-redirect-back';

const PhysicalStorageConsumerForm = ({ redirect }) => {
  const state = useState(undefined);

  const onSubmit = async(values) => {
    miqSparkleOn();
    const message = __('Physical storage consumer define');
    API.post('/api/physical_storage_consumers', { action: 'create', resource: values })
      .then(() => miqRedirectBack(message, 'success', redirect)).catch(miqSparkleOff);
  };

  const onCancel = () => {
    const message = __('defining of physical storage consumer was cancelled by the user');
    miqRedirectBack(message, 'success', redirect);
  };

  return (
    <MiqFormRenderer
      schema={createSchema(...state)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      buttonsLabels={{
        submitLabel: __('Add'),
        cancelLabel: __('Cancel'),
      }}
    />
  );
};

PhysicalStorageConsumerForm.propTypes = {
  redirect: PropTypes.string.isRequired,
};

export default PhysicalStorageConsumerForm;
