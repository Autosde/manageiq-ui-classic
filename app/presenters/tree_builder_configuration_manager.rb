class TreeBuilderConfigurationManager < TreeBuilder
  has_kids_for ManageIQ::Providers::ConfigurationManager, [:x_get_tree_cmf_kids]
  has_kids_for ConfigurationProfile, [:x_get_tree_cpf_kids]

  private

  def tree_init_options
    {:lazy => true}
  end

  def root_options
    {
      :text    => t = _("All Configuration Manager Providers"),
      :tooltip => t
    }
  end

  # Get root nodes count/array for explorer tree
  def x_get_tree_roots
    count_only_or_objects_filtered(false, ManageIQ::Providers::ConfigurationManager, "name")
  end

  def node_by_tree_id(id)
    # Creating empty record to show items under unassigned profiles group
    super(id) || ConfigurationProfile.new
  end

  def x_get_tree_cmf_kids(object, count_only)
    assigned_configuration_profile_objs =
      count_only_or_objects_filtered(count_only,
                                     ConfigurationProfile.where(:manager_id => object[:id]),
                                     "name")
    unassigned_configuration_profile_objs =
      fetch_unassigned_configuration_profile_objects(count_only, object[:id])

    assigned_configuration_profile_objs + unassigned_configuration_profile_objs
  end

  # Note: a lot of logic / queries to determine if should display menu item
  def fetch_unassigned_configuration_profile_objects(count_only, configuration_manager_id)
    unprovisioned_configured_systems = ConfiguredSystem.where(:configuration_profile_id => nil,
                                                              :manager_id               => configuration_manager_id)
    unprovisioned_configured_systems_filtered = Rbac.filtered(unprovisioned_configured_systems)
    if unprovisioned_configured_systems_filtered.count > 0
      unassigned_id = "#{configuration_manager_id}-unassigned"
      unassigned_configuration_profile =
        [ConfigurationProfile.new(:name       => "Unassigned Profiles Group|#{unassigned_id}",
                                  :manager_id => configuration_manager_id)]
    end
    count_only_or_objects(count_only, unassigned_configuration_profile || [])
  end

  def x_get_tree_cpf_kids(object, count_only)
    configured_systems = ConfiguredSystem.where(:configuration_profile_id => object[:id],
                                                :manager_id               => object[:manager_id])
    count_only_or_objects_filtered(count_only, configured_systems, "hostname")
  end
end
