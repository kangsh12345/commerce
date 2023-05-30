import { GoogleLogin } from '~/components/Button/GoogleLogin';

export default function Login() {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-5rem-24px)]">
      <GoogleLogin />
    </div>
  );
}
