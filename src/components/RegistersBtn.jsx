import Button from './Button.jsx'

function RegistersBtn() {
  return (
    <div className="flex justify-center items-center gap-2.5">
      <Button wherePage="/signUp">Sign up</Button>
      <div className="hidden md:block">
        <Button wherePage="/login" icon="/arrow.svg">Login</Button>
      </div>

    </div>
  );
}

export default RegistersBtn;
