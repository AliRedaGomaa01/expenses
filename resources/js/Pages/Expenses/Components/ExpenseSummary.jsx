export default function ExpenseSummary({  expenseData,  ...props }) {

    return (

        <div className="my-4 p-4 bg-gray-100 rounded-md shadow-md text-center">
            <p className="text-lg font-medium text-gray-700">
                مجموع النفقات ل
                <span className="text-red-500 font-semibold">
                    {' '}  {expenseData.category}  {'  '}
                </span>
                من تاريخ
                <span className="text-blue-500 font-semibold"> {expenseData.startDate} </span>
                إلى تاريخ
                <span className="text-blue-500 font-semibold"> {expenseData.endDate} </span>
                هو :
                <span className="text-green-600 font-bold"> {expenseData.sum} </span>
                بمعدل :
                <span className="text-green-600 font-bold"> {expenseData.averagePerDay} </span>
                لليوم خلال :
                <span className="text-blue-500 font-semibold"> {expenseData.daysBetween} </span>
                يوم
            </p>
        </div>

    );
}
