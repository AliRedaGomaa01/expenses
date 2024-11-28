<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Date;
use App\Enums\CategoryEnum;
use Illuminate\Http\Request;

class DateController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $categories = CategoryEnum::toArray();

        $categoryIds = implode(',', (collect($categories)->pluck('id')->toArray()));

        $filters = $request->validate([
            'start_date' => ['nullable', 'string'],
            'end_date' => ['nullable', 'string'],
            'category_id' => ['nullable', 'numeric', 'in:' . $categoryIds],
        ]);


        if (!empty($filters['name'])) {
            dd($filters);
        }

        $dates = auth()->user()->dates()->filters($filters)
            ->orderBy('date', 'desc')
            ->paginate(20);

        $expensesSum = auth()->user()->dates()->filters($filters)
            ->with([
                'expenses' => fn($query) => $query->filters($filters)
            ])
            ->get()
            ->flatMap->expenses
            ->sum('price');

        $expenseData = [
            'sum' => $expensesSum,
            'startDate' => auth()->user()->dates()->filters($filters)->min('date'),
            'endDate' => auth()->user()->dates()->filters($filters)->max('date')
        ];

        // Assume these are your two dates
        $startDate = Carbon::parse($expenseData['startDate']);
        $endDate = Carbon::parse($expenseData['endDate']);

        // Calculate the number of days between the two dates
        $daysBetween = $startDate->diffInDays($endDate);

        $expenseData['daysBetween'] = $daysBetween;
        $averagePerDay = $daysBetween > 0 ? $expenseData['sum'] / $daysBetween : $expenseData['sum'] ;
        $expenseData['averagePerDay'] = number_format($averagePerDay , 2);

        return inertia('Expenses/Index', compact('dates', 'categories', 'expenseData', 'filters'));
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

        return inertia('Expenses/Show', compact('date', 'categories'));
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
