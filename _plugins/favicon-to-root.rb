#!/usr/bin/env ruby

require 'fileutils'

module Jekyll
    Jekyll::Hooks.register :site, :post_write do |post|
        Dir.glob('assets/favicons/*.*') do |file|
            sourcePath = file
            outputPath = File.join('_site', File.basename(file) )
            FileUtils.cp(sourcePath, outputPath)
        end
        begin
            FileUtils.remove_entry_secure('_site/assets/favicons/')
        rescue
            print "Could not remove the favicons for some reason."
        end
    end
end
