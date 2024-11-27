<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Expenses extends Model
{
    protected $guarded = ['id'];
    
    # relations
    public function date()
    {
        return $this->belongsTo(Date::class);
    }
}
