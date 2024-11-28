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
                echo "Directory deleted successfully.\n";
            } else {
                echo "Path exists but is not a directory.\n";
            }
        } else {
            echo "Directory does not exist.\n";
        }
        
        $zipFilePath = base_path('public/build.zip');
        $destinationPath = base_path('public/build');
        
        if (!file_exists($zipFilePath)) {
            echo "The ZIP file does not exist at path: $zipFilePath\n";
            return;
        }
        
        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0755, true);
        }
        
        $zip = new ZipArchive();
        if ($zip->open($zipFilePath) === true) {
            $zip->extractTo($destinationPath);
            $zip->close();
            echo "Extraction successful to $destinationPath\n";
        } else {
            echo "Failed to open the ZIP file.\n";
        }
        
        // Check for misplaced files
        $files = File::allFiles($destinationPath);
        foreach ($files as $file) {
            $filePath = $file->getRealPath();
        
            if (strpos($filePath, '\\') !== false || strpos($filePath, '/') !== false) {
                $pathParts = explode(DIRECTORY_SEPARATOR, $filePath);
                $relativePath = array_slice($pathParts, -2); // Adjust to locate misplaced files
                $targetDir = implode(DIRECTORY_SEPARATOR, [$destinationPath, $relativePath[0]]);
                $newPath = $targetDir . DIRECTORY_SEPARATOR . $relativePath[1];
        
                // Ensure target directory exists
                if (!File::exists($targetDir)) {
                    File::makeDirectory($targetDir, 0755, true);
                }
        
                // Move file to its intended location
                File::move($filePath, $newPath);
            }
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
                $zip->addFile($filePath, $relativePath);
            }
    
            $zip->close();
            return "ZIP file created successfully at: $destinationZip";
        } else {
            throw new Exception("Failed to create the ZIP file.");
        }
    }
}
