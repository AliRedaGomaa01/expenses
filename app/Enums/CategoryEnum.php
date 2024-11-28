<?php 

namespace App\Enums;

class CategoryEnum {
    
    public static function toArray(){
        return [
            [ 'id' => 1, 'name' => 'أساسيات صعب الاستغناء عنها' ],
            ['id' => 2, 'name' => 'رفاهيات سهل الاستغناء عنها او استبدالها'],
            ['id' => 3, 'name' => 'نفقات كبيرة نادرة التكرار'],
        ];
    }
}