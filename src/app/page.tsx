import Header from "@/components/landing/Header"
import HeroSection from "@/components/landing/HeroSection"
import BenefitsSection from "@/components/landing/BenefitsSection"
import HowItWorksSection from "@/components/landing/HowItWorksSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import FAQSection from "@/components/landing/FAQSection"
import Footer from "@/components/landing/Footer"

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  )
}
