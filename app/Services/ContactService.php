<?php 

namespace App\Services;

use App\Enums\CategoryEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

Class ContactService {
    public function handleFilters(Request $request)
    {
        $filters = $request->validate([
            'first_name' => ['nullable', 'string' , 'max:255'],
            'last_name' => ['nullable', 'string' , 'max:255'],
            'email' => ['nullable', 'email' , 'max:255'],
            'phone' => ['nullable', 'string' , 'max:255'],
            'address' => ['nullable', 'string' , 'max:255'],
            'notes' => ['nullable', 'string' , 'max:255'],
        ]);

        $filters['user_id'] = request()->user()->id;

        $isEmpty = 
        empty($filters['first_name']) && 
        empty($filters['last_name']) && 
        empty($filters['email']) && 
        empty($filters['phone']) && 
        empty($filters['address']) && 
        empty($filters['notes']);

        return [ 'isEmpty' => $isEmpty, 'filters' => $filters ]; 
    }
}