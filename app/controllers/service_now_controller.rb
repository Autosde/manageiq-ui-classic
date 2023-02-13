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
    @layout = "service_now"
    drop_breadcrumb(:name => _("Add New Service Now Ticket"), :url => "/service_now/new")
  end

  def connect
    assert_privileges("service_now_connect")
    @in_a_form = true
    @layout = "service_now"
    drop_breadcrumb(:name => _("Add New Service Now Instance "), :url => "/service_now/connect")
  end


  def set_session_data
    session[:layout] = @layout
  end
end
