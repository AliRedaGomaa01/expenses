<?php

namespace App\Http\Requests;

use App\Enums\CategoryEnum;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class ContactRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return isset(request()?->user()?->id);
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    // check if request is post or update 
    $rules = !isset(request()?->contact?->id) || request()->isMethod('POST') ? [
      'contacts' => ['required', 'array'],
      'contacts.*.first_name' => ['required', 'string', 'max:255'],
      'contacts.*.last_name' => ['required', 'string', 'max:255'],
      'contacts.*.phone' => ['required', 'string', 'max:255'],
      'contacts.*.email' => ['nullable', 'email', 'max:255'],
      'contacts.*.address' => ['nullable', 'string', 'max:255'],
      'contacts.*.notes' => ['nullable', 'string', 'max:255'],
    ] : [
      'first_name' => ['required', 'string', 'max:255'],
      'last_name' => ['required', 'string', 'max:255'],
      'phone' => ['required', 'string', 'max:255'],
      'email' => ['nullable', 'email', 'max:255'],
      'address' => ['nullable', 'string', 'max:255'],
      'notes' => ['nullable', 'string', 'max:255'],
    ];

    return $rules;
  }
}
