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

    # scopes 
    public function scopeFilters($query, $filters)
    {
        $query
            ->when(!empty($filters['category_id']), function ($query) use ($filters) {
                $query->where('category_id', $filters['category_id']);
            });
    }
}
