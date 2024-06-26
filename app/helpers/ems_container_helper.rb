module EmsContainerHelper
  include ContainerSummaryHelper
  include TextualSummary
  include ComplianceSummaryHelper

  def edit_redirect_path(lastaction, ems)
    lastaction == 'show_list' ? ems_containers_path : ems_container_path(ems)
  end
end
