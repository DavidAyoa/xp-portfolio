import React from 'react';
import { useNavigate } from 'react-router';
import CompanyLogo from '../Company/CompanyLogo';
import CompanyName from '../Company/CompanyName';
import useConnection from '../../hooks/useConnection';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useConnection();

  const handleLogin = () => {
    login();
    navigate('/office');
  };

  return (
    <div className="flex items-center">
      <div onClick={handleLogin} className="absolute h-28 md:w-7/12 w-screen">
        <a title='Login' href="/office" className="h-full w-full rounded-xl bg-color-login-blue flex items-center py-2.5 px-6 stroke-white-1 cursor-pointer">
          <div className="w-full flex items-center text-white gap-4 relative outline-none">
            {/* <div>
              <CompanyLogo src="/img/profile-picture.webp" className="w-16 h-16" />
            </div> */}
            <div>
              <h2><CompanyName className="text-white" /></h2>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default LoginForm;
