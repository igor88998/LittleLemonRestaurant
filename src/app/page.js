import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="my-16 max-w-4xl mx-auto" id="about">
        <div className="text-5xl text-primary mb-4 italic ">About us</div>
        <div className="text-dark-gray text-xl text-justify flex flex-col gap-4">
          <p>Nestled in the heart of a quaint neighborhood, Little Lemon Restaurant exudes warmth and charm from the moment you step through its door. With its cheerful yellow facade adorned with whimsical lemon-themed decor, this cozy eatery invites guests to embark on a delightful culinary journey.</p>
          <p>Little Lemon takes pride in its commitment to using fresh, locally sourced ingredients to craft mouthwatering dishes bursting with flavor. The menu features a delightful array of Mediterranean-inspired cuisine, with a focus on bright, citrus flavors that complement the restaurant&apos;s cheerful atmosphere. From zesty lemon-infused seafood dishes to tangy lemon chicken and refreshing lemonades, every dish is expertly prepared to tantalize your taste buds.</p>
          <p>The attentive and friendly staff at Little Lemon are passionate about providing exceptional service, ensuring that every guest feels welcomed and cared for. Whether you&apos;re stopping by for a leisurely brunch with friends, a romantic dinner for two, or simply craving a refreshing lemonade on a sunny afternoon, Little Lemon Restaurant promises a memorable dining experience that will leave you craving more.</p>
          <p>So come, escape the hustle and bustle of the outside world and indulge in the simple pleasures of good food, good company, and a touch of lemony goodness at Little Lemon Restaurant</p>
        </div>
      </section>
      
      <section className="max-w-4xl mx-auto" id="contact">
        <div className="flex justify-between items-center">
          <div className="text-5xl text-primary italic ">Contact us</div>
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}
