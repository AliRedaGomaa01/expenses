<?php

namespace App\Http\Controllers;

use Exception;
use ZipArchive;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Illuminate\Support\Facades\File;

class HomeController extends Controller
{

    function extractBuildToPublic()
    {
        $directoryPath = public_path('build');

        if (File::exists($directoryPath)) {
            if (File::isDirectory($directoryPath)) {
                File::deleteDirectory($directoryPath);
                echo "Directory deleted successfully.";
            } else {
                echo "Path exists but is not a directory.";
            }
        } else {
            echo "Directory does not exist.";
        }

        $zipFilePath = base_path('public/build.zip');

        $destinationPath = base_path('public/build');

        if (!file_exists($zipFilePath)) {
            return "The zip file does not exist at path: $zipFilePath";
        }

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }

        $zip = new ZipArchive();
        if ($zip->open($zipFilePath) === true) {
            $zip->extractTo($destinationPath);
            $zip->close();
            return "Extraction successful to $destinationPath";
        } else {
            return "Failed to open the zip file.";
        }
    }

    function archiveBuild()
    {
        $filePath = public_path('build.zip');

        if (File::exists($filePath)) {
            File::delete($filePath);
            echo "ZIP file deleted successfully.";
        } else {
            echo "ZIP file does not exist.";
        }

        $destinationZip = base_path('public/build.zip');

        $sourceFolder = base_path('public/build');

        $zip = new ZipArchive();

        if (!is_dir($sourceFolder)) {
            throw new Exception("Source folder does not exist: $sourceFolder");
        }
    
        $zip = new ZipArchive();
    
        if ($zip->open($destinationZip, ZipArchive::CREATE | ZipArchive::OVERWRITE) === true) {
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($sourceFolder, RecursiveDirectoryIterator::SKIP_DOTS),
                RecursiveIteratorIterator::LEAVES_ONLY
            );
    
            foreach ($files as $file) {
                $filePath = $file->getRealPath();
                $relativePath = substr($filePath, strlen($sourceFolder) + 1);
    
                // Add the file to the ZIP archive
                $zip->addFile($filePath, $relativePath);
            }
    
            $zip->close();
            return "ZIP file created successfully at: $destinationZip";
        } else {
            throw new Exception("Failed to create the ZIP file.");
        }
    }
}
