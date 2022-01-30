const handleSubmit = (e: Event): void => {
  e.preventDefault();
  const password = document.getElementById('password') as HTMLInputElement;
  const verify_password = document.getElementById(
    'verify_password'
  ) as HTMLInputElement;
  if (password && verify_password && password.value !== verify_password.value) {
    password.classList.add('input-error');
    verify_password.classList.add('input-error');
    const error = document.querySelector('#verify_password~div');
    error?.classList.remove('is-hidden');
  }
};

const handleKeypress = (): void => {
  const password = document.getElementById('password');
  const verify_password = document.getElementById('verify_password');
  password?.classList.remove('input-error');
  verify_password?.classList.remove('input-error');
  const error = document.querySelector('#verify_password~div');
  error?.classList.add('is-hidden');
};
