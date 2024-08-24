"use client";

import {ChangeEvent, FormEvent, Suspense, useEffect, useRef, useState} from "react";
import axios from "axios";
import {nanoid} from "nanoid";
import Link from "next/link";

export type FileMeta = {
    fileId: string;
    receiveSize?: number;
    size?: number;
    order?: number;
    type?: string;
    dir?: string;
    extension?: string;
    lastModified?: number;
    name?: string;
    uploadDate?: number,
    protocol?: string,
};

export default function Page() {
    const fileRef = useRef<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [fileList, setFileList] = useState<Array<FileMeta> | null>(null)
    const [uploading, setUploading] = useState<boolean>(false)

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            fileRef.current = event.target.files[0] as File;
        }
    };

    const postRequest = async (formData: FormData) => {
        return axios.post(`/spring_back/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }

    function getFileExtension(fileName: string): string | null {
        const match = fileName.match(/\.[0-9a-z]+$/i);
        return match ? '.' + match[0].slice(1) : null;
    }

    const upload = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const current = fileRef.current;
        if (!current) {
            console.log('Please select a file first!');
            return;
        }
        let allReq = [];
        const CHUNK_SIZE = 1024 * 1024; // 1MB per chunk
        let pool = 5;
        const fileId = nanoid();
        const totalChunks = Math.ceil(current.size / CHUNK_SIZE);
        for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {

            const start = chunkIndex * CHUNK_SIZE;
            const end = Math.min(start + CHUNK_SIZE, current.size);
            const chunk = current.slice(start, end);

            const formData = new FormData();
            const metadata = {
                fileId: fileId,
                order: chunkIndex,
                extension: getFileExtension(current.name),
                receiveSize: chunk.size,
                lastModified: current.lastModified,
                name: current.name,
                size: current.size,
                type: current.type,
                // dir: "",
                uploadDate: new Date().getTime(),
                protocol: 'hls'
            };
            formData.append('content', chunk);
            formData.append('metadata', JSON.stringify(metadata));
            allReq.push(await postRequest(formData));
        }
        console.log("successfully uploaded");

        Promise.all(allReq).then(res => {
            let config = {
                method: "put",
                url: `http://localhost:8183/files?fileId=${fileId}`,
                maxLength: Infinity,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            axios.request(config).then(res => {
                console.log("merge successfully");
                if (fileList != null) {
                    setFileList([...fileList, res.data as FileMeta]);
                }
            })
        });
    }

    const getAll = async () => {
        let config = {
            method: "get",
            url: '/spring_back/files/show',
            maxLength: Infinity,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        await axios.request(config).then(response => {
            if (Array.isArray(response.data)) {
                setFileList(response.data as Array<FileMeta>);
            } else {
                // 处理错误或默认值
                setFileList(null);
            }
        })
    }

    useEffect(() => {
        getAll().then(res => {
        });
    }, [])

    return (
        <div
            className={"w-full h-full flex flex-col max-md:items-center max-md:border-2 overflow-auto items-center border-2 border-yellow-400"}>
            <div className={"border-b sticky top-0 bg-white w-full mt-4 px-4"}>
                <form onSubmit={upload} className={"flex flex-col w-80"}>
                    <label htmlFor="file-input" className="block text-sm text-gray-500 dark:text-gray-300">Image</label>

                    <input type="file" ref={inputRef} onChange={changeHandler} id={"file-input"}
                           className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border
                           border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1
                           file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300
                           placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none
                           focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"/>

                    <button type={"submit"}
                            className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-3 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                             stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"/>
                        </svg>
                        <span>Upload</span>
                    </button>
                </form>
            </div>

            <div className="container p-6">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr className={"hidden xl:table-row"}>
                        <th scope="col"
                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-x-3">
                                <input type="checkbox"
                                       className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
                                <span>File name</span>
                            </div>
                        </th>

                        <th scope="col"
                            className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            File size
                        </th>

                        <th scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Date uploaded
                        </th>

                        <th scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Last updated
                        </th>

                        <th scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            Uploaded by
                        </th>

                        <th scope="col" className="relative py-3.5 px-4">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {
                        fileList?.map(file => {
                            return (
                                <tr key={file.fileId} className={"grid lg:table-row"}>
                                    <td className=" px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                        <div className="inline-flex items-center gap-x-3">
                                            <input type="checkbox"
                                                   className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>

                                            <div className="flex items-center gap-x-2">
                                                <div
                                                    className="flex items-center justify-center w-8 h-8 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                                                    </svg>
                                                </div>

                                                <div>
                                                    <h2 className="font-normal text-gray-800 dark:text-white ">{file.name}</h2>
                                                    <p className="text-xs font-normal text-gray-500 dark:text-gray-400">{Math.ceil(Number(file.size) / 1024)} KB</p>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                                        {file.size}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                        {new Date(Number(file.uploadDate)).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                                        {new Date(Number(file.lastModified)).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Lana
                                        Steiner
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap max-xl:hidden flex justify-center items-center">
                                        <Link href={"/api/files/play/" + file.fileId}
                                              className="p-1 hover:bg-gray-100 hover:scale-110 transition ease-linear rounded-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811Z"/>
                                            </svg>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}