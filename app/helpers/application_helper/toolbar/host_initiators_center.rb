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
          button(
            :host_initiator_refresh,
            'fa fa-refresh fa-lg',
            N_('Refresh relationships and power states for all items related to these Host Initiators'),
            N_('Refresh Relationships and Power States'),
            :image   => "refresh",
            :data    => {'function'      => 'sendDataWithRx',
                         'function-data' => {:type => "refresh", :controller => "hostInitiatorToolbarController"}},
            :confirm => N_("Refresh relationships and power states for all items related to these Host Initiators?"),
            :options => {:feature => :refresh}
          ),
          button(
            :host_initiator_new,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Define a new host initiator'),
            t,
            :klass => ApplicationHelper::Button::HostInitiatorNew
          ),
          button(
            :host_initiator_delete,
            'pficon pficon-delete fa-lg',
            t = N_('Delete selected Host Initiators'),
            t,
            :url_parms => 'main_div',
            :klass     => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options   => {:feature      => :delete,
                           :parent_class => "HostInitiator"},
            :data      => {'function'      => 'sendDataWithRx',
                           'function-data' => {:controller      => 'provider_dialogs',
                                               :modal_title     => N_('Delete Host Initiators'),
                                               :modal_text      => N_('Are you sure you want to delete these host initiators?'),
                                               :api_url         => 'host_initiators',
                                               :async_delete    => false,
                                               :ajax_reload     => false,
                                               :redirect_url    => '/host_initiator/show_list',
                                               :try_safe_delete => true,
                                               :component_name  => 'RemoveGenericItemModal'}},
            :enabled      => false,
            :onwhen       => '1+'
          ),
        ]
      ),
    ]
  )
end
