describe ApplicationHelper::Button::PolymorphicConditionalButton do
  let(:view_context) { setup_view_context_with_sandbox({}) }

  describe "#backup_create" do
    let(:feature) { :backup_create }
    let(:props) do
      {:options => {:feature      => :backup_create,
                    :parent_class => "CloudVolume"}}
    end
    let(:button) { described_class.new(view_context, {}, {}, props) }

    context "with no providers" do
      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end

    context "with an OpenStack CloudManager supporting backup_create" do
      before { FactoryBot.create(:cloud_volume_openstack) }

      it "the button is enabled" do
        expect(button.disabled?).to be false
      end
    end

    context "with an Amazon CloudManager not supporting backup_create" do
      before { FactoryBot.create(:cloud_volume_amazon) }

      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end
  end

  describe "#backup_restore" do
    let(:feature) { :backup_restore }
    let(:props) do
      {:options => {:feature      => :backup_create,
                    :parent_class => "CloudVolume"}}
    end
    let(:button) { described_class.new(view_context, {}, {}, props) }

    context "with no providers" do
      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end

    context "with an OpenStack CloudManager supporting backup_restore" do
      before { FactoryBot.create(:cloud_volume_openstack) }

      it "the button is enabled" do
        expect(button.disabled?).to be false
      end
    end

    context "with an Amazon CloudManager not supporting backup_restore" do
      before { FactoryBot.create(:cloud_volume_amazon) }

      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end
  end

  describe "#safe_delete" do
    let(:feature) { :safe_delete }
    let(:props) do
      {:options => {:feature      => feature,
                    :parent_class => "CloudVolume"}}
    end
    let(:button) { described_class.new(view_context, {}, {}, props) }

    context "with no providers" do
      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end

    context "with an AutoSDE StorageManager supporting safe_delete" do
      # todo [liran] - I think we need to create cloud_volume_autosde in the autosde provider repo, similar to cloud_volume_amazon, and use it instead of ems_autosde
      before { FactoryBot.create(:ems_autosde) }

      it "the button is enabled" do
        expect(button.disabled?).to be false
      end
    end

    context "with an Amazon CloudManager not supporting safe_delete" do
      before { FactoryBot.create(:cloud_volume_amazon) }

      it "the button is disabled" do
        expect(button.disabled?).to be true
      end
    end
  end
end
