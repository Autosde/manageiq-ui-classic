class ApplicationHelper::Toolbar::HostInitiatorsCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'host_initiator_vmdb',
    [
      select(
        :host_initiator_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          api_button(
            :host_initiator_refresh,
            nil,
            t = N_('Refresh selected Host Initiator(s)'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "HostInitiator"},
            :api          => {
              :action => 'refresh',
              :entity => 'host_initiators'
            },
            :confirm      => N_("Are you sure you want to refresh the selected Host Initiator(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
          button(
            :host_initiator_new,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Define a new Host Initiator'),
            t,
            :klass => ApplicationHelper::Button::HostInitiatorNew
          ),
          api_button(
            :host_initiator_delete,
            nil,
            t = N_('Delete selected Host Initiator(s)'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :delete,
                              :parent_class => "HostInitiator"},
            :api          => {
              :action => 'delete',
              :entity => 'host_initiators'
            },
            :confirm      => N_("Are you sure you want to delete the selected Host Initiator(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
        ]
      ),
    ]
  )
end
