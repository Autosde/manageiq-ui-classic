class ApplicationHelper::Toolbar::StorageServicesCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'storage_service_vmdb',
    [
      select(
        :storage_service_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          api_button(
            :storage_service_refresh,
            nil,
            t = N_('Refresh selected Storage Service(s)'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "StorageService"},
            :api          => {
              :action => 'refresh',
              :entity => 'storage_services'
            },
            :confirm      => N_("Are you sure you want to refresh the selected Storage Service(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
          button(
            :storage_service_new,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Create a new Storage Service'),
            t,
            :klass => ApplicationHelper::Button::StorageServiceNew
          ),
          button(
            :storage_service_edit,
            'pficon pficon-edit fa-lg',
            t = N_('Edit selected Storage Service'),
            t,
            :url_parms    => 'main_div',
            :send_checked => true,
            :enabled      => false,
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :update,
                              :parent_class => "StorageService"},
            :onwhen       => '1'
          ),
          api_button(
            :storage_service_delete,
            nil,
            t = N_('Delete selected Storage Service(s)'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :delete,
                              :parent_class => "StorageService"},
            :api          => {
              :action => 'delete',
              :entity => 'storage_services'
            },
            :confirm      => N_("Are you sure you want to delete the selected Storage Service(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
        ]
      ),
    ]
  )
end
