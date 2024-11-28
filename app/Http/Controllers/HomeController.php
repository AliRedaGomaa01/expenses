<?php

namespace App\Http\Controllers;

use ZipArchive;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class HomeController extends Controller
{

    function extractBuildToPublic()
    {
        $directoryPath = public_path('build');

        if (File::exists($directoryPath)) {
            if (File::isDirectory($directoryPath)) {
                File::deleteDirectory($directoryPath); // Or use File::deleteDirectory($directoryPath)
                echo "Directory deleted successfully.";
            } else {
                echo "Path exists but is not a directory.";
            }
        } else {
            echo "Directory does not exist.";
        }

        $zipFilePath = base_path('public/build.zip'); // Location of the build zip

        $publicPath = base_path('public/'); // Target directory in `public`

        // Check if the ZIP file exists
        if (!file_exists($zipFilePath)) {
            return "The zip file does not exist at path: $zipFilePath";
        }

        // Ensure the target directory exists
        if (!File::exists($publicPath)) {
            File::makeDirectory($publicPath, 0755, true);
        }

        // Open and extract the ZIP file
        $zip = new ZipArchive();
        if ($zip->open($zipFilePath) === true) {
            $zip->extractTo($publicPath); // Extract to public/build
            $zip->close();
            return "Extraction successful to $publicPath";
        } else {
            return "Failed to open the zip file.";
        }
    }
}
