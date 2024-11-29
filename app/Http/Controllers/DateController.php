<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Date;
use App\Enums\CategoryEnum;
use Illuminate\Http\Request;
use App\Services\DateAndExpenseService;

class DateController extends Controller
{
    public function __construct(
        public DateAndExpenseService $dateAndExpenseService
    ) {
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        ['categories' => $categories, 'filters' => $filters, 'isEmpty' => $isEmpty] = $this->dateAndExpenseService->handleFilters($request);

        $dates = Date::with(['expenses'])
            ->filters($filters)
            ->orderBy('date', 'desc')
            ->paginate(20);

        $expensesSum = auth()->user()->dates()->filters($filters)
            ->with([
                'expenses' => fn($query) => $query->filters($filters)
            ])
            ->get()
            ->flatMap->expenses
            ->sum('price');

        $expenseData = $this->dateAndExpenseService->handleExpenseData( $filters , $expensesSum , $categories);

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
