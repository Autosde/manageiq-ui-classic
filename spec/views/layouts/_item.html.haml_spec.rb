describe "layouts/_item.html.haml" do
  it "check if correct items are being rendered for filesystem" do
    set_controller_for_view("host")
    fs = FactoryBot.create(:filesystem, :contents => "contents")
    assign(:view, FactoryBot.create(:miq_report_filesystem))
    assign(:item, fs)
    assign(:lastaction, 'filesystems')
    render :template => "layouts/_item"

    expect(response).to have_selector('label', :text => 'Name')
    expect(response).to have_selector('label', :text => 'File Name')
    expect(response).to have_selector('label', :text => 'File Version')
    expect(response).to have_selector('label', :text => 'Size')
    expect(response).to have_selector('label', :text => 'Contents Available')
    expect(response).to have_selector('label', :text => 'Permissions')
    expect(response).to have_selector('label', :text => 'Collected On')
    expect(response).to have_selector('label', :text => 'Contents')
    expect(response).to have_selector('a', :text => 'Download')
  end
end
