<?php

namespace App\Http\Controllers;

use App\Models\Date;
use App\Enums\CategoryEnum;
use Illuminate\Http\Request;

class DateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dates = auth()->user()->dates()
                ->orderBy('date','desc')
                ->get();

        return inertia('Expenses/Index', compact('dates'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Date $date)
    {
        $categories = CategoryEnum::toArray();

        $date->load('expenses');
        
        $date->update(['expenses_sum' => $date->expenses->sum('price')]);

        return inertia('Expenses/Show', compact('date' , 'categories'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Date $date)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Date $date)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Date $date)
    {
        //
    }
}
