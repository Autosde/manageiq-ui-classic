class PhysicalStorageController < ApplicationController
  include Mixins::GenericListMixin
  include Mixins::GenericShowMixin
  include Mixins::GenericSessionMixin
  include Mixins::MoreShowActions
  include Mixins::BreadcrumbsMixin
  include Mixins::GenericButtonMixin

  before_action :check_privileges
  before_action :session_data
  after_action :cleanup_action
  after_action :set_session_data

  toolbar :physical_storage, :physical_storages

  def new
    @in_a_form = true
    drop_breadcrumb(:name => _("Add New %{table}") % {:table => ui_lookup(:table => table_name)},
                    :url  => "/#{controller_name}/new")
  end

  def self.table_name
    @table_name ||= "physical_storages"
  end

  def session_data
    @title  = _("Physical Storages")
    @layout = "physical_storage"
    @lastaction = session[:physical_storage_lastaction]
  end

  def set_session_data
    session[:layout] = @layout
    session[:physical_storage_lastaction] = @lastaction
  end

  def show_list
    process_show_list
  end

  def textual_group_list
    [
      %i[properties relationships asset_details],
    ]
  end
  helper_method(:textual_group_list)

  def breadcrumbs_options
    {
      :breadcrumbs => [
        {:title => _("Compute")},
        {:title => _("Physical Infrastructure")},
        {:title => _("Storages"), :url => controller_url},
      ],
    }
  end

  private

  def specific_buttons(pressed)
    case pressed
    when 'physical_storage_new'
      javascript_redirect(:action => 'new')
    when 'physical_storage_delete'
      # validate_results = validate_item_supports_action_button(:delete, PhysicalStorage)
      # javascript_redirect(:action => 'delete_physical_storage', :id => checked_item_id) if validate_results[:action_supported]
      @refresh_div = 'main_div'
      delete_storages
      return false
    else
      return false
    end

    if validate_results && validate_results[:message]
      render_flash(validate_results[:message], :error)
    end

    true
  end

  # delete selected physical storages
  def delete_storages
    assert_privileges("physical_storage_delete")
    storages = find_records_with_rbac(PhysicalStorage, checked_or_params)

    storages_to_delete = []
    storages.each do |storage|
      if storage.nil?
        add_flash(_("Physical Storage no longer exists."), :error)
      # elsif !storage.attachments.empty?
      #   add_flash(_("Physical Storage \"%{name}\" cannot be removed because it is attached to one or more Instances") %
      #                 {:name => storage.name}, :warning)
      else
        valid_delete = validate_item_supports_action_button(:delete, PhysicalStorage)
        if valid_delete[:action_supported]
          storages_to_delete.push(storage)
        else
          add_flash(_("Couldn't initiate deletion of Physical Storage \"%{name}\": %{details}") %
                        {:name    => storage.name,
                         :details => valid_delete[:message]}, :error)
        end
      end
    end
    delete_physical_storages(storages_to_delete) unless storages_to_delete.empty?

    # refresh the list if applicable
    if @lastaction == "show_list" && last_screen_url.include?(@lastaction)
      show_list
      @refresh_partial = "layouts/gtl"
    elsif @lastaction == "show" && @layout == "physical_storage"
      @single_delete = true unless flash_errors? || flash_warnings?
    else
      drop_breadcrumb(:name => 'dummy', :url => " ") # missing a bc to get correctly back so here's a dummy
      flash_to_session
      redirect_to(previous_breadcrumb_url)
    end
  end

  def delete_physical_storages(storages)
    # todo [liran] - maybe instead of it we can just call the api like that:
    # javascript_redirect(:action => 'delete', :resource => storage)

    storages.each do |storage|
      audit = {
          :event        => "physical_storage_record_delete_initiateed",
          :message      => "[#{storage.name}] Record delete initiated",
          :target_id    => storage.id,
          :target_class => "PhysicalStorage",
          :userid       => session[:userid]
      }
      AuditEvent.success(audit)
      storage.delete_physical_storage_queue(session[:userid])
    end
    add_flash(n_("Delete initiated for %{number} Physical Storage.",
                 "Delete initiated for %{number} Physical Storages.",
                 storages.length) % {:number => storages.length})
  end
end
