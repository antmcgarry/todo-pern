import useAuth from "@/hooks/useAuth";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onNext?: () => void;
}

const LoginForm = ({ onNext }: LoginFormProps) => {
  const { onLogin } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const { email, password } = data;
      await onLogin(email, password);
      onNext && onNext();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-w-80 max-w-7xl w-full h-3/6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 rounded-xl gap-4"
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="p-2 rounded text-black"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="p-2 rounded text-black"
          />
        </div>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-700 p-4 rounded"
        >
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
