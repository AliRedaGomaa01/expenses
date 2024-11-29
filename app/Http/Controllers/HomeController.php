<?php

namespace App\Http\Controllers;

use Exception;
use ZipArchive;
use App\Models\User;
use RecursiveIteratorIterator;
use RecursiveDirectoryIterator;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Artisan;

class HomeController extends Controller
{

    function extractBuildToPublic()
    {
        try {
            $directoryPath = public_path('build');

            if (File::exists($directoryPath)) {
                if (File::isDirectory($directoryPath)) {
                    File::deleteDirectory($directoryPath);
                    echo "Directory deleted successfully. \n";
                    echo "<br>";
                } else {
                    echo "Path exists but is not a directory. \n";
                    echo "<br>";
                }
            } else {
                echo "Directory does not exist. \n";
                echo "<br>";
            }

            $zipFilePath = base_path('public/build.zip');

            $destinationPath = base_path('public/build');

            if (!file_exists($zipFilePath)) {
                return "The zip file does not exist at path: $zipFilePath \n";
            }

            if (!File::exists($destinationPath)) {
                File::makeDirectory($destinationPath, 0755, true);
            }

            $zip = new ZipArchive();
            if ($zip->open($zipFilePath) === true) {
                $zip->extractTo($destinationPath);
                $zip->close();
                echo "Extraction successful to $destinationPath";
                echo "<br>";
            } else {
                echo "Failed to open the zip file. \n";
                echo "<br>";
            }

            // Ensure the source directory exists
            $sourceDirectory = public_path('build');
            if (!File::exists($sourceDirectory) || !File::isDirectory($sourceDirectory)) {
                return "Source directory does not exist. \n";
            }

            // Define the target 'assets' folder
            $assetsFolder = $sourceDirectory . DIRECTORY_SEPARATOR . 'assets';

            // Create the 'assets' folder if it doesn't exist
            if (!File::exists($assetsFolder)) {
                File::makeDirectory($assetsFolder, 0755, true);
            }

            // Get all files in the source directory
            $files = File::allFiles($sourceDirectory);

            foreach ($files as $file) {
                // Check if the filename contains a backslash
                $filename = $file->getFilename();

                // If the filename contains a backslash, remove the backslash
                if (strpos($filename, '\\') !== false) {
                    $newFilename = str_replace('\\', '', $filename);
                    $newFilename = str_replace('assets', '', $newFilename);

                    // Define the new file path in the 'assets' folder
                    $newFilePath = $assetsFolder . DIRECTORY_SEPARATOR . $newFilename;

                    // Rename (move) the file to the 'assets' folder
                    File::move($file->getRealPath(), $newFilePath);
                }
            }

            return "Files have been successfully extracted & organized. \n";
        } catch (Exception $e) {
            dd($e);
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

    public function test()
    {
        // 
    }
}
