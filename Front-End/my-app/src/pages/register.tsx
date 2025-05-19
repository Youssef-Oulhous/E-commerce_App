import axios , { AxiosError }  from "axios"
import { Link } from "react-router-dom"
import { useEffect , useState } from "react"
import { useNavigate } from "react-router-dom"

interface loginAuth{
    name:string,
    email:string,
    password:string,
    token:string,
    message:string,
}

interface submit{
    handleSubmit:()=>void ;
}

export default function SingUp () {
    const navigate = useNavigate();
    const [email,setEmail] = useState<string>('');
    const [password , setPassword] = useState<string>('');
    const [name , setName] = useState<string>('');
    const [message,setMessage] = useState<string>('');
    const [color,setColor] = useState<string>('');


    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{

        e.preventDefault();
 
   

        axios.post<loginAuth>('http://localhost:5500/api/user/register',{
            name,
            email,
            password
        }).then((res)=>{

            localStorage.setItem('token', res.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;

            setMessage(res.data.message);
            setColor('green');
                        
            setTimeout(()=>{
            navigate('/Cart');
            },3000)       


        }).catch((errors)=>{
            const err = errors as AxiosError<{ message: string }>;
            if(err.response && err.response.data && err.response.data.message) {
                setMessage(err.response.data.message)
            }else{
                setMessage('Something went wrong.');
            }
            
            setColor('red');
        })
    }

    return(
        <>
        <div className="p-5 mt-[20px]">
            <div className="flex flex-col justify-center items-center gap-[100px] ">
                <div>
                    <h1 className="text-4xl font-semibold">SingUp Form</h1>
                </div>
                <div> 
                    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-[30px] ">
                        <input type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)}  className="w-[300px] h-[50px] sm:w-[350px] sm:h-[50px] md:w-[400px] md:h-[50px] lg:w-[400px] lg:h-[50px]  xl:w-[400px] xl:h-[50px]  2xl:w-[400px] 2xl:h-[50px]  border-2  rounded-lg p-2 text-lg  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300  "/>
                        <input type="email" placeholder="Email" onChange={(e)=> setEmail(e.target.value)} className="w-[300px] h-[50px] sm:w-[350px] sm:h-[50px] md:w-[400px] md:h-[50px] lg:w-[400px] lg:h-[50px]  xl:w-[400px] xl:h-[50px]  2xl:w-[400px] 2xl:h-[50px]  border-2  rounded-lg p-2 text-lg  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300  " />
                        <input type="password" placeholder="Password"  onChange={(e)=> setPassword(e.target.value)} className="w-[300px] h-[50px] sm:w-[350px] sm:h-[50px] md:w-[400px] md:h-[50px] lg:w-[400px] lg:h-[50px]  xl:w-[400px] xl:h-[50px]  2xl:w-[400px] 2xl:h-[50px] border-2 rounded-lg p-2  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 "/>
                        <button type="submit" className="w-[300px] h-[50px] sm:w-[350px] sm:h-[50px] md:w-[400px] lg:w-[400px] xl:w-[400px] 2xl:w-[400px] rounded-lg bg-black text-white hover:bg-zinc-900">Submit</button>
                    </form>
                    <div className="mt-3">
                        <p style={{color:color}} className="text-center">{message}</p>
                    </div>
                </div>
                <div>
                    <Link to={'/register'}>
                        <p className="hover:underline">you still don't have account ? <a href="#" className="text-blue-600">singUp</a></p>
                    </Link>
                    
                </div>
                
            </div>
        </div>
        </>
    )
}