import { useState } from 'react';
import { fetch } from './mock';
import './App.css';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const onSubmit: React.MouseEventHandler<HTMLButtonElement> = async (ev) => {
    ev.preventDefault();

    if (email && password) {
      const req = new Request(
        "auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password })
        }
      );

      const resp = await fetch(req);

      if (resp.status == 200) {
        setLoggedIn(true);
        setError(undefined);

        // NOTE: ставлю пустую строку так как надо обновить атрибут value у input
        setEmail("");
        setPassword("");
      } else {
        setError("Please check your email or password");
        setEmail("");
        setPassword("");
      }
    }
  }

  if (isLoggedIn) {
    return (
      <>
        <h1>You're logged in</h1>
        <button onClick={() => setLoggedIn(false)}>Sign out</button>
      </>
    );
  } else {
    return (
      <>
        {error ?
          <div className='error'>
            <div className='tag'>Error!</div>
            <span>{error}</span>
          </div> : <></>
        }

        <form>
          <label htmlFor='email'>Email</label>
          <input
            type="text"
            placeholder='moss@reynholm.co'
            value={email}
            id="email"
            onChange={(ev) => setEmail(ev.currentTarget.value)} />

          <label htmlFor='pass'>Password</label>
          <input
            type="password"
            placeholder='0118 9999'
            value={password}
            id='pass'
            onChange={(ev) => setPassword(ev.currentTarget.value)} />

          <button
            type='submit'
            onClick={onSubmit}
            className={email && password ? 'enabled' : 'disabled'}
          >Login</button>
        </form>
      </>
    );
  }
}

export default App
