import React from 'react';
import './LoginForm.css';

const LoginForm = () => {
    return (
        <div className='login'>
            <div className='wrapper'>
                <form action="">
                    <h1>Login </h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />

                    </div>
                    <div className="input-box">
                        <input type="password" placeholder='Password' required />

                    </div>

                    <div className="remember-forgot">
                        <label><input type="Checkbox" />Manter Salvo</label>
                        <a href="#"> Esqueci minha senha</a>
                    </div>
                    <button type="submit">Entrar</button>


                </form>
            </div>
        </div>
    );
};

export default LoginForm;