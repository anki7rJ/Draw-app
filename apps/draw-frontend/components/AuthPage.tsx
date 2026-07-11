
"use client"

import { HTTP_BACKEND } from "@/config"
import api from "@/lib/api"
import { AxiosError } from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function AuthPage({isSignin}:{isSignin:boolean}){
    const router = useRouter()
    const [name , setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword , setConfirmPassword] = useState("")
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(false)

    async function handleSubmit(e:React.FormEvent){
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            const endpoint = isSignin?`${HTTP_BACKEND}/auth/signin`:`${HTTP_BACKEND}/auth/signup`
            const body = isSignin?{email,password}:{email,password,name,confirmPassword}
        
            const res = await api.post(endpoint,body)
            if(res.data.token){
                localStorage.setItem("token",res.data.token)
            }
            router.push(isSignin ? "/room" : "/signin")

            
        } catch (error: unknown) {
            const responseData = error instanceof AxiosError
                ? error.response?.data as { message?: string } | undefined
                : undefined
            setError(responseData?.message || "Something went wrong")

            
        } finally {
            setLoading(false)
        }




        

    }
    const pageTitle = isSignin ? "Welcome back" : "Create your account"
    const pageSubtitle = isSignin
        ? "Continue your creative journey on the canvas."
        : "Start bringing your ideas to life on the canvas."

    return <main className="flex min-h-screen flex-col bg-[#f7f8fb] text-slate-950">
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex h-14 max-w-5xl items-center px-5">
                <span className="text-sm font-bold text-[#073b8e]">Draw-App</span>
            </div>
        </header>

        <section className="flex flex-1 items-center justify-center px-5 py-12">
            <div className="w-full max-w-[400px]">
                <div className="mb-7 text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-950">{pageTitle}</h1>
                    <p className="mt-2 text-sm text-slate-500">{pageSubtitle}</p>
                </div>

                <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {!isSignin && (
                    <>
                    <label htmlFor="name" className="flex flex-col gap-2 text-xs font-semibold text-slate-700">
                    Name
                    <input 
                    id="name"
                    type="text" 
                    className="h-11 rounded-sm border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#073b8e] focus:ring-2 focus:ring-[#073b8e]/10"
                    placeholder="Your name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                     />
                    </label>
                    </>
                )}
                
                <label htmlFor="email" className="flex flex-col gap-2 text-xs font-semibold text-slate-700">
                Email address
                <input type="email"
                id="email"
                autoComplete="email"
                className="h-11 rounded-sm border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#073b8e] focus:ring-2 focus:ring-[#073b8e]/10"
                 placeholder="name@company.com"
                 value={email}
                 onChange={(e)=>setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password" className="flex flex-col gap-2 text-xs font-semibold text-slate-700">
                Password
                <input type="password"
                id="password"
                autoComplete={isSignin ? "current-password" : "new-password"}
                 placeholder="••••••••"
                 className="h-11 rounded-sm border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#073b8e] focus:ring-2 focus:ring-[#073b8e]/10"
                 value={password}
                 onChange={(e)=>setPassword(e.target.value)}
                  />
                </label>
                {
                    !isSignin && (
                        <>
                        <label htmlFor="confirmPassword" className="flex flex-col gap-2 text-xs font-semibold text-slate-700">
                        Confirm password
                        <input 
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        placeholder="••••••••"
                        className="h-11 rounded-sm border border-slate-300 px-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#073b8e] focus:ring-2 focus:ring-[#073b8e]/10"
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    
                        />
                        </label>
                        </>
                    )
                }
                <button className="h-11 rounded-sm bg-[#073b8e] px-4 text-sm font-bold text-white transition hover:cursor-pointer hover:bg-[#052f72] disabled:cursor-not-allowed disabled:opacity-70" disabled={loading} type="submit">{loading?"Loading...":isSignin?"Sign in":"Create account"}</button>
                {loading&&(
                    <p className="text-center text-xs text-slate-500">Authenticating...</p>
                )}
            </form>
            {!isSignin && (
                <p className="mt-5 text-center text-sm text-slate-500">
                    Already have an account?{" "}
                    <Link href="/signin" className="font-semibold text-[#073b8e] hover:underline">
                        Sign in
                    </Link>
                </p>
            )}
            {error &&(
                <p className="mt-4 text-center text-sm text-red-600">{error}</p>
            )}
                </div>
            </div>
        </section>
    </main>
  


}
