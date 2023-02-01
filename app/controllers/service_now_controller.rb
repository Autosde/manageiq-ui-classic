class ServiceNowController < ApplicationController
  include Mixins::GenericListMixin
  include Mixins::GenericShowMixin
  include Mixins::GenericSessionMixin
  include Mixins::BreadcrumbsMixin
  include Mixins::GenericFormMixin
  include Mixins::GenericButtonMixin


  def new
    assert_privileges("service_now_new")
    @in_a_form = true
    drop_breadcrumb(:name => _("Add New Service Now "), :url => "/service_now/new")
    @layout = "service_now"
  end


  def set_session_data
    session[:layout] = @layout
  end
end
