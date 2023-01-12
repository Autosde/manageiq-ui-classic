class ApplicationHelper::Toolbar::ServiceNowDropdown < ApplicationHelper::Toolbar::Basic
  button_group('ems_storage_vmdb', [
                 select(
                   :ems_storage_vmdb_choice,
                   nil,
                   t = N_('Service Now'),
                   t,
                   :items => [
                     button(
                       :ems_storage_refresh,
                       'fa fa-refresh fa-lg',
                       N_('Open ticket'),
                       N_('Open ticket'),
                       :confirm => N_("Refresh relationships and power states for all items related to this Storage Manager?")),
                     button(
                       :ems_storage_delete,
                       'pficon pficon-delete fa-lg',
                       t = N_('Open service now'),
                       t,
                       :url_parms => "&refresh=y",
                       :confirm   => N_("Warning: This Storage Manager and ALL of its components will be permanently removed!")),
                   ]
                 ),
               ])
end
