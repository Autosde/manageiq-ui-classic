class ApplicationHelper::Toolbar::HostInitiatorCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'host_initiator_vmdb',
    [
      select(
        :host_initiator_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          button(
            :host_initiator_refresh,
            'fa fa-refresh fa-lg',
            N_('Refresh relationships and power states for all items related to this Host Initiator'),
            N_('Refresh Relationships and Power States'),
            :image   => "refresh",
            :data    => {'function'      => 'sendDataWithRx',
                         'function-data' => {:type => "refresh", :controller => "hostInitiatorToolbarController"}},
            :confirm => N_("Refresh relationships and power states for all items related to this Host Initiator?"),
            :options => {:feature => :refresh}
          ),
          button(
            :host_initiator_delete,
            'pficon pficon-delete fa-lg',
            t = N_('Delete this Host Initiator'),
            t,
            :url_parms => 'main_div',
            :klass     => ApplicationHelper::Button::GenericFeatureButtonWithDisable,
            :options   => {:feature => :delete},
            :data      => {'function'      => 'sendDataWithRx',
                           'function-data' => {:controller      => 'provider_dialogs',
                                               :modal_title     => N_('Delete Host Initiator'),
                                               :modal_text      => N_('Are you sure you want to delete this host initiator?'),
                                               :api_url         => 'host_initiators',
                                               :async_delete    => false,
                                               :ajax_reload     => true,
                                               :redirect_url    => '/host_initiator/show_list',
                                               :try_safe_delete => true,
                                               :component_name  => 'RemoveGenericItemModal'}}
          ),
        ]
      ),
    ]
  )
end
