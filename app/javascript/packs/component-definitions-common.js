import React from 'react';

import { BreadcrumbsBar } from '../components/breadcrumbs';
import { MainMenu, Navbar } from '../menu';
import { Quadicon } from '../components/quadicon';
import { TagGroup, TableListView, GenericGroup } from '../components/textual_summary';
import { TagView } from '../tagging';
import { TreeViewRedux } from '../components/tree-view';
import { Toolbar } from '../components/toolbar';

import ActionForm from '../components/action-form';
import AddRemoveHostAggregateForm from '../components/host-aggregate-form/add-remove-host-aggregate-form';
import AddRemoveSecurityGroupForm from '../components/vm-cloud-add-remove-security-group-form';
import AeInlineMethod from '../components/AeInlineMethod';
import AggregateStatusCard from '../components/aggregate_status_card';
import AnsibleCredentialsForm from '../components/ansible-credentials-form';
import AnsiblePlayBookEditCatalogForm from '../components/ansible-playbook-edit-catalog-form';
import AnsiblePlaybookWorkflow from '../components/ansible-playbook-workflow';
import AnsibleRepositoryForm from '../components/ansible-repository-form';
import AttachDetachCloudVolumeForm from '../components/cloud-volume-form/attach-detach-cloud-volume-form';
import AuthKeypairCloudForm from '../components/auth-key-pair-cloud';
import AutomateSimulationForm from '../components/automate-simulation-form';
import AutomationSimulation from '../components/AutomationSimulation';
import ButtonList from '../components/data-tables/button-list';
import ButtonGroupList from '../components/data-tables/button-group-list';
import CatalogForm from '../components/catalog-form/catalog-form';
import CatalogItemsTable from '../components/data-tables/catalog-items-table';
import CatalogResource from '../components/data-tables/catalog-resource';
import ChargebackRate from '../components/data-tables/chargeback-rate';
import CloneCloudVolumeForm from '../components/cloud-volume-form/clone-cloud-volume-form';
import CloudDatabaseForm from '../components/cloud-database-form/cloud-database-form';
import CloudNetworkForm from '../components/cloud-network-form/cloud-network-form';
import CloudObjectStoreContainerForm from '../components/cloud-object-store-container-form';
import CloudTenantForm from '../components/cloud-tenant-form';
import CloudVolumeActions from '../components/cloud-volume-actions-form';
import CloudVolumeBackupForm from '../components/cloud-volume-backup-form';
import CloudVolumeForm from '../components/cloud-volume-form';
import ContainerDashboardCards from '../components/ems_container_dashboard';
import ContainerProjects from '../components/container-projects';
import CopyCatalogForm from '../components/copy-catalog-form/copy-catalog-form';
import CopyDashboardForm from '../components/copy-dashboard-form/copy-dashboard-form';
import CustomButtonForm from '../components/generic-objects-form/custom-button-form';
import CustomURLTabs from '../components/custom-url-tabs';
import DashboardWidget from '../components/dashboard-widgets/dashboard-charts';
import Datastore from '../components/data-tables/datastore';
import DatastoreForm from '../components/data-store-form';
import DbList from '../components/data-tables/db-list';
import DiagnosticsCollectLogForm from '../components/diagnostics-collect-log-form';
import DiagnosticsCURepairForm from '../components/c-and-u-collections-form';
import EditServiceForm from '../components/edit-service-form';
import EmbeddedTerraformCredentialMappingForm from '../components/embedded-terraform-credential-mapping-form';
import EmbeddedTerraformCredentialsForm from '../components/embedded-terraform-credentials-form';
import EmbeddedTerraformRepositoryForm from '../components/embedded-terraform-repository-form';
import EvacuateForm from '../components/evacuate-form';
import EventChart from '../components/provider-dashboard-charts/events-bar-chart';
import FilterDropdown from '../components/filter-dropdown';
import FilterProvisionInstance from '../components/filter-provision-instance';
import FirmwareRegistryForm from '../components/firmware-registry/firmware-registry-form';
import FlavorForm from '../components/flavor-form';
import FonticonPicker from '../components/fonticon-picker';
import FonticonPickerDdf from '../components/fonticon-picker/font-icon-picker-ddf';
import FormButtonsRedux from '../forms/form-buttons-redux';
import GenericGroupWrapper from '../react/generic_group_wrapper';
import GenericObjectForm from '../components/generic-objects-form';
import GroupForm from '../components/button-group';
import GtlView from '../components/gtl-view';
import HeatChart from '../components/provider-dashboard-charts/heat-map-chart';
import HostAggregateForm from '../components/host-aggregate-form';
import HostEditForm from '../components/host-edit-form/host-edit-form';
import HostInitiatorForm from '../components/host-initiator-form';
import HostInitiatorGroupForm from '../components/host-initiator-group-form';
import ImportDatastoreViaGit from '../components/automate-import-export-form/import-datastore-via-git';
import InterfacesForm from '../components/network-routers-interfaces-form';
import ISODatastoreTable from '../components/data-tables/iso-datastore-table';
import LiveMigrateForm from '../components/live-migrate-form';
import MarkdownPreview from '../components/MarkdownPreview';
import MiqAboutModal from '../components/miq-about-modal/miq-about-modal';
import MiqAeCustomization from '../components/miq-ae-customization';
import MiqAlertSetForm from '../components/miq-alert-set-form';
import MiqCustomTab from '../components/miq-custom-tab';
import MiqDataTable from '../components/miq-data-table';
import MiqMarkdown from '../components/MiqMarkdown';
import MiqPagination from '../components/miq-pagination';
import MiqStructuredList from '../components/miq-structured-list';
import MiqStructuredListHeader from '../components/miq-structured-list/miq-structured-list-header';
import MiqStructuredListInputs from '../components/miq-structured-list/miq-structured-list-body/value-tags/miq-structured-list-inputs';
import MiqTableCell from '../components/miq-data-table/miq-table-cell';
import MiqTableToolbar from '../components/miq-data-table/miq-table-toolbar';
import MiqToolbar from '../components/miq-toolbar';
import NetworkFloatingIPsForm from '../components/network-floatingIPs-form';
import NetworkSecurityGroupsForm from '../components/network-security-groups-form';
import NoRecordsFound from '../components/no-records-found';
import NotificationDrawer from '../components/notification-drawer/notification-drawer';
import NotificationMessage from '../components/notification-message';
import ObjectTypesList from '../components/data-tables/object-types-list';
import OpsTenantForm from '../components/ops-tenant-form/ops-tenant-form';
import OrcherstrationTemplateForm from '../components/orchestration-template/orcherstration-template-form';
import OptimizationList from '../components/data-tables/optimization/optimization_list';
import PerformanceChartWidget from '../components/performance-charts';
import PfAggregateStatusCard from '../components/pf_aggregate_status_card';
import PhysicalStorageForm from '../components/physical-storage-form';
import PodsTrendChart from '../components/provider-dashboard-charts/pod-trend-charts';
import PolicyProfileForm from '../components/policy-profile-form';
import ProvGrid from '../components/prov-grid';
import ProviderForm from '../components/provider-form';
import PxeCustomizationTemplateForm from '../components/pxe-customization-template-form';
import PxeImageForm from '../components/pxe-image-type-form';
import PxeIsoDatastoreForm from '../components/pxe-iso-datastore-form';
import PxeIsoImageForm from '../components/pxe-iso-image-form';
import PxeServersForm from '../components/pxe-servers-form/pxe-server-form';
import RecentHostGraph from '../components/provider-dashboard-charts/recent-host-chart';
import RecentVmGraph from '../components/provider-dashboard-charts/recent-vm-chart';
import ReconfigureTable from '../components/reconfigure-vm-form/reconfigure-table';
import ReconfigureVmForm from '../components/reconfigure-vm-form';
import RefreshDataNotification from '../components/refresh-data-notification';
import RegionForm from '../components/region-form';
import RemoveCatalogItemModal from '../components/remove-catalog-item-modal';
import RemoveGenericItemModal from '../components/remove-generic-item-modal';
import ReportChartWidget from '../components/create-report-chart-form';
import ReportDataTable from '../components/data-tables/report-data-table/report-data-table';
import ReportList from '../components/data-tables/reports/ReportList';
import RequestsTable from '../components/data-tables/requests-table';
import RequestWorkflowStatus from '../components/request-workflow-status';
import RetirementForm from '../components/retirement-form';
import RoleList from '../components/data-tables/role-list';
import RoutersForm from '../components/routers-form';
import ScheduleForm from '../components/schedule-form';
import SearchBar from '../components/search-bar';
import ServersDataChart from '../components/provider-dashboard-charts/servers-pie-chart';
import ServiceDetailStdout from '../components/service-detail-stdout';
import ServiceDialogFromForm from '../components/service-dialog-from-form/service-dialog-from';
import ServiceRequestDefault from '../components/service-request-default';
import SetOwnershipForm from '../components/set-ownership-form';
import SettingsCategoryForm from '../components/settings-category-form';
import SettingsCompanyCategories from '../components/settings-company-categories';
import SettingsCompanyTags from '../components/settings-company-tags';
import SettingsCompanyTagsEntryForm from '../components/settings-company-tags-entry-form';
import SettingsDetailsTab from '../components/settings-details-tab';
import SettingsLabelTagMapping from '../components/settings-label-tag-mapping';
import SettingsTasksForm from '../components/settings-tasks-form';
import SettingsTimeProfileForm from '../components/settings-time-profile-form';
import SettingsZone from '../components/settings-zone';
import StorageServiceForm from '../components/storage-service-form';
import SubnetForm from '../components/subnet-form';
import TableListViewWrapper from '../react/table_list_view_wrapper';
import TaggingWrapperConnected from '../components/taggingWrapper';
import TenantQuotaForm from '../components/tenant-quota-form';
import TerraformTemplateCatalogForm from '../components/terraform-template-catalog-form';
import TextualSummaryWrapper from '../react/textual_summary_wrapper';
import TimelineChart from '../components/timeline-options/timeline-chart';
import TimelineOptions from '../components/timeline-options/timeline-options';
import TimelinePage from '../components/timeline-options/timeline-page';
import TimelineTable from '../components/timeline-options/timeline-table';
import TimeProfileReportsTable from '../components/data-tables/time-profile-reports-table';
import TimeProfileTable from '../components/data-tables/time-profile-table';
import ToastList from '../components/toast-list/toast-list';
import UsageTrendChart from '../components/provider-dashboard-charts/usage-network-image-charts';
import UtilizationChartGraph from '../components/provider-dashboard-charts/provider-dashboard-utilization-chart';
import VisualSettingsForm from '../components/visual-settings-form';
import VmCommonRenameForm from '../components/vm-common-rename-form';
import VmEditForm from '../components/vm-edit-form';
import VmFloatingIPsForm from '../components/vm-floating-ips/vm-floating-ips-form';
import VmResizeForm from '../components/vm-resize-form/vm-resize-form';
import VmServerRelationshipForm from '../components/vm-server-relationship-form';
import VmSnapshotForm from '../components/vm-snapshot-form/vm-snapshot-form';
import VolumeMappingForm from '../components/volume-mapping-form';
import WidgetChart from '../components/dashboard-widgets/widget-chart';
import WidgetError from '../components/dashboard-widgets/widget-error';
import WidgetFooter from '../components/dashboard-widgets/widget-footer';
import WidgetMenu from '../components/dashboard-widgets/widget-menu';
import WidgetReport from '../components/dashboard-widgets/widget-report';
import WidgetWrapper from '../components/dashboard-widgets/widget-wrapper';
import WidgetZoom from '../components/dashboard-widgets/widget-zoom';
import WorkersForm from '../components/workers-form/workers-form';
import WorkflowCredentialMappingForm from '../components/workflow-credential-mapping-form';
import WorkflowCredentialsForm from '../components/workflow-credentials-form';
import WorkflowEntryPoints from '../components/workflows/workflow-entry-points';
import WorkflowPayload from '../components/workflows/workflow_payload';
import WorkflowRepositoryForm from '../components/workflow-repository-form';
import XmlHolder from '../components/XmlHolder';
import ZoneForm from '../components/zone-form';
import MiqAeClass from '../components/miq-ae-class';

