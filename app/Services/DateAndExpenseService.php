<?php 

namespace App\Services;

use App\Enums\CategoryEnum;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

Class DateAndExpenseService {
    public function handleFilters(Request $request)
    {
        $categories = CategoryEnum::toArray();

        $categoryIds = implode(',', (collect($categories)->pluck('id')->toArray()));

        $filters = $request->validate([
            'start_date' => ['nullable', 'string'],
            'end_date' => ['nullable', 'string'],
            'category_id' => ['nullable', 'numeric', 'in:' . $categoryIds . ',0'],
            'name' => ['nullable', 'string'],
        ]);

        $filters['category_id'] = isset($filters['category_id']) && $filters['category_id'] != '0' ? $filters['category_id'] : null  ;

        $filters['user_id'] = auth()->id();

        $isEmpty = empty($filters['name']) && empty($filters['category_id']) && empty($filters['start_date']) && empty($filters['end_date']);

        return [ 'isEmpty' => $isEmpty, 'filters' => $filters , 'categories' => $categories ]; 
    }

    public function handleExpenseData( $filters , $expensesSum , $categories) 
    {
        $expensesDates = auth()->user()->dates()->filters($filters)->select('date')->get();

        $expenseData = [
            'sum' => $expensesSum,
            'startDate' =>  $expensesDates->min('date'),
            'endDate' =>  $expensesDates->max('date'),
            'category' => collect($categories)->where('id', $filters['category_id'])->first()['name'] ?? 'جميع التصنيفات',
        ];

        // Assume these are your two dates
        $startDate = Carbon::parse($expenseData['startDate']);
        $endDate = Carbon::parse($expenseData['endDate']);

        // Calculate the number of days between the two dates
        $daysBetween = $startDate->diffInDays($endDate) + 1;

        $expenseData['daysBetween'] = $daysBetween;
        $averagePerDay = $expenseData['sum'] / $daysBetween;
        $expenseData['averagePerDay'] = number_format($averagePerDay, 2);

        return $expenseData;
    }
}