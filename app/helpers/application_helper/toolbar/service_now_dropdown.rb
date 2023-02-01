class ApplicationHelper::Toolbar::ServiceNowDropdown < ApplicationHelper::Toolbar::Basic
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
            N_('Create a ticket'),
            N_('Create a ticket'))
        ]
      ),
    ])
end

