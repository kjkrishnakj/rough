import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import mongoose from "mongoose";
import Error from 'next/error'
import Book from "../../models/Book";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';
import "aos/dist/aos.css";
import AOS from "aos";

import Link from 'next/link';

const Post = ({ error, book, }) => {
    useEffect(() => {
        AOS.init();
    }, []);
    const router = useRouter();
    const { slug } = router.query

    const buyNow = async (slug, availableQty, title) => {
        if (availableQty <= 0) return;
      
        try {
          const res = await fetch("/api/updateQty", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug }),
          });
      
          const data = await res.json();
          if (data.success) {
            console.log("Updated Quantity:", data.availableQty);
          }
        } catch (error) {
          console.error("Error updating quantity:", error);
        }
      };
      
    return <>

        <Head><title> Amikart | {book.title}</title></Head>
        <section className="text-gray-600 body-font overflow-hidden">
    {/* <div class="w-full ">
      <img src="/img/iqoo logo.jpg" alt="Full Width Image" class="w-full object-co" style={{ height: "10cm" }} />
    </div> */}
    
            <ToastContainer />
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <img data-aos="fade-right" src={book.img} alt="" style={{ height: "28rem", width: "23rem", margin: "3rem 0rem" }}></img>
                    <div data-aos="fade-left" className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest"> </h2>
                        <h1 className="text-gray-500 text-xl title-font font-medium mb-1"> {book.category}</h1>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1"> {book.title}</h1>
                        
                        <p className="leading-relaxed">{book.descr}</p>
                 
                        <div className="flex">
                            {book.availableQty <= 0 ? <span className="title-font font-medium text-2xl text-gray-900">Out Of Stock!</span> :
                                <span className="title-font font-medium text-2xl text-gray-900">{book.author}</span>}
                            <button onClick={() => { buyNow(slug, book.availableQty, book.title) }} disabled={book.availableQty <= 0 ? true : false} className=" ml-10 disabled:bg-indigo-500 text-white  bg-green-500 border-0 py-2 px-2 focus:outline-none hover:bg-green-700 rounded">Issue</button>

                        </div>
                       


                    </div>

                </div>
            </div>
        </section >

    

    </>
}

export default Post


export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI)
    }


    let book = await Book.findOne({ slug: context.query.slug })
    let variants = await Book.find({ title: book.title })

    let error = null;
    if (book == null) {
        return {
            props: { error: 404 }
        }
    }
 


    return {
        props: { error: error, book: JSON.parse(JSON.stringify(book))}
    }
}
