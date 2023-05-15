class ApplicationHelper::Toolbar::VolumeMappingCenter < ApplicationHelper::Toolbar::Basic
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
            t = N_('Refresh this Volume Mapping'),
            t,
            :icon         => "fa fa-refresh fa-lg",
            :klass        => ApplicationHelper::Button::PolymorphicConditionalButton,
            :options      => {:feature      => :refresh,
                              :parent_class => "VolumeMapping"},
            :api          => {
              :action => 'refresh',
              :entity => 'volume_mappings'
            },
            :confirm      => N_("Are you sure you want to refresh this Volume Mapping?"),
            ),
          api_button(
            :volume_mapping_delete,
            nil,
            t = N_('Delete this Volume Mapping'),
            t,
            :icon         => "pficon pficon-delete fa-lg",
            :klass        => ApplicationHelper::Button::GenericFeatureButtonWithDisable,
            :options      => {:feature => :delete},
            :api          => {
              :action => 'delete',
              :entity => 'volume_mappings'
            },
            :confirm      => N_("Are you sure you want to delete this Volume Mapping?"),
            :send_checked => true
          ),
        ]
      ),
    ]
  )
end
