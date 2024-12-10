export default function ExpenseSummary({ expenseData, filters, ...props }) {

    return (

        <div className="my-4 p-4 bg-yellow-100 rounded-md shadow-md text-center">
            <p className="text-lg font-medium text-gray-700 bg-red-100">
                مجموع النفقات { ' '}
                <span className="text-red-700 font-semibold">
                    {filters.name && ' لكلمات البحث  (' + filters.name + ')  '}
                </span>
                ل
                <span className="text-red-700 font-semibold">
                    {' '}  {expenseData.category}  {'  '}
                </span>
            </p>
            <p className="text-lg font-medium text-gray-700  bg-blue-100">

                من تاريخ
                <span className="text-blue-700 font-semibold"> {expenseData.startDate} </span>
                إلى تاريخ
                <span className="text-blue-700 font-semibold"> {expenseData.endDate} </span>
                خلال :
                <span className="text-blue-700 font-semibold"> {expenseData.daysBetween} </span>
                يوم
            </p>
            <p className="text-lg font-medium text-gray-700  bg-green-100">
                هو :
                <span className="text-green-700 font-bold"> {parseFloat(expenseData.sum).toFixed(2)} </span>
                بمعدل :
                <span className="text-green-700 font-bold"> {parseFloat(expenseData.averagePerDay).toFixed(2)} </span>
                لليوم

                وبمعدل :
                <span className="text-green-700 font-bold"> {parseFloat(expenseData.averagePerDay * 365 / 12).toFixed(2)} </span>
                للشهر
                وبمعدل :
                <span className="text-green-700 font-bold"> {parseFloat(expenseData.averagePerDay * 365).toFixed(2)} </span>
                للسنة
            </p>
            <p className="text-lg font-medium text-gray-700 "> 
              وسيتضح معدل انفاقك بدقة اكبر بعد مرور 30 يوما من التدوين
              وسيصبح أكثر دقة يزيادة مدة التدوين 
            </p>
        </div>

    );
}
