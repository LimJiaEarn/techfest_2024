import Button from './Button';


const features = [
    {
      id: "feature-1",
      title: "Fully Automated",
      content:
        "Sit back and wait for your job pairings",
    },
    {
      id: "feature-2",
      title: "Comprehensive Search",
      content:
        "Access a vast database of job listings from various sources.",
    },
    {
      id: "feature-3",
      title: "Tailored Filters",
      content:
        "We tailor your search with your interests and preference to find the perfect job.",
    },
];

const FeatureCard = ({title, content, index}) => (

    <div className={`flex flex-row p-6 rounded-[20px] ${index!==features.length-1 ? "mb-6" : "mb-0"} feature-card`}>
        
        {/* <div className={`w-[64px] h-[64px] rounded-full `}>
            <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain"/>
        </div> */}

        <div className="flex-1 flex flex-col ml-3">

            <h4 className="font-poppins font-semibold text-white text-[1.2rem] leading-[23px] mb-1">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[1.1rem] leading-[23px] mb-1 max-w-[450px]">
                {content}
            </p>
        </div>


    </div>

)

const MoreDesc = () => (

    <section className="flex md:flex-row flex-col-reverse align-center justify-center gap-[150px]">

        <div className="flex-1 flex flex-col">

            {features.map((feature, index) => (
                
                <FeatureCard key={features.id} {...feature} index={index}/>
            
            ))}

        </div>

        <div className="flex-1 flex justify-center items-start flex-col">

            <h2 className="font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full"> You upload your resume, <br className="sm:block hidden"/>we'll handle the job search</h2>

            <p className="max-w-[470px] mt-5 text-textwhite text-18px leading-[30.8px]">
                With our state of the art job filter AI, save your precious time to improve your resume then to read hundreds of line of job descriptions.
            </p>
            <Button styles="mt-10 text-black bg-blue-gradient" text="Get Started!"/>

        </div>

    </section>
)

export default MoreDesc;