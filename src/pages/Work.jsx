import SelectedSystems from '../components/sections/SelectedSystems'
import OperationalScale from '../components/sections/OperationalScale'
import CurrentWork from '../components/sections/CurrentWork'

export default function Work() {
  return <main id="main-content" tabIndex={-1} className="work-page">
    <header className="work-intro"><p className="eyebrow">Engineering practice</p><h1>Work that informs<br />the writing.</h1><p>Cloud infrastructure, automation, and platform reliability across AWS and Azure.</p><div className="brief-links"><a className="read-link" href="/#contact">Get in touch ↗</a><a className="read-link" href="/Sai_Ritwik_reddy_resume.pdf">View résumé ↗</a></div></header>
    <SelectedSystems /><OperationalScale /><CurrentWork />
  </main>
}
