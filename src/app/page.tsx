import { Nav } from "@/components/jd/nav";
import { Hero } from "@/components/jd/hero";
import {
  CredentialTicker,
  Services,
  BackupPower,
  EmergencyBand,
  Coverage,
  Credentials,
  Footer,
} from "@/components/jd/sections";
import { Estimator } from "@/components/jd/estimator";
import { LeadsBoard } from "@/components/jd/leadsboard";
import { IdeaGenerator } from "@/components/jd/ideagenerator";
import { Contact } from "@/components/jd/contact";
import { WhatsAppFloat } from "@/components/jd/whatsapp-float";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main className="flex-1">
        <Hero />
        <CredentialTicker />
        <Services />
        <BackupPower />
        <Estimator />
        <EmergencyBand />
        <LeadsBoard />
        <IdeaGenerator />
        <Coverage />
        <Credentials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
