import { useForgotPassword} from "../Hooks/useForgotPassword";

const useResendEmail = () => {
  const { forgotPassword } = useForgotPassword();

  const handleResendEmail = async (email) => {
    return forgotPassword(email);
  };
  return { handleResendEmail };
};

export default useResendEmail;