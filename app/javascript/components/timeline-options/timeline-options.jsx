import React, { useState, useEffect } from 'react';
import MiqFormRenderer, {useFormApi
} from '@@ddf';
import PropTypes from 'prop-types';
import createSchemaSimple from './timeline-options-simple.schema';
import { Button } from 'carbon-components-react';
import mapper from '../../forms/mappers/componentMapper';
import {FormSpy} from "../../forms/data-driven-form";

const TimelineOptions = ({ url, isFilter }) => {
  const [{
    isLoading, fields, timelineEvents, managementGroupNames, managementGroupLevels, policyGroupNames, policyGroupLevels
  }, setState] = useState({
    isLoading: true,
    fields: []
  });

  const ParseId = () => {
    const url_split = url.split('/');
    return url_split[url_split.length - 1];
  }


  const loadSchema = (appendState = {}) => ({ data: { form_schema: { fields } } }) => {
    setState((state) => ({
      ...state,
      ...appendState,
      fields,
      isLoading: false,
    }));
  };

  useEffect(() => {
    if (isLoading) {
      API.options(`/api/event_streams`).then((dropdownValues) => {
        const data = dropdownValues.data.timeline_events;
        const managementGroupNames = []; const managementGroupLevels = []; const policyGroupNames = []; const
          policyGroupLevels = [];
        const timelineEvents = [
          { label: data.EmsEvent.description, value: 'EmsEvent' },
          { label: data.MiqEvent.description, value: 'MiqEvent' },
        ];

        const storageId = ParseId();

        if (isFilter && url.includes("ems_storage")) {
          API.get(`/api/providers/${storageId}?attributes=type,physical_storages`)
            .then((response) => {
              const firstId = response.physical_storages[0].id
              API.options(`/api/physical_storages/${firstId}?option_action=filter`)
                .then(loadSchema());
            });
        }

        // Management Events
        Object.entries(data.EmsEvent.group_names).forEach((entry) => {
          const [key, value] = entry;
          managementGroupNames.push({ label: value, value });
        });
        Object.entries(data.EmsEvent.group_levels).forEach((entry) => {
          const [key, value] = entry;
          managementGroupLevels.push({ label: value, value: key });
        });

        // Policy Events
        Object.entries(data.MiqEvent.group_names).forEach((entry) => {
          const [key, value] = entry;
          policyGroupNames.push({ label: value, value: key });
        });
        // NOTE: data.MiqEvent.group_levels does not have the expected `Both` option
        policyGroupLevels.push({ label: 'Success', value: 'success' });
        policyGroupLevels.push({ label: 'Failure', value: 'failure' });
        policyGroupLevels.push({ label: 'Both', value: 'both' });

        // TODO: is there a way to make the above more elegant/shorter?
        // NOTE: group_names for MiqEvents and MiqEvents includes the 'Other' option,
        // this did not exist in previous versions of the timeline
        setState((state) => ({
          ...state,
          isLoading: false,
          timelineEvents,
          managementGroupNames,
          managementGroupLevels,
          policyGroupNames,
          policyGroupLevels,
        }));
      });
    }
  });

  const onSubmit = (values) => {
    miqSparkleOn();
    console.log("values = ", values);
    const show = values.timelineEvents === 'EmsEvent' ? 'timeline' : 'policy_timeline';
    const categories = values.timelineEvents === 'EmsEvent' ? values.managementGroupNames : values.policyGroupNames;
    const vmData = {
      tl_show: show,
      tl_categories: categories,
      tl_levels: values.managementGroupLevels ? values.managementGroupLevels : [],
      tl_result: values.policyGroupLevels ? values.policyGroupLevels : 'success',
      tl_physical: values.PhysicalStorageId ? values.PhysicalStorageId: [],
    };
    console.log("vmData = ", vmData);
    window.ManageIQ.calendar.calDateFrom = values.startDate;
    window.ManageIQ.calendar.calDateTo = values.endDate;
    window.miqJqueryRequest(url, { beforeSend: true, data: vmData });
  };

  const onReset = () => {
    setState((state) => ({
      ...state,
    }));
  };

  return !isLoading && (
    <>
      <MiqFormRenderer
        componentMapper={mapper}
        schema={createSchemaSimple(
          timelineEvents, fields, managementGroupNames, managementGroupLevels, policyGroupNames, policyGroupLevels
        )}
        onSubmit={onSubmit}
        onReset={onReset}
        canReset
      />
    </>
  );
};

TimelineOptions.propTypes = {
  url: PropTypes.string,
  isFilter: PropTypes.bool,
  storageManagerId: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.any)
};

TimelineOptions.defaultProps = {
  url: '',
  isFilter: false,
  storageManagerId: undefined,
  fields: []
};

export default TimelineOptions;
