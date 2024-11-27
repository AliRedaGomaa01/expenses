<?php 

namespace App\Enums;

class CategoryEnum {
    
    public static function toArray(){
        return [
            "0" => "أساسيات صعب الاستغناء عنها",
            "1" => "رفاهيات سهل الاستغناء عنها",
            "2" => "نفقات كبيرة نادرة التكرار",
        ];
    }
}