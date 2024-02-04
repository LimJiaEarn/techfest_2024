import Hero from "./Hero.jsx";
import Stats from "./Stats.jsx";
import MoreDesc from "./MoreDesc.jsx";


const Home = () => {
    return (
      
      <section className="flex flex-col items-center justify-center">

        <Hero/>
        
        <MoreDesc/>

        <Stats/>

      </section>

    )
}

export default Home
  