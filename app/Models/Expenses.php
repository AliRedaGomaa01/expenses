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
            ->when(!empty($filters['user_id']), function ($query) use ($filters) {
                $query->whereHas('date', function ($query) use ($filters) {
                    $query->where('user_id', $filters['user_id']);
                });
            })
            ->when(!empty($filters['name']), function ($query) use ($filters) {
                $query->where('name', 'like', '%' . $filters['name'] . '%');
            })
            ->when(!empty($filters['category_id']), function ($query) use ($filters) {
                $query->where('category_id', $filters['category_id']);
            })
            ->when(!empty($filters['start_date']), function ($query) use ($filters) {
                $query->whereHas('date', function ($query) use ($filters) {
                    $query->where('dates.date', '>=', $filters['start_date']);
                });
            })
            ->when(!empty($filters['end_date']), function ($query) use ($filters) {
                $query->whereHas('date', function ($query) use ($filters) {
                    $query->where('dates.date', '<=', $filters['end_date']);
                });
            })
        ;
    }
}
