<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Contact;
use Illuminate\Http\Request;
use App\Services\ContactService;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\ContactRequest;

class ContactController extends Controller
{
  public function __construct(
    public ContactService $contactService
  ) {
  }
  /**
   * Display a listing of the resource.
   */
  public function index(Request $request)
  {
    ['filters' => $filters, 'isEmpty' => $isEmpty] = $this->contactService->handleFilters($request);

    $contacts = $request->user()->contacts()->filters($filters)
      ->latest()
      ->paginate(20)
      ->withQueryString();

    return inertia('Contacts/Index', compact('contacts', 'filters'));
  }

  /**
   * Show the form for creating a new resource.
   */
  public function create()
  {
    return inertia('Contacts/Create');
  }

  /**
   * Store a newly created resource in storage.
   */
  public function store(ContactRequest $request)
  {
    $validated = $request->validated();

    $editedData = collect($validated['contacts'])->map(function ($contact) {
      $contact["user_id"] = request()->user()->id;
      $contact["created_at"] = now();
      $contact["updated_at"] = now();
      return $contact;
    });

    DB::transaction(function () use ($editedData) {

      Contact::insert($editedData->toArray());

    });

    return Inertia::location(route('contacts.index'));
  }

  /**
   * Display the specified resource.
   */
  public function show(Contact $contact)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   */
  public function edit(Contact $contact)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   */
  public function update(ContactRequest $request, Contact $contact)
  {
    $validated = $request->validated();

    $contact->update($validated);

    return response()->json(['status' => 'success']);
  }

  /**
   * Remove the specified resource from storage.
   */
  public function destroy(Contact $contact)
  {
    $contact->delete();

    return response()->json(['status' => 'success']);
  }


  public function seed()
  {

    foreach (range(1, 100) as $index) {
      $rand = rand(10000, 99999);

      $contacts = [];

      $contacts[] = [
        'user_id' => request()->user()->id,
        'first_name' => 'test ' . $rand,
        'last_name' => 'test ' . $rand,
        'phone' => '+2011274' . $rand,
        'email' => 'test' . $rand . '@test.com',
        'address' => 'test' . $rand,
        'notes' => 'test' . $rand,
        'created_at' => now(),
        'updated_at' => now(),
      ];

      DB::transaction(function () use ($contacts) {

        Contact::insert($contacts);

      });
    }
    return Inertia::location(route('contacts.index'));
  }

  public function deleteAll()
  {
    request()->user()->contacts()->delete();
    return Inertia::location(route('contacts.index'));
  }
}
