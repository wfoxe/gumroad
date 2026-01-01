# frozen_string_literal: true

InertiaRails.configure do |config|
  config.deep_merge_shared_data = true
end

module InertiaRails
  class Renderer
    unless method_defined?(:page_without_flash)
      alias_method :page_without_flash, :page
    end

    def page
      page = page_without_flash
      return page if page.key?(:flash)

      flash_data = @controller.flash.to_hash.symbolize_keys.slice(:notice, :alert, :warning).compact_blank
      page[:flash] = flash_data if flash_data.present?
      page
    end
  end
end
