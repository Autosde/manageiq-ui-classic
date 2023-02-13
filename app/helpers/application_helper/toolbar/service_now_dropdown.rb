class ApplicationHelper::Toolbar::ServiceNowDropdown < ApplicationHelper::Toolbar::Basic
  auth = Authentication.in_my_region.find_by(:name => "service now")
  if auth.blank?
    button_group('service_now', [
      select(
        :service_now_choice,
        nil,
        t = N_('Service Now'),
        t,
        :items => [
          button(
            :service_now_connect,
            'fa fa-refresh fa-lg',
            t = N_('Connect'),
            t)
        ]
      ),
    ])
  else
    button_group('service_now', [
      select(
        :service_now_choice,
        nil,
        t = N_('Service Now'),
        t,
        :items => [
          button(
            :service_now_new,
            'fa fa-refresh fa-lg',
            t = N_('Create a ticket'),
            t)
        ]
      ),
    ])
  end
end

