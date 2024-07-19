import { login, signup } from './actions'

export default function LoginPage() {   
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required style={{color: "black"}}/>
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required style={{color: "black"}}/>
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
  )
}     