class ApplicationHelper::Toolbar::PhysicalStoragesCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'physical_storage_vmdb',
    [
      select(
        :physical_storage_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          api_button(
            :physical_storage_refresh,
            nil,
            t = N_('Refresh selected Physical Storage(s)'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "PhysicalStorage"},
            :api          => {
              :action => 'refresh',
              :entity => 'physical_storages'
            },
            :confirm      => N_("Are you sure you want to refresh the selected Physical Storage(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
          button(
            :physical_storage_new,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Attach a new Storage System'),
            t,
          ),
          button(
            :physical_storage_edit,
            'pficon pficon-edit fa-lg',
            t = N_('Edit selected Physical Storage'),
            t,
            :url_parms    => 'main_div',
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1'
          ),
          api_button(
            :physical_storage_delete,
            nil,
            t = N_('Delete selected Physical Storage(s)'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :delete,
                              :parent_class => "PhysicalStorage"},
            :api          => {
              :action => 'delete',
              :entity => 'physical_storages'
            },
            :confirm      => N_("Are you sure you want to delete this physical storage?\nNote that all of the attached services (e.g. volumes) will be unmapped."),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
        ]
      ),
    ]
  )
end
