import React from 'react'

const UserStack = () => {
    return(
        <div className='w-2/3 h-[560px] m-auto relative float-right'>
            <div className='w-1/2 h-[110px] float-left relative'>
                <div className='absolute left-8 top-[40%]'>
                    <p className='text-2xl font-bold'>스택 한 눈에 보기</p>
                </div>
            </div>
            <div className='w-1/2 h-[110px] float-right relative'>
                <div className='absolute inset-y-0 right-5 top-[30%]'>
                    <button type="button" className="
                        w-[100px] h-[45px] py-2.5 px-5 me-2 mb-2 text-xl font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 
                        dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >수정</button>
                </div>
            </div>
            <div className='w-full top-[110px] relative'>
                <div className='w-[770px] h-[420px] rounded-2xl border-2 border-solid border-[#dfdfdf]'>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                        <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Position</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                        </div>
                    </div>
                    <div className='relative h-1/3 border-b-2 border-[#dfdfdf]'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Language</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                        </div>
                    </div>
                    <div className='relative h-1/3'>
                    <div className='absolute top-[15px] left-7'>
                            <p className='text-xl font-bold'>Framework</p>
                        </div>
                        <div className='absolute top-[50px] left-4 flex '>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                            <div className='text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-base px-5 me-2 mb-2 max-h-8 dark:bg-gray-800 dark:text-white dark:border-gray-600'>asdf</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserStack;