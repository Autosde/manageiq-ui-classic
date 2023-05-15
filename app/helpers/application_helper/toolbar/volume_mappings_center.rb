class ApplicationHelper::Toolbar::VolumeMappingsCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'volume_mapping_vmdb',
    [
      select(
        :volume_mapping_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          api_button(
            :volume_mapping_refresh,
            nil,
            t = N_('Refresh selected Volume Mapping(s)'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "VolumeMapping"},
            :api          => {
              :action => 'refresh',
              :entity => 'volume_mappings'
            },
            :confirm      => N_("Are you sure you want to refresh the selected Volume Mapping(s)?"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
          button(
            :volume_mapping_new,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Define a new Volume Mapping'),
            t,
            :klass => ApplicationHelper::Button::VolumeMappingNew
          ),
          api_button(
            :volume_mapping_delete,
            nil,
            t = N_('Delete selected Volume Mapping(s)'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :delete,
                              :parent_class => "VolumeMapping"},
            :api          => {
              :action => 'delete',
              :entity => 'volume_mappings'
            },
            :confirm      => N_("Warning: The selected volume mappings will be permanently deleted!"),
            :send_checked => true,
            :enabled      => false,
            :onwhen       => '1+'
          ),
        ]
      ),
    ]
  )
end
