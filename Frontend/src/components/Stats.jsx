
import Button from "./Button.jsx";

const Stats = () => {
    return (

    <section className="flex justify-center items-center sm:my-16 my-6 mx-[6px] flex-col bg-black-gradient-2 rounded-[20px] box-shadow w-4/5 py-[5px] px-[20px]">

        <p className="mt-3 font-semibold text-[30px] text-white uppercase">On Average, job seekers face</p>

        <div className={`flex align-center justify-center flex-row flex-wrap`}>

            <div className={`flex-1 flex justify-start items-center flex-col m-3`}>
                
                <h4 className="text-center font-semibold xs-text-[40px] text-[30px] xs:leading-[52px] leading-[43px] text-red-200">60%</h4>
                <p className="text-center font-semibold xs-text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-red-700 uppercase ml-3">Rejection Rate</p>
                
            </div>

            <div className={`flex-1 flex justify-start items-center flex-col m-3`}>
                
                <h4 className="text-center font-semibold xs-text-[40px] text-[30px] xs:leading-[52px] leading-[43px] text-red-200">118</h4>
                <p className="text-center font-semibold xs-text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-red-700  uppercase ml-3">Applicants for 1 job</p>
            
            </div>

            <div className={`flex-1 flex justify-start items-center flex-col m-3`}>
                
                <h4 className="text-center font-semibold xs-text-[40px] text-[30px] xs:leading-[52px] leading-[43px] text-red-200">40%</h4>
                <p className="text-center font-semibold xs-text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-red-700  uppercase ml-3">of applicants don't pass 1st stage</p>
            
            </div>

            <div className={`flex-1 flex justify-start items-center flex-col m-3`}>
                
                <h4 className="text-center font-semibold xs-text-[40px] text-[30px] xs:leading-[52px] leading-[43px] text-red-200">3%</h4>
                <p className="text-center font-semibold xs-text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-red-700  uppercase ml-3">of applicants are invited to interview</p>
            
            </div>
        </div>

        <div className='flex justify-center items-center my-2 flex-col rounded-[20px] box-shadow'>

            <div className="flex-1 flex flex-col items-center justify-center">
                <h2 className="flex-1 font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">Don't suffer like everyone else</h2>
                <p className={`flex-1 font-normal text-textwhite text-[18px] leading-[30.8px] max-w--[470px] mt-5`}> <span className="text-yellow1">Job Hunt</span> the right (and probably the best) way now !</p>
            </div>

            <div className={`flex justify-center items-center sm:ml-10 ml-0 sm:mt-0 mt-10`}>
                <Button styles="mt-10 text-black bg-blue-gradient" text="Get Started!"/>
            </div>

        </div>
    
    </section>
    )   
}

export default Stats
  