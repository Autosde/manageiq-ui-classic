class ContainerDashboardService < DashboardService
  include ContainerServiceMixin
  include Mixins::CheckedIdMixin
  include TextualMixins::TextualRefreshStatus

  CPU_USAGE_PRECISION = 2 # 2 decimal points

  def initialize(provider_id, controller)
    @provider_id = provider_id
    @ems = find_record_with_rbac(ManageIQ::Providers::ContainerManager, @provider_id) if @provider_id.present?
    @resource = @ems || ManageIQ::Providers::ContainerManager.all
    @controller = controller
  end

  def all_data
    {
      :status    => status,
      :providers => providers,
    }.compact
  end

  def all_heatmaps_data
    {
      :heatmaps => heatmaps
    }.compact
  end

  def ems_utilization_data
    {
      :ems_utilization => ems_utilization
    }.compact
  end

  def network_metrics_data
    {
      :network_metrics => network_metrics
    }.compact
  end

  def pod_metrics_data
    {
      :pod_metrics => pod_metrics
    }.compact
  end

  def image_metrics_data
    {
      :image_metrics => image_metrics
    }.compact
  end

  def refresh_status_data
    {
      :last_refresh => @ems.present? ? refresh_status(@ems) : []
    }.compact
  end

  def status
    routes_count = if @ems.present?
                     @ems.respond_to?(:container_routes) ? @ems.container_routes.count : 0 # ems might not have routes
                   else
                     ContainerRoute.count
                   end

    {
      :nodes      => {
        :count        => @ems.present? ? @ems.container_nodes.count : ContainerNode.active.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_node)
      },
      :containers => {
        :count        => @ems.present? ? @ems.containers.count : Container.active.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container)
      },
      :registries => {
        :count        => @ems.present? ? @ems.container_image_registries.count : ContainerImageRegistry.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_image_registry)
      },
      :projects   => {
        :count        => @ems.present? ? @ems.container_projects.count : ContainerProject.active.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_project)
      },
      :pods       => {
        :count        => @ems.present? ? @ems.container_groups.count : ContainerGroup.active.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_group)
      },
      :services   => {
        :count        => @ems.present? ? @ems.container_services.count : ContainerService.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_service)
      },
      :images     => {
        :count        => @ems.present? ? @ems.container_images.count : ContainerImage.active.count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_image)
      },
      :routes     => {
        :count        => routes_count,
        :errorCount   => 0,
        :warningCount => 0,
        :href         => get_url_to_entity(:container_route)
      }
    }
  end

  def providers
    provider_classes_to_ui_types = ManageIQ::Providers::ContainerManager.subclasses.each_with_object({}) do |subclass, h|
      name = subclass.name.split('::')[2]
      h[subclass.name] = name.to_sym
    end
    providers = @ems.present? ? {@ems.type => 1} : ManageIQ::Providers::ContainerManager.group(:type).count

    result = {}
    providers.each do |provider, count|
      ui_type = provider_classes_to_ui_types[provider]
      (result[ui_type] ||= build_provider_status(ui_type))[:count] += count
    end
    all_providers_info = @ems.present? ? nil : {:count => ManageIQ::Providers::ContainerManager.count, :href => '/ems_container/show_list'}
    return result.values, all_providers_info
  end

  def build_provider_status(provider_type)
    if @ems.present?
      provider_status_icon = QuadiconHelper.provider_status("Valid", @ems.enabled?)[:fonticon]
      provider_fileicon = @ems.decorate.try(:fileicon)
    end

    {
      :count      => 0,
      :typeName   => _(provider_type.to_s),
      :iconImage  => provider_fileicon ? ActionController::Base.helpers.image_path(provider_fileicon) : nil,
      :statusIcon => provider_status_icon
    }
  end

  def get_url_to_entity(entity)
    if @ems.present?
      @controller.polymorphic_url(@ems, :display => entity.to_s.pluralize)
    else
      @controller.url_for_only_path(:action => 'show_list', :controller => entity)
    end
  end

  def realtime_heatmaps
    node_ids = @ems.present? ? @ems.container_nodes : ContainerNode.active
    metrics = Metric::Helper.latest_metrics(ContainerNode.name, REALTIME_TIME_RANGE.minutes.ago.utc, node_ids)
    metrics = metrics.includes(:resource)
    metrics = metrics.includes(:resource => [:ext_management_system]) if @ems.blank?
    heatmaps_data(metrics)
  end

  def hourly_heatmaps
    # Get latest hourly rollup for each node.
    node_ids = @ems.present? ? @ems.container_nodes : ContainerNode.active
    metrics = MetricRollup.latest_rollups(ContainerNode.name, node_ids)
    metrics = metrics.where('timestamp > ?', 1.day.ago.utc).includes(:resource)
    metrics = metrics.includes(:resource => [:ext_management_system]) if @ems.blank?

    data = heatmaps_data(metrics)
    data if data[:nodeCpuUsage]
  end

  def heatmaps_data(metrics)
    node_cpu_usage = []
    node_memory_usage = []

    metrics.each do |m|
      next if m.resource.nil? # Metrics are purged asynchronously and might be missing their node
      provider_name = @ems.present? ? @ems.name : m.resource.ext_management_system.name

      node_cpu_usage << {
        :id       => m.resource.id,
        :node     => m.resource.name,
        :provider => provider_name,
        :unit     => _("Cores"),
        :total    => m.derived_vm_numvcpus.present? ? m.derived_vm_numvcpus.round : nil,
        :percent  => m.cpu_usage_rate_average.present? ? (m.cpu_usage_rate_average / 100.0).round(CPU_USAGE_PRECISION) : nil # pf accepts fractions 90% = 0.90
      }

      node_memory_usage << {
        :id       => m.resource.id,
        :node     => m.resource.name,
        :provider => m.resource.ext_management_system.name,
        :unit     => _("GB"),
        :total    => m.derived_memory_available.present? ? m.derived_memory_available.round : nil,
        :percent  => m.mem_usage_absolute_average.present? ? (m.mem_usage_absolute_average / 100.0).round(CPU_USAGE_PRECISION) : nil # pf accepts fractions 90% = 0.90
      }
    end

    {
      :nodeCpuUsage    => node_cpu_usage.presence,
      :nodeMemoryUsage => node_memory_usage.presence,
      :title           => _("Node Utilization")
    }
  end

  def heatmaps
    hourly_heatmaps || realtime_heatmaps
  end

  def ems_utilization
    daily_utilization || hourly_utilization || realtime_utilization || empty_utilization_trend_data
  end

  def network_metrics
    daily_network_metrics || hourly_network_metrics || realtime_network_metrics || empty_network_trend_data
  end

  def hourly_image_metrics
    hourly_image_metrics = Hash.new(0)
    hourly_metrics.each do |m|
      hour = m.timestamp.beginning_of_hour.utc
      if m.stat_container_image_registration_rate.present?
        hourly_image_metrics[hour] += m.stat_container_image_registration_rate
      end
    end

    if hourly_image_metrics.size > 1
      {
        :dataAvailable => true,
        :interval_name => "hourly",
        :xy_data       => trend_data(hourly_image_metrics)
      }
    end
  end

  def daily_image_metrics
    daily_image_metrics = Hash.new(0)
    daily_metrics.each do |m|
      day = m.timestamp.beginning_of_day.utc
      daily_image_metrics[day] += m.stat_container_image_registration_rate if m.stat_container_image_registration_rate.present?
    end

    if daily_image_metrics.size > 1
      {
        :dataAvailable => true,
        :interval_name => "daily",
        :xy_data       => trend_data(daily_image_metrics)
      }
    end
  end

  def empty_metrics_data
    {:dataAvailable => false}
  end

  def image_metrics
    daily_image_metrics || hourly_image_metrics || empty_metrics_data
  end

  # ems has no realtime metrics but its nodes do.
  def realtime_metrics
    current_user = @controller.current_user
    tp = TimeProfile.profile_for_user_tz(current_user.id, current_user.get_timezone) || TimeProfile.default_time_profile
    Metric::Helper.find_for_interval_name('realtime', tp)
                  .where(:resource => @ems.try(:all_container_nodes) || ContainerNode.all)
                  .where('timestamp > ?', REALTIME_TIME_RANGE.minutes.ago.utc).order('timestamp')
  end
end
