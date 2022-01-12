
const handleSubmit = (e) => {
  e.preventDefault();
  const password = document.getElementById('password');
  const verify_password = document.getElementById('verify_password');
  if (password?.value !== verify_password?.value) {
    password.classList.add('input-error');
    verify_password.classList.add('input-error');
    const error = document.querySelector('#verify_password~div');
    error.classList.remove('is-hidden');
  }
};

const handleKeypress = () => {
  const password = document.getElementById('password');
  const verify_password = document.getElementById('verify_password');
  password.classList.remove('input-error');
  verify_password.classList.remove('input-error');
  const error = document.querySelector('#verify_password~div');
  error.classList.add('is-hidden');
}
