"use client"
import React, { useState } from 'react';
import { currentUser, pb } from '@/lib/pocketbase/pb';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import signUp from '@/lib/pocketbase/signUp';

interface UserData {
    username: string;
    password: string;
    email: string;
}

export default function Auth() {
    const [error, setError] = useState('')
    const router = useRouter()


    const [userData, setUserData] = useState<UserData>({
        username: '',
        password: '',
        email: '',
    });


    return (
        <>
            {currentUser ? (
                <>
                    <h1 className='mx-auto' >
                        Signed in as {pb.authStore.model?.username }{' '}
                    </h1>
                    {router.push('/')}
                </>

            ) : (

                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="text-center lg:text-left">
                            <h1 className="text-5xl font-bold">Welcome to valiantlynx!</h1>
                            <p className="py-6">
                                Enter your credentials to access your account and unlock a world of possibilities.
                            </p>
                            <p className="py-6">
                                Join our community of innovators and creators.
                            </p>
                            <p className="py-6">
                                Remember, your privacy and security are our top priorities. Register with confidence and enjoy your experience!
                            </p>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    signUp({ userData })
                                        .then(() => {
                                            router.push('/')
                                        })
                                        .catch((error) => {
                                            setError(error.message)
                                        })
                                                                        }}
                                className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text" >Username</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        className="input input-bordered"
                                        value={userData.username}
                                        onChange={(e) =>
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                username: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text" >Username</span>
                                    </label>
                                    <input
                                        placeholder="Email"
                                        type="text"
                                        value={userData.email}
                                        className="input input-bordered"
                                        onChange={(e) =>
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                email: e.target.value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="password"
                                        className="input input-bordered"
                                        value={userData.password}
                                        onChange={(e) =>
                                            setUserData((prevState) => ({
                                                ...prevState,
                                                password: e.target.value,
                                            }))
                                        }
                                    />
                                    <label className="label">
                                        <Link href="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">{error}</label>
                                </div>

                                <div className="form-control mt-6">
                                    <button type='submit' className="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
