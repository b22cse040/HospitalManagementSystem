import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header';
import DocSidebar from './docSidebar';






const DocHome = () => {
    const [component,setComponent]=React.useState()
    const [name, setName] = useState();
    useEffect(() => {
       fetch("http://localhost:3001/userInSession")
        .then(res => res.json())
        .then(res => {
            // console.log(res)
          let string_json = JSON.stringify(res);
          let email_json = JSON.parse(string_json);
          console.log(string_json)
          let email = email_json.email;
          let who = email_json.who;
          let name=email_json.name;
          setName(name);
          if(email === ""){
            setComponent(<LogIn />)
          }
          else{
            if(who==="pat"){
              setComponent(<Home />)
            }
            else{
              setComponent(<DocHome />)
            }
          }
        });
    }, []);

    return (
            <div className='flex flex-col justify-center items-center w-full h-screen'>

                    <Header />
                <div className='flex flex-row justify-start items-center w-full h-screen'>
                <DocSidebar />
                <div className='flex flex-col justify-center items-center w-full'>
                    Welcome Dr. {name}
                </div>
                </div>

            </div>
                  
    );
};

export default DocHome;
