module MiqPolicyController::Events
  extend ActiveSupport::Concern

  def miq_event_edit
    assert_privileges("event_edit")
    case params[:button]
    when "cancel"
      @sb[:action] = @edit = nil
      add_flash(_("Edit Event cancelled by user"))
      get_node_info(x_node)
      replace_right_cell(:nodetype => @nodetype, :remove_form_buttons => true)
      return
    when "reset", nil # Reset or first time in
      event_build_edit_screen
      @sb[:action] = "event_edit"
      if params[:button] == "reset"
        add_flash(_("All changes have been reset"), :warning)
      end
      replace_right_cell(:nodetype => "ev")
      return
    end

    # Reload @edit/vars for other buttons
    id = params[:id] || "new"
    return unless load_edit("event_edit__#{id}", "replace_cell__explorer")

    @event = @edit[:event_id] ? MiqEventDefinition.find(@edit[:event_id]) : MiqEventDefinition.new
    policy = MiqPolicy.find(@sb[:node_ids][x_active_tree]["p"])
    @policy = policy

    case params[:button]
    when "save"
      event = MiqEventDefinition.find(@event.id) # Get event record
      action_list = @edit[:new][:actions_true].collect { |a| [MiqAction.find(a.last), {:qualifier => :success, :synchronous => a[1]}] } +
                    @edit[:new][:actions_false].collect { |a| [MiqAction.find(a.last), {:qualifier => :failure, :synchronous => a[1]}] }
      add_flash(_("At least one action must be selected to save this Policy Event"), :error) if action_list.blank?
      if @flash_array
        javascript_flash
        return
      end

      policy.replace_actions_for_event(event, action_list)
      AuditEvent.success(build_saved_audit(event))
      add_flash(_("Actions for Policy Event \"%{events}\" were saved") % {:events => event.description})
      @nodetype = "ev"
      event_get_info(MiqEventDefinition.find(event.id))
      @sb[:action] = @edit = nil
      replace_right_cell(:nodetype => "ev", :replace_trees => %i[policy_profile policy], :remove_form_buttons => true)
    when "true_right", "true_left", "true_allleft", "true_up", "true_down", "true_sync", "true_async"
      handle_selection_buttons(:actions_true, :members_chosen_true, :choices_true, :choices_chosen_true)
      session[:changed] = (@edit[:new] != @edit[:current])
      replace_right_cell(:nodetype => "ev")
    when "false_right", "false_left", "false_allleft", "false_up", "false_down", "false_sync", "false_async"
      handle_selection_buttons(:actions_false, :members_chosen_false, :choices_false, :choices_chosen_false)
      session[:changed] = (@edit[:new] != @edit[:current])
      replace_right_cell(:nodetype => "ev")
    end
  end

  private

  def event_build_edit_screen
    @edit = {}
    @edit[:new] = {}
    @edit[:current] = {}

    @event = MiqEventDefinition.find(params[:id])                 # Get event record
    policy = MiqPolicy.find(@sb[:node_ids][x_active_tree]["p"])   # Get the policy above this event
    @policy = policy                                              # Save for use in the view
    @edit[:key] = "event_edit__#{@event.id || "new"}"
    @edit[:rec_id] = @event.id || nil

    @edit[:event_id] = @event.id

    @edit[:new][:actions_true] = []
    policy.actions_for_event(@event, :success).each do |as| # Build true actions array
      sync = as.synchronous.nil? || as.synchronous
      @edit[:new][:actions_true].push([(sync ? "(S) " : "(A) ") + as.description, sync, as.id])
    end

    @edit[:new][:actions_false] = []
    policy.actions_for_event(@event, :failure).each do |af| # Build false actions array
      sync = af.synchronous.nil? || af.synchronous
      @edit[:new][:actions_false].push([(sync ? "(S) " : "(A) ") + af.description, sync, af.id])
    end

    @edit[:choices_true] = {}                      # Build a new choices list for true actions
    MiqAction.allowed_for_policies(policy.mode).each do |a|                      # Build a hash for the true choices
      @edit[:choices_true][a.description] = a.id
    end
    @edit[:new][:actions_true].each do |as|
      @edit[:choices_true].delete(as[0].slice(4..-1)) # Remove any choices already in the list (desc is first element, but has "(x) " in front)
    end

    @edit[:choices_false] = {}                      # Build a new choices list for false actions
    MiqAction.allowed_for_policies(policy.mode).each do |a|                       # Build a hash for the false choices
      @edit[:choices_false][a.description] = a.id
    end
    @edit[:new][:actions_false].each do |as|
      @edit[:choices_false].delete(as[0].slice(4..-1)) # Remove any choices already in the list (desc is first element, but has "(x) " in front)
    end

    @edit[:current] = copy_hash(@edit[:new])

    @embedded = true
    @in_a_form = true
    @edit[:current][:add] = true if @edit[:event_id].nil? # Force changed to be true if adding a record
    session[:changed] = (@edit[:new] != @edit[:current])
  end
end
