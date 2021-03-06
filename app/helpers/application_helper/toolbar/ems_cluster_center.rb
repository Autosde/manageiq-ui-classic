class ApplicationHelper::Toolbar::EmsClusterCenter < ApplicationHelper::Toolbar::Basic
  button_group('ems_cluster_vmdb', [
    select(
      :cluster_vmdb_choice,
      nil,
      t = N_('Configuration'),
      t,
      :items => [
        button(
          :ems_cluster_scan,
          'fa fa-search fa-lg',
          N_('Perform SmartState Analysis on this item'),
          N_('Perform SmartState Analysis'),
          :confirm => N_("Perform SmartState Analysis on this item?")),
        button(
          :ems_cluster_delete,
          'pficon pficon-delete fa-lg',
          N_('Remove this item from Inventory'),
          N_('Remove item from Inventory'),
          :url_parms => "&refresh=y",
          :confirm   => N_("Warning: This item and ALL of its components will be permanently removed!")),
      ]
    ),
  ])
  button_group('ems_cluster_policy', [
    select(
      :ems_cluster_policy_choice,
      nil,
      t = N_('Policy'),
      t,
      :items => [
        button(
          :ems_cluster_protect,
          'pficon pficon-edit fa-lg',
          N_('Manage Policies for this item'),
          N_('Manage Policies')),
        button(
          :ems_cluster_tag,
          'pficon pficon-edit fa-lg',
          N_('Edit Tags for this item'),
          N_('Edit Tags')),
      ]
    ),
  ])
  button_group('ems_cluster_monitoring', [
    select(
      :ems_cluster_monitoring_choice,
      nil,
      t = N_('Monitoring'),
      t,
      :items => [
        button(
          :ems_cluster_perf,
          'ff ff-monitoring fa-lg',
          N_('Show Capacity & Utilization data for this item'),
          N_('Utilization'),
          :url       => "/show",
          :url_parms => "?display=performance",
          :klass     => ApplicationHelper::Button::EmsClusterPerformance),
        button(
          :ems_cluster_timeline,
          'ff ff-timeline fa-lg',
          N_('Show Timelines for this item'),
          N_('Timelines'),
          :url       => "/show",
          :url_parms => "?display=timeline",
          :klass     => ApplicationHelper::Button::EmsClusterTimeline),
      ]
    ),
  ])
end
