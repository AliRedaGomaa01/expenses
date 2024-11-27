export default function validatePassword(password) {
    // Regular expression to check for the required conditions
    const passwordRegex = /^(?=[a-zA-Z0-9@$!%*?&]{6,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

    if (passwordRegex.test(password)) {
        return false;
    } else {
        return "يجب أن تكون كلمة المرور باللغة الانجليزية  *** وتكون 6 أحرف على الأقل ***  وتحتوي على حرف كبير واحد على الأقل *** وحرف صغير واحد على الأقل *** ورقم واحد على الأقل *** ورمز خاص واحد على الأقل.";
    }
}