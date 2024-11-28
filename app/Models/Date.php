<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Date extends Model
{
    protected $guarded = ['id'];

    public $timestamps = false;
    
    # relations 
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expenses::class);
    }

    # overrides 
    public function delete()
    {
        $this->expenses()->delete();
        parent::delete();
    }
}
