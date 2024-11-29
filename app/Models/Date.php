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
            })
            ->when(!empty($filters['user_id']), function ($query) use ($filters) {
                $query->where('user_id', $filters['user_id']);
            })
            ->when(!empty($filters['category_id']) || !empty($filters['name']) , function ($query) use ($filters) {
                $query->whereHas('expenses', function ($query) use ($filters) {
                    $query->when(!empty($filters['name']), function ($query) use ($filters) {
                        $query->where('name', 'like', '%' . $filters['name'] . '%');
                    })->when(!empty($filters['category_id']), function ($query) use ($filters) {
                        $query->where('category_id', $filters['category_id']);
                    });
                });
            });
    }

    # overrides 
    public function delete()
    {
        $this->expenses()->delete();
        parent::delete();
    }
}
