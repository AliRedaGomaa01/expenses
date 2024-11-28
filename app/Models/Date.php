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

    # scope

    public function scopeFilters($query, $filters)
    {
        $query
            ->when(!empty($filters['start_date']), function ($query) use ($filters) {
                $query->where('date', '>=', $filters['start_date']);
            })
            ->when(!empty($filters['end_date']), function ($query) use ($filters) {
                $query->where('date', '<=', $filters['end_date']);
            });
    }

    # overrides 
    public function delete()
    {
        $this->expenses()->delete();
        parent::delete();
    }
}
