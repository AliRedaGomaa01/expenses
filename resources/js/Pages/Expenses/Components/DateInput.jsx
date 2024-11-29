import InputError from './Components/InputError';
import InputLabel from './Components/InputLabel';
import TextInput from './Components/TextInput';

export default function DateInput({ data: data, setData: setData, errors: errors, disabled = false , ...props}) {

    return (
        <div>
            <InputLabel htmlFor="date" value="التاريخ" />

            <TextInput
                id="date"
                type="date"
                name="date"
                value={data.date}
                className="mt-1 block w-full"
                isFocused={true}
                onChange={(e) => setData('date', e.target.value)}
                required
                disabled={disabled}
            />

            <InputError message={errors.date} className="mt-2" />
        </div>
    );
}