/**
* Add component definitions to this file.
* example of component definition:
* ManageIQ.component.addReact('ComponentName', props => <ComponentName {...props} />);
*/

ManageIQ.component.addReact('ActionForm', ActionForm);
ManageIQ.component.addReact('AddRemoveHostAggregateForm', AddRemoveHostAggregateForm);
ManageIQ.component.addReact('AddRemoveSecurityGroupForm', AddRemoveSecurityGroupForm);
ManageIQ.component.addReact('AggregateStatusCard', AggregateStatusCard);
ManageIQ.component.addReact('AeInlineMethod', AeInlineMethod);
ManageIQ.component.addReact('AnsibleCredentialsForm', AnsibleCredentialsForm);
ManageIQ.component.addReact('AnsiblePlayBookEditCatalogForm', AnsiblePlayBookEditCatalogForm);
ManageIQ.component.addReact('AnsiblePlaybookWorkflow', AnsiblePlaybookWorkflow);
ManageIQ.component.addReact('AnsibleRepositoryForm', AnsibleRepositoryForm);
ManageIQ.component.addReact('AttachDetachCloudVolumeForm', AttachDetachCloudVolumeForm);
ManageIQ.component.addReact('AuthKeypairCloudForm', AuthKeypairCloudForm);
ManageIQ.component.addReact('AutomateSimulationForm', AutomateSimulationForm);
ManageIQ.component.addReact('AutomationSimulation', AutomationSimulation);
ManageIQ.component.addReact('BreadcrumbsBar', BreadcrumbsBar);
ManageIQ.component.addReact('ButtonList', ButtonList);
ManageIQ.component.addReact('ButtonGroupList', ButtonGroupList);
ManageIQ.component.addReact('CatalogForm', CatalogForm);
ManageIQ.component.addReact('CatalogItemsTable', CatalogItemsTable);
ManageIQ.component.addReact('CatalogResource', CatalogResource);
ManageIQ.component.addReact('ChargebackRate', ChargebackRate);
ManageIQ.component.addReact('CloneCloudVolumeForm', CloneCloudVolumeForm);
ManageIQ.component.addReact('CloudDatabaseForm', CloudDatabaseForm);
ManageIQ.component.addReact('CloudNetworkForm', CloudNetworkForm);
ManageIQ.component.addReact('CloudObjectStoreContainerForm', CloudObjectStoreContainerForm);
ManageIQ.component.addReact('CloudTenantForm', CloudTenantForm);
ManageIQ.component.addReact('CloudVolumeActions', CloudVolumeActions);
ManageIQ.component.addReact('CloudVolumeBackupForm', CloudVolumeBackupForm);
ManageIQ.component.addReact('CloudVolumeForm', CloudVolumeForm);
ManageIQ.component.addReact('ContainerDashboardCards', ContainerDashboardCards);
ManageIQ.component.addReact('ContainerProjects', ContainerProjects);
ManageIQ.component.addReact('CopyCatalogForm', CopyCatalogForm);
ManageIQ.component.addReact('CopyDashboardForm', CopyDashboardForm);
ManageIQ.component.addReact('CustomButtonForm', CustomButtonForm);
ManageIQ.component.addReact('CustomURLTabs', CustomURLTabs);
ManageIQ.component.addReact('DashboardWidget', DashboardWidget);
ManageIQ.component.addReact('Datastore', Datastore);
ManageIQ.component.addReact('DatastoreForm', DatastoreForm);
ManageIQ.component.addReact('DbList', DbList);
ManageIQ.component.addReact('DiagnosticsCollectLogForm', DiagnosticsCollectLogForm);
ManageIQ.component.addReact('DiagnosticsCURepairForm', DiagnosticsCURepairForm);
ManageIQ.component.addReact('EditServiceForm', EditServiceForm);
ManageIQ.component.addReact('EmbeddedTerraformCredentialMappingForm', EmbeddedTerraformCredentialMappingForm);
ManageIQ.component.addReact('EmbeddedTerraformCredentialsForm', EmbeddedTerraformCredentialsForm);
ManageIQ.component.addReact('EmbeddedTerraformRepositoryForm', EmbeddedTerraformRepositoryForm);
ManageIQ.component.addReact('EvacuateForm', EvacuateForm);
ManageIQ.component.addReact('EventChart', EventChart);
ManageIQ.component.addReact('FilterDropdown', FilterDropdown);
ManageIQ.component.addReact('FilterProvisionInstance', FilterProvisionInstance);
ManageIQ.component.addReact('FirmwareRegistryForm', FirmwareRegistryForm);
ManageIQ.component.addReact('FlavorForm', FlavorForm);
ManageIQ.component.addReact('FonticonPicker', FonticonPicker);
ManageIQ.component.addReact('FonticonPickerNew', FonticonPickerDdf);
ManageIQ.component.addReact('FormButtonsRedux', FormButtonsRedux);
ManageIQ.component.addReact('GenericGroup', GenericGroup);
ManageIQ.component.addReact('GenericGroupWrapper', GenericGroupWrapper);
ManageIQ.component.addReact('GenericObjectForm', GenericObjectForm);
ManageIQ.component.addReact('GroupForm', GroupForm);
ManageIQ.component.addReact('GtlView', GtlView);
ManageIQ.component.addReact('HeatChart', HeatChart);
ManageIQ.component.addReact('HostAggregateForm', HostAggregateForm);
ManageIQ.component.addReact('HostEditForm', HostEditForm);
ManageIQ.component.addReact('HostInitiatorForm', HostInitiatorForm);
ManageIQ.component.addReact('HostInitiatorGroupForm', HostInitiatorGroupForm);
ManageIQ.component.addReact('ImportDatastoreViaGit', ImportDatastoreViaGit);
ManageIQ.component.addReact('InterfacesForm', InterfacesForm);
ManageIQ.component.addReact('ISODatastoreTable', ISODatastoreTable);
ManageIQ.component.addReact('LiveMigrateForm', LiveMigrateForm);
ManageIQ.component.addReact('menu.MainMenu', MainMenu);
ManageIQ.component.addReact('menu.Navbar', Navbar);
ManageIQ.component.addReact('MarkdownPreview', MarkdownPreview);
ManageIQ.component.addReact('MiqAboutModal', MiqAboutModal);
ManageIQ.component.addReact('MiqAeCustomization', MiqAeCustomization);
ManageIQ.component.addReact('MiqAlertSetForm', MiqAlertSetForm);
ManageIQ.component.addReact('MiqCustomTab', MiqCustomTab);
ManageIQ.component.addReact('MiqDataTable', MiqDataTable);
ManageIQ.component.addReact('MiqMarkdown', MiqMarkdown);
ManageIQ.component.addReact('MiqPagination', MiqPagination);
ManageIQ.component.addReact('MiqStructuredList', MiqStructuredList);
ManageIQ.component.addReact('MiqStructuredListHeader', MiqStructuredListHeader);
ManageIQ.component.addReact('MiqStructuredListInputs', MiqStructuredListInputs);
ManageIQ.component.addReact('MiqTableCell', MiqTableCell);
ManageIQ.component.addReact('MiqTableToolbar', MiqTableToolbar);
ManageIQ.component.addReact('MiqToolbar', MiqToolbar);
ManageIQ.component.addReact('NetworkFloatingIPsForm', NetworkFloatingIPsForm);
ManageIQ.component.addReact('NetworkSecurityGroupsForm', NetworkSecurityGroupsForm);
ManageIQ.component.addReact('NoRecordsFound', NoRecordsFound);
ManageIQ.component.addReact('NotificationDrawer', NotificationDrawer);
ManageIQ.component.addReact('NotificationMessage', NotificationMessage);
ManageIQ.component.addReact('ObjectTypesList', ObjectTypesList);
ManageIQ.component.addReact('OpsTenantForm', OpsTenantForm);
ManageIQ.component.addReact('OrcherstrationTemplateForm', OrcherstrationTemplateForm);
ManageIQ.component.addReact('OptimizationList', OptimizationList);
ManageIQ.component.addReact('PerformanceChartWidget', PerformanceChartWidget);
ManageIQ.component.addReact('PfAggregateStatusCard', PfAggregateStatusCard);
ManageIQ.component.addReact('PhysicalStorageForm', PhysicalStorageForm);
ManageIQ.component.addReact('PodsTrendChart', PodsTrendChart);
ManageIQ.component.addReact('PolicyProfileForm', PolicyProfileForm);
ManageIQ.component.addReact('ProvGrid', ProvGrid);
ManageIQ.component.addReact('ProviderForm', ProviderForm);
ManageIQ.component.addReact('PxeCustomizationTemplateForm', PxeCustomizationTemplateForm);
ManageIQ.component.addReact('PxeImageForm', PxeImageForm);
ManageIQ.component.addReact('PxeIsoDatastoreForm', PxeIsoDatastoreForm);
ManageIQ.component.addReact('PxeIsoImageForm', PxeIsoImageForm);
ManageIQ.component.addReact('PxeServersForm', PxeServersForm);
ManageIQ.component.addReact('Quadicon', Quadicon);
ManageIQ.component.addReact('RecentHostGraph', RecentHostGraph);
ManageIQ.component.addReact('RecentVmGraph', RecentVmGraph);
ManageIQ.component.addReact('ReconfigureTable', ReconfigureTable);
ManageIQ.component.addReact('ReconfigureVmForm', ReconfigureVmForm);
ManageIQ.component.addReact('RefreshDataNotification', RefreshDataNotification);
ManageIQ.component.addReact('RegionForm', RegionForm);
ManageIQ.component.addReact('RemoveCatalogItemModal', RemoveCatalogItemModal);
ManageIQ.component.addReact('RemoveGenericItemModal', RemoveGenericItemModal);
ManageIQ.component.addReact('ReportChartWidget', ReportChartWidget);
ManageIQ.component.addReact('ReportDataTable', ReportDataTable);
ManageIQ.component.addReact('ReportList', ReportList);
ManageIQ.component.addReact('RequestsTable', RequestsTable);
ManageIQ.component.addReact('RequestWorkflowStatus', RequestWorkflowStatus);
ManageIQ.component.addReact('RetirementForm', RetirementForm);
ManageIQ.component.addReact('RoleList', RoleList);
ManageIQ.component.addReact('RoutersForm', RoutersForm);
ManageIQ.component.addReact('ScheduleForm', ScheduleForm);
ManageIQ.component.addReact('SearchBar', SearchBar);
ManageIQ.component.addReact('ServersDataChart', ServersDataChart);
ManageIQ.component.addReact('ServiceDetailStdout', ServiceDetailStdout);
ManageIQ.component.addReact('ServiceDialogFromForm', ServiceDialogFromForm);
ManageIQ.component.addReact('ServiceRequestDefault', ServiceRequestDefault);
ManageIQ.component.addReact('SetOwnershipForm', SetOwnershipForm);
ManageIQ.component.addReact('SettingsCategoryForm', SettingsCategoryForm);
ManageIQ.component.addReact('SettingsCompanyCategories', SettingsCompanyCategories);
ManageIQ.component.addReact('SettingsCompanyTags', SettingsCompanyTags);
ManageIQ.component.addReact('SettingsCompanyTagsEntryForm', SettingsCompanyTagsEntryForm);
ManageIQ.component.addReact('SettingsDetailsTab', SettingsDetailsTab);
ManageIQ.component.addReact('SettingsLabelTagMapping', SettingsLabelTagMapping);
ManageIQ.component.addReact('SettingsTasksForm', SettingsTasksForm);
ManageIQ.component.addReact('SettingsTimeProfileForm', SettingsTimeProfileForm);
ManageIQ.component.addReact('SettingsZone', SettingsZone);
ManageIQ.component.addReact('StorageServiceForm', StorageServiceForm);
ManageIQ.component.addReact('SubnetForm', SubnetForm);
ManageIQ.component.addReact('TableListView', TableListView);
ManageIQ.component.addReact('TableListViewWrapper', TableListViewWrapper);
ManageIQ.component.addReact('TaggingWrapperConnected', TaggingWrapperConnected);
ManageIQ.component.addReact('TagGroup', (props) => <TagGroup {...props} />);
ManageIQ.component.addReact('TagView', TagView);
ManageIQ.component.addReact('TenantQuotaForm', TenantQuotaForm);
ManageIQ.component.addReact('TerraformTemplateCatalogForm', TerraformTemplateCatalogForm);
ManageIQ.component.addReact('TextualSummaryWrapper', TextualSummaryWrapper);
ManageIQ.component.addReact('TimelineChart', TimelineChart);
ManageIQ.component.addReact('TimelineOptions', TimelineOptions);
ManageIQ.component.addReact('TimelinePage', TimelinePage);
ManageIQ.component.addReact('TimelineTable', TimelineTable);
ManageIQ.component.addReact('TimeProfileReportsTable', TimeProfileReportsTable);
ManageIQ.component.addReact('TimeProfileTable', TimeProfileTable);
ManageIQ.component.addReact('ToastList', ToastList);
ManageIQ.component.addReact('Toolbar', Toolbar);
ManageIQ.component.addReact('TreeViewRedux', TreeViewRedux);
ManageIQ.component.addReact('UsageTrendChart', UsageTrendChart);
ManageIQ.component.addReact('UtilizationChartGraph', UtilizationChartGraph);
ManageIQ.component.addReact('VisualSettingsForm', VisualSettingsForm);
ManageIQ.component.addReact('VmCommonRenameForm', VmCommonRenameForm);
ManageIQ.component.addReact('VmEditForm', VmEditForm);
ManageIQ.component.addReact('VmFloatingIPsForm', VmFloatingIPsForm);
ManageIQ.component.addReact('VmResizeForm', VmResizeForm);
ManageIQ.component.addReact('VmServerRelationshipForm', VmServerRelationshipForm);
ManageIQ.component.addReact('VmSnapshotForm', VmSnapshotForm);
ManageIQ.component.addReact('VolumeMappingForm', VolumeMappingForm);
ManageIQ.component.addReact('WidgetChart', WidgetChart);
ManageIQ.component.addReact('WidgetError', WidgetError);
ManageIQ.component.addReact('WidgetFooter', WidgetFooter);
ManageIQ.component.addReact('WidgetMenu', WidgetMenu);
ManageIQ.component.addReact('WidgetReport', WidgetReport);
ManageIQ.component.addReact('WidgetWrapper', WidgetWrapper);
ManageIQ.component.addReact('WidgetZoom', WidgetZoom);
ManageIQ.component.addReact('WorkersForm', WorkersForm);
ManageIQ.component.addReact('WorkflowCredentialMappingForm', WorkflowCredentialMappingForm);
ManageIQ.component.addReact('WorkflowCredentialsForm', WorkflowCredentialsForm);
ManageIQ.component.addReact('WorkflowEntryPoints', WorkflowEntryPoints);
ManageIQ.component.addReact('WorkflowPayload', WorkflowPayload);
ManageIQ.component.addReact('WorkflowRepositoryForm', WorkflowRepositoryForm);
ManageIQ.component.addReact('XmlHolder', XmlHolder);
ManageIQ.component.addReact('ZoneForm', ZoneForm);
ManageIQ.component.addReact('MiqAeClass', MiqAeClass);
