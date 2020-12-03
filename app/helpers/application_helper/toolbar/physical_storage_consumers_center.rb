class ApplicationHelper::Toolbar::PhysicalStorageConsumersCenter < ApplicationHelper::Toolbar::Basic
  button_group(
    'physical_storage_consumer_vmdb',
    [
      select(
        :physical_storage_consumer_vmdb_choice,
        nil,
        t = N_('Configuration'),
        t,
        :items => [
          button(
            :physical_storage_consumer_refresh,
            'fa fa-refresh fa-lg',
            N_('Refresh relationships and power states for all items related to these Physical Storage Consumers'),
            N_('Refresh Relationships and Power States'),
            :image   => "refresh",
            :data    => {'function'      => 'sendDataWithRx',
                         'function-data' => {:type => "refresh", :controller => "physicalStorageConsumerToolbarController"}},
            :confirm => N_("Refresh relationships and power states for all items related to these Physical Storage Consumers?"),
            :options => {:feature => :refresh}
          ),
          button(
            :physical_storage_consumer_define,
            'pficon pficon-add-circle-o fa-lg',
            t = N_('Define a new physical storage consumer'),
            t,
          ),
        ]
      ),
    ]
  )
end
