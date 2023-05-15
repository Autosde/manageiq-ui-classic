class ApplicationHelper::Toolbar::HostInitiatorGroupCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'host_initiator_group_vmdb',
    [
      select(
        :host_initiator_group_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          api_button(
            :host_initiator_group_refresh,
            nil,
            t = N_('Refresh Host Initiator Group'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "HostInitiatorGroup"},
            :api          => {
              :action => 'refresh',
              :entity => 'host_initiator_groups'
            },
            :confirm      => N_("Are you sure you want to refresh this Host Initiator Group?"),
          ),
          api_button(
            :host_initiator_group_delete,
            nil,
            t = N_('Delete this Host Initiator Group'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::GenericFeatureButtonWithDisable,
            :options      => {:feature => :delete},
            :api          => {
              :action => 'delete',
              :entity => 'host_initiator_groups'
            },
            :confirm      => N_("Are you sure you want to delete this Host Initiator Group?"),
            :send_checked => true
          ),
          button(
            :host_initiator_group_edit,
            'pficon pficon-edit fa-lg',
            t = N_('Edit this Host Initiator Group'),
            t,
            :url_parms    => 'main_div',
            :send_checked => true,
            :klass        => ApplicationHelper::Button::GenericFeatureButtonWithDisable,
            :options      => {:feature => :update}
          ),
        ]
      ),
    ]
  )
end
