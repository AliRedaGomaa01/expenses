import Pagination from '@/Components/Pagination';
import ExpenseSummary from './ExpenseSummary';
import groupBy from '@/Helpers/groupBy';
import EditCurrentExpenses from './EditCurrentExpenses';

export default function ExpenseTable({ expenses, expenseData, filters, categories, ...props }) {
  expenses?.data?.forEach((expense) => {
    expense['date'] = expense['date']['date'] ?? expense['date'];
  });

  const groupedExpenses = groupBy('date', [...expenses?.data]);

  const pagination = { ...expenses };
  delete pagination.data;

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 my-4">
      <div className="overflow-hidden my-grad shadow-sm sm:rounded-lg">
        <div className="p-6 text-gray-900 text-center">

          {!expenses?.data.length && <div className='text-center p-2 shadow-gray-400 shadow-md my-4'>'لا يوجد مصاريف'</div>}

          {!!expenses?.data.length && <div className="overflow-scroll scrollbar-hide space-y-5">

            <ExpenseSummary expenseData={expenseData} filters={filters} />

            {Object.keys(groupedExpenses).map((date, index) => (
              <div key={index}>
                <div className='text-center p-2  bg-gradient-to-r from-red-200 to-sky-200  my-4 font-extrabold '>
                  {date}
                </div>

                <EditCurrentExpenses expenses={[...groupedExpenses[date]]} categories={categories} />
              </div>

            ))}

            <Pagination {...pagination} />

          </div>}
        </div>
      </div>
    </div>
  );
}
