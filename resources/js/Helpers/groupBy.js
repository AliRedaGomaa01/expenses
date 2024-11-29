export default function groupBy( itemKey , [...objArray] ){
	var newObjArray;
	objArray.reduce((acc, item) => {
		const key = item[itemKey];
	
		// Initialize the group if it doesn't exist
		if (!acc[key]) {
			acc[key] = [];
		}
	
		// Add the current item to the group
		acc[key].push(item);

		newObjArray = acc;
	
		return acc;
	}, {});
	return newObjArray;
}