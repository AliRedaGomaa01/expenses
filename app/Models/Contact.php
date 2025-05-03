<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
  protected $guarded = ['id'];

  # scopes 
  public function scopeFilters($query, $filters)
  {
    $query
      ->when(!empty($filters['first_name']), function ($query) use ($filters) {
        $query->where('first_name', 'like', '%' . $filters['first_name'] . '%');
      })
      ->when(!empty($filters['last_name']), function ($query) use ($filters) {
        $query->where('last_name', 'like', '%' . $filters['last_name'] . '%');
      })
      ->when(!empty($filters['phone']), function ($query) use ($filters) {
        $query->where('phone', 'like', '%' . $filters['phone'] . '%');
      })
      ->when(!empty($filters['email']), function ($query) use ($filters) {
        $query->where('email', 'like', '%' . $filters['email'] . '%');
      })
      ->when(!empty($filters['address']), function ($query) use ($filters) {
        $query->where('address', 'like', '%' . $filters['address'] . '%');
      })
      ->when(!empty($filters['notes']), function ($query) use ($filters) {
        $query->where('notes', 'like', '%' . $filters['notes'] . '%');
      })
      ;
  }
}
