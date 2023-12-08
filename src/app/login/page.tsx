"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
    <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 className="mb-8 text-3xl text-center">{loading ? "Processing..." : "Login"}</h1>
        <input
          id="email"
          type="text"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={user.email}
          onChange={(e) => setUser({...user, email: e.target.value})}
          placeholder="Email"
          />

        <input
        id="password"
          type="password"
          className="block border border-grey-light w-full p-3 rounded mb-4"
          value={user.password}
          onChange={(e) => setUser({...user, password: e.target.value})}
          placeholder="Password" 
          />

        <button
          type="submit"
          onClick={onLogin}
          className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1"
        >Login</button>
      </div>

      <div className="text-grey-dark mt-6">
      {'Don\'t have an account yet? '}
        <Link href="/signup" className="underline">Create Account</Link>
      </div>
    </div>
  </div>
    )

}