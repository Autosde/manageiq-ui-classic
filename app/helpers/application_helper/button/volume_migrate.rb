class ApplicationHelper::Button::VolumeClone < ApplicationHelper::Button::Basic
  def disabled?
    if !@record.supports?(:migrate)
      @error_message = _("Cloud Volume \"%{name}\" cannot be migrated because %{reason}") % {:name => @record.name, :reason => @record.unsupported_reason(:migrate)}
    end
    @error_message.present?
  end
end

