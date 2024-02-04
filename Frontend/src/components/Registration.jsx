import {useRef, useState, useEffect} from "react";
import { useUser } from '../App';
import {NavLink, useNavigate} from 'react-router-dom';
import tick from '../assets/tick.svg';
import cross from '../assets/cross.svg';


const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = '/register';

const Registration = () => {

    const { currentPage, setCurrentPage } = useUser();
    const { userID, setUserID } = useUser();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    

    const handleSubmit = async (e) => {

        e.preventDefault();
        navigate('/home');
        setUserID(user)
        setSuccess(true);
        setUser('');
        setPwd('');
        setMatchPwd('');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     // if button enabled with JS hack
    //     const v1 = USER_REGEX.test(user);
    //     const v2 = PWD_REGEX.test(pwd);

    //     if (!v1 || !v2) {
    //         setErrMsg("Invalid Entry");
    //         return;
    //     }

    //     try {
    //         const response = await axios.post(REGISTER_URL,
    //             JSON.stringify({ user, pwd }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
    //         );
    //         console.log(response?.data);
    //         console.log(response?.accessToken);
    //         console.log(JSON.stringify(response))
    //         setSuccess(true);

    //         //clear state and controlled inputs
    //         //need value attrib on inputs for this
            
    //         setUser('');
    //         setPwd('');
    //         setMatchPwd('');
    //     } catch (err) {
    //         if (!err?.response) {
    //             setErrMsg('No Server Response');
    //         } else if (err.response?.status === 409) {
    //             setErrMsg('Username Taken');
    //         } else {
    //             setErrMsg('Registration Failed')
    //         }
    //         errRef.current.focus();
    //     }
    // }

    return (
        <div className="w-full rounded-xl p-5">
            {success ? (

                <section>
                    <h1>Registration Successful !</h1>
                    <div onClick={() => {
                        
                        console.log(currentPage);
                        }}>
                        <NavLink to="/home" onClick={()=>setCurrentPage("Home")} >Let's Begin !</NavLink>
                    </div>
                </section>

            ) : (

                <section className="flex justify-center items-center">

                    <div className="flex-1 flex justify-center items-center">
                        <p className="text-[32px] sm:text-[60px] text-coral3">Something<span className="text-coral4"><br/> Big </span> Is Coming . . . </p>
                    </div>


                    <div className="flex-1 flex flex-col gap-10 items-center border-2 border-black max-w-[600px] bg-blue-300 rounded-[5%]">

                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        
                        <h1 className="formh1">Register</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">

                            <label htmlFor="username" className="formh2">
                                Username:
                                <p className={validName ? "" : "hidden"} />
                                <p className={validName || !user ? "hidden" : ""} />
                            </label>
                            <input
                                type="text"
                                id="username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setUserFocus(true)}
                                onBlur={() => setUserFocus(false)}
                                className="text-black pl-1"
                            />
                            <p id="uidnote" className={`${userFocus && user && !validName ? "" : "hidden"} max-w-[300px]`}>
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>


                            <label htmlFor="password" className="formh2">
                                Password:
                                {/* <img src={tick} className={`${validPwd ? "" : "hidden"} h-[20px] w-[20px]`} />
                                <img src={tick} className={`${validPwd || !pwd ? "hidden" : ""} h-[20px] w-[20px]`} /> */}
                            </label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                                className="text-black pl-1"
                            />
                            <p id="pwdnote" className={`${pwdFocus && !validPwd ? "" : "hidden"} max-w-[300px]`}>
                                {/* <img src={tick} className={`h-[20px] w-[20px]`} /> */}
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label htmlFor="confirm_pwd" className="formh2">
                                Confirm Password:
                                {/* <img src={tick} className={`${validMatch && matchPwd ? "" : "hidden"} h-[20px] w-[20px]`} />
                                <img src={tick} className={`${validMatch || !matchPwd ? "hidden" : ""} h-[20px] w-[20px]`} /> */}
                            </label>
                            <input
                                type="password"
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                className="text-black pl-1"
                            />
                            <p id="confirmnote" className={`${matchFocus && !validMatch ? "" : "hidden"} max-w-[300px]`}>
                                {/* <img src={cross} className={`h-[20px] w-[20px]`} /> */}
                                Must match the first password input field.
                            </p>

                            <button onClick={handleSubmit} className="mt-8 bg-green-100 text-green-600 rounded-xl px-4 py-[2px]">Sign Up</button>
                        </form>


                        <p>
                            Already registered?<br />
                            <span className="">
                                <NavLink to="/signin" onClick={()=>setCurrentPage("Sign In")} >Sign In</NavLink>
                            </span>
                        </p>

                    </div>
                </section>

            )}
        </div>
    )
}
  
export default Registration;


  