<?php

namespace App\Http\Requests;

use App\Enums\CategoryEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ExpenseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return isset(request()?->user()?->id) ;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $categoryIds = implode(',', ( collect(CategoryEnum::toArray())->pluck('id')->toArray() ) );
        
        if ( $this?->expense?->id ) {
            $rules = [
                'price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
                'name' => ['required', 'string' , 'max:255'],
                'category_id' => ['required', 'numeric' , 'in:'.$categoryIds], 
            ];
        } else {
            $rules = [
                'date' => ['required', 'date'],
                'expenses' => ['required', 'array' , 'min:1'],
                'expenses.*.price' => ['required', 'regex:/^\d+(\.\d{1,2})?$/'],
                'expenses.*.name' => ['required', 'string' , 'max:255'],
                'expenses.*.category_id' => ['required', 'numeric' , 'in:'.$categoryIds], 
            ];
        }

        return $rules;
    }
}
