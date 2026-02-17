import React, { useState } from 'react';
import LogoFiirbots from './components/logo_fiirbots';
import LogoSTIM from './components/logo_stim';
import './App.css';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const calculateTimeProgress = () => {
    const today = new Date();
    const currentYear = today.getFullYear();

    // Data de start: 1 Ianuarie (începutul perioadei fiscale)
    const startDate = new Date(currentYear, 0, 1);
    // Data limită: 25 Mai (Luna este indexată de la 0, deci 4 = Mai)
    const deadline = new Date(currentYear, 4, 25);

    const totalDuration = deadline - startDate;
    const timeElapsed = today - startDate;

    // Calculăm procentul de timp scurs
    let percentage = (timeElapsed / totalDuration) * 100;

    // Limităm procentul între 0 și 100
    percentage = Math.max(0, Math.min(100, percentage));

    // Calculăm zilele rămase
    const oneDay = 24 * 60 * 60 * 1000;
    const daysLeft = Math.ceil((deadline - today) / oneDay);

    return { percentage, daysLeft, isExpired: daysLeft < 0 };
  };

  const timeStatus = calculateTimeProgress();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData; // Subject poate fi dedus sau adăugat în UI
    const finalSubject = subject || `Mesaj nou de la ${name}`;

    if (!name || !email || !message) {
      alert('Toate câmpurile sunt obligatorii.');
      return;
    }

    const mailtoLink = `mailto:contact@stim-ong.ro?subject=${encodeURIComponent(finalSubject)}&body=${encodeURIComponent(
      `Nume: ${name}\nEmail: ${email}\n\nMesaj:\n${message}`
    )}`;
    window.location.href = mailtoLink;

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Datele membrilor board-ului
  const boardMembers = [
    { name: 'Cristiana Cazacu', role: 'Președinte', desc: 'Profesor în cadrul FIIR Departamentul RSP', email: 'cristiana.cazacu@stim-ong.ro', image: 'https://i1.rgstatic.net/ii/profile.image/11431281230335305-1710896832658_Q512/Carmen-Cristiana-Cazacu.jpg' },
    { name: 'Mihail Hanga', role: 'Vicepreședinte Monitorizare Activități', desc: 'FIIR-UNSTPB', email: 'mihail.hanga@stim-ong.ro', image: 'https://media.licdn.com/dms/image/v2/D4D03AQFdtgtLJRPYNQ/profile-displayphoto-shrink_400_400/B4DZdemV7MH4Ag-/0/1749638799828?e=1772668800&v=beta&t=lh57gdYtzD5nXwXtkKOr1FzDSVvL8F_0G-gcZPcaA-w' },
    { name: 'Ștefan Cula', role: 'Vicepreședinte Educație și Formare', desc: 'FIIR-UNSTPB', email: 'stefan.cula@stim-ong.ro', image: 'https://dropinblog.net/cdn-cgi/image/fit=scale-down,width=600/34254246/authors/WhatsApp%20Image%202025-03-18%20at%2015.10.47.jpeg' },
    { name: 'Delia Gheorghe Naftaila', role: 'Vicepreședinte Logistic', desc: 'FIIR-UNSTPB', email: 'delia.gheorghe@stim-ong.ro', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzwV3FxVE70-BZZC5BJ-37X_gzTPj4OrepLg&s' },
  ];

  const projects = [
    { title: 'Clubul de Inventică și Robotică de la Școala Gimnazială Nr. 2 din Chitila', category: 'EDUCAȚIE', desc: 'Ne-am propus să oferim un cadru de învățare aplicată, unde conceptele STEAM prind formă prin proiecte tehnice reale.', image: 'https://media.licdn.com/dms/image/v2/D4D22AQEM-RUXh8PN7Q/feedshare-shrink_1280/B4DZxslakYHAAg-/0/1771348273678?e=1772668800&v=beta&t=Nezco-C3XPoE2ZeesLLZySrmNUWjlORafVzcJSD0aWQ', available: true, link: 'https://ro.linkedin.com/posts/%C8%99tim-noi-suntem-viitorul_stim-fiirbots-steam-activity-7429573161530236928-7Fuu?utm_source=li_share&utm_content=feedcontent&utm_medium=g_dt_web&utm_campaign=copy' },
    { title: 'Proiect Nou 2026', category: 'VIITOR', desc: 'Pregătim ceva special pentru comunitatea noastră.', image: null, available: false },
  ];

  return (
    <div className="bg-[#FEF9EF] dark:bg-[#0B1120] text-gray-800 dark:text-gray-200 transition-colors duration-300 font-sans">

      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 start-0 bg-white/90 dark:bg-[#15253E]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#home" className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="w-10 h-10 bg-[#5D3FD3] rounded-lg flex items-center justify-center text-white font-display font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform overflow-hidden">
              <LogoSTIM />
            </div>
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white font-display tracking-wide">STIM</span>
          </a>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="#contact" className="text-white bg-[#5D3FD3] hover:bg-[#4b32b0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-6 py-2.5 text-center transition-all shadow-md transform hover:scale-105">
              Contact
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li>
                <a href="#home" className="block py-2 px-3 text-white bg-[#5D3FD3] rounded md:bg-transparent md:text-[#5D3FD3] md:p-0" aria-current="page">Acasă</a>
              </li>
              <li>
                <a href="#about" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5D3FD3] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b-2 border-transparent hover:border-[#5D3FD3] transition-all">Despre</a>
              </li>
              <li>
                <a href="#fiirbots" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5D3FD3] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b-2 border-transparent hover:border-[#5D3FD3] transition-all">FIIRBots</a>
              </li>
              <li>
                <a href="#projects" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5D3FD3] md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent border-b-2 border-transparent hover:border-[#5D3FD3] transition-all">Proiecte</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 overflow-hidden bg-[#15253E] dark:bg-[#0B1120]">
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#5D3FD3 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-extrabold font-display leading-tight text-white">
              Noi suntem <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#5D3FD3]">viitorul STIM!</span>
            </h1>
            <p className="text-lg text-gray-300 md:max-w-xl mx-auto lg:mx-0 font-light">
              Construim viitorul prin educație inovatoare, conectând știința, tehnologia, ingineria, artele și matematica pentru a inspira următoarea generație de lideri.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <a href="#about" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white rounded-full bg-gradient-to-r from-[#5D3FD3] to-purple-600 hover:from-[#4b32b0] hover:to-purple-700 shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-1">
                Descoperă mai mult
                <span className="material-icons ml-2 text-sm">arrow_forward</span>
              </a>
              <a href="#projects" className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-white border border-gray-600 rounded-full hover:bg-white/10 transition-all">
                Vezi proiecte
              </a>
            </div>
          </div>

          <div className="relative lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            <img src="https://lh3.googleusercontent.com/fife/ALs6j_G6ox43PrfHAc_e-6zr0r4-pBsrsqVmoX1R5Cp07bVHA4A02CAktoFHrb-Ob3STgeCZFcMBrZEFGTE_oSDN3VEroMAEpDdHbmsnflsCMRrjRNODHCpCMF_mBkWf0yBhIXa3rLR_VmdoFcjL0V7coEwAnxVpXLtLb4ZxNXZomipvYNJfVWy8mDA7lvFh6VXWjteCmVubGAo_Kghkb-DobLuOjUR_JirFx9-BMbh-iy57bWTSVqhBWsjXq2-ruV-8fy5dUHlgLdUrFZYtlUopXtdySolyxdPl5TFjVw_M8e7t2ouuvPKYzyG7Ypl-lqlF_YTWNyZR_WSK8cRsob--Qs95NVEwk7993ReJhOtP7_3Q02UGl22YzPNkDUP8PM5mii0PmF5qtmCIaXzLJUtCAov4660qi4xaQk8NOi09aNPVdg817jo4OI4ZuvO08SA6XKu1qM-wgB0H0o_ld8sSu5l2gzv-l1z0va3YzT2jHh1Ap5LpKDyWW8za3BznCGqVzOCODHzQE1uLhaRehAMjAkP2-x5TguDX1PIZ8WUsKTzddJ8vCKxMi7VqXkd0HajPw1zBUI1QdXCZLHmHkYF20fS17svrCMRARwhYVS4rMQEo_E2zp1A9pbZaFzUgbsylLy5oMkgYktZRn0-kup2BCYB6478QcOAWRll7Ig8vRqTmhz4AJoN4GqCVkS3CFy5WUymkgtRzgGmAdIb_bkPsdK8bLI_KEl9NeRSWc_u7c6O2NqpwtOK4gZmzBW2cCdWoz_ZSFsiZsRCeuK31Cpa-PucTxtcEXjTVgjdEVR-lBbdIr-8_23L7rirFEjb9WyXLwKhyHH6AQxUa4PeNjsKJncHujdZpFjbui1-vcnWRenLSENmj2Rh427khng123m0gWyUICilPWFWZ7jP9uroRhvgnIfK4n13MdGC3I7pRfi6ooxDmJexJ1Vg-XgtK0YFOZePAOrPk4_UuGOp2h05QJ6Iy-Fd-oXq2uPjtyKmtmY3877HmTos8uj-jsZnX-ufx-6I0wUN6nIlKg8MxDTuTee9Z7ccLfibYXfufy5XekobEIAlchDpDtOKuM1E9F4_IyhpaL5msyXhbTcQ-5e1LXTrN-ZBxdy_faiuy8n8GxU1z9DZuAVnknXsRyezg4q4PsU1UAVzbvciG7y0-_2aBdOitYq7o3l5ZC0xxxKe2jpyzJXCsd-hEZsLel3foTpVXsQOmC-JBzEG2Thf4GAPL4MbPIL3-T8XHA8tUygmFOKcuE5L5HjihXklB9YvtnhXoPdM7Aw14blKJiYVWTA38Hoaucqmj9SKcyi8-GeG3CVZOhWdNw2gpu7OIuoHPDb4Gj4jVdmZW5d64KEz4YjRIOsoUVq0hELMKxmPbPk79INxEASe6Ub1BqPhFPJn_JgngUekOh04BRNeZ8dyFjQ-P5V80RvpMWBUykyZSYpABRNJuSXwWHnOJh-rqaZkQMfQS8mg8iy-b66ASe5wRgvxTD572RH3ONLVaGRiRUlxOzQEw-yzlNCmNJFBU0EjvwMH-l0gIOW4DSzMLaxlOlSXxvqh7RNcOBF4DecWCQ_X_NnJqSBve52Rt_Fgff5x62uH3iv1gGeMQX37H1WsHEZmSH4wyRiZrawHnsgjO529uwoiJRj_9l7I7R7uHczTsEEAopPMm9efTJM100i276wiw4MvsBw9zbwhg7OL-td3WucmPlGCTzw=w1912-h924?auditContext=prefetch" alt="STIM Hero" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-1 bg-[#5D3FD3] text-xs font-bold uppercase rounded tracking-wider">Comunitate</span>
              </div>
              <p className="font-medium">Facultatea de Inginerie Industrială și Robotică</p>
            </div>
          </div>
        </div>

        {/* Ambient Lights */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#5D3FD3] blur-[120px] opacity-20 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 blur-[150px] opacity-10 rounded-full pointer-events-none"></div>
      </section>

      {/* Formular 230 Section */}
      <section className="relative -mt-10 z-20 px-4 mb-20">
        <div className="max-w-4xl mx-auto bg-white/10 dark:bg-[#15253E]/60 backdrop-blur-lg border border-white/20 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-[#89CFF0]/20 text-[#89CFF0] text-xs font-bold uppercase tracking-widest mb-2">Impact Social</div>
              <h3 className="text-2xl font-bold font-display text-gray-900 dark:text-white">Formularul 230</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Susține educația gratuit. Redirecționează 3.5% din impozitul pe venit. Durează doar 1 minut și nu te costă nimic.</p>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-2 relative overflow-hidden border border-gray-300 dark:border-gray-600">
                {/* Bara de progres (Timpul scurs) */}
                <div
                  className={`h-full rounded-full flex items-center justify-end pr-2 text-[10px] text-white font-bold transition-all duration-1000 ${timeStatus.daysLeft < 10 ? 'bg-red-500' : 'bg-gradient-to-r from-blue-400 to-[#5D3FD3]'
                    }`}
                  style={{ width: `${timeStatus.percentage}%` }}
                >
                  {/* Afișăm o iconiță de ceas dacă bara e suficient de lată */}
                  {timeStatus.percentage > 10 && <span className="material-icons text-[10px] mr-1 animate-pulse">schedule</span>}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs font-medium">
                {timeStatus.isExpired ? (
                  <span className="text-red-500 font-bold w-full text-center">Campania de anul acesta s-a încheiat</span>
                ) : (
                  <>
                    <span className="text-gray-500 dark:text-gray-400">
                      Azi, {new Date().toLocaleDateString('ro-RO')}
                    </span>

                    <span className={`${timeStatus.daysLeft < 10 ? 'text-red-500 font-bold' : 'text-[#5D3FD3]'}`}>
                      {timeStatus.daysLeft} zile rămase (25 Mai)
                    </span>
                  </>
                )}
              </div>

              {/* <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                <div className="bg-gradient-to-r from-blue-400 to-[#5D3FD3] h-2.5 rounded-full" style={{width: '65%'}}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Obiectiv atins: 65%</span>
                <span>Țintă: 500 formulare</span>
              </div> */}
            </div>
            <div className="flex-shrink-0">
              <a href="https://formular230.ro/asociatia-stim-noi-suntem-viitorul" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white rounded-xl bg-gradient-to-br from-[#5D3FD3] to-indigo-600 hover:from-[#4b32b0] hover:to-indigo-700 shadow-lg shadow-indigo-500/40 transition-all transform hover:scale-105">
                Completează Formularul
                <span className="material-icons ml-2">assignment</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Despre Section */}
      <section id="about" className="py-20 bg-[#FEF9EF] dark:bg-[#0B1120]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 tech-border inline-block pb-4">Despre Asociația STIM</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-display text-[#5D3FD3]">Misiunea Noastră</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                STIM este o asociație non-profit dedicată promovării educației STEAM în România. Credem că viitorul aparține celor care înțeleg și aplică principiile științei, tehnologiei, ingineriei, artelor și matematicii într-un mod integrat și inovator.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Prin programele noastre, conectăm studenții cu industria, oferim oportunități de dezvoltare practică și construim o comunitate diversă și incluzivă.
              </p>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-indigo-100 dark:bg-[#5D3FD3]/20 p-6 rounded-xl text-center border border-indigo-200 dark:border-[#5D3FD3]/30">
                  <span className="block text-3xl font-bold text-[#5D3FD3] mb-1">50+</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Studenți implicați</span>
                </div>
                {/* <div className="bg-blue-100 dark:bg-blue-900/20 p-6 rounded-xl text-center border border-blue-200 dark:border-blue-800/30">
                  <span className="block text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">10+</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">Proiecte realizate</span>
                </div> */}
              </div>
            </div>
            <div className="bg-white dark:bg-[#15253E] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-6">Valorile Noastre</h3>
              <ul className="space-y-4">
                {['Interdisciplinaritate', 'Inovație și creativitate', 'Educație de calitate', 'Diversitate și incluziune', 'Impact social pozitiv'].map((val, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#89CFF0]"></span>
                    <span className="text-gray-700 dark:text-gray-200">{val}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Board Section */}
      <section className="py-20 bg-gray-50 dark:bg-[#0f1926]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4">Board-ul Asociației</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">Echipa de conducere care ghidează viziunea și strategia asociației noastre</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {boardMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-[#15253E] rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group text-center">
                <div className="relative w-24 h-24 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#5D3FD3] to-blue-400 p-1">
                    {member.image ? (
                      <img src={member.image} alt={member.name} className="rounded-full w-full h-full object-cover border-2 border-white dark:border-[#15253E]" />
                    ) : (
                      <div className="rounded-full w-full h-full bg-gray-300 flex items-center justify-center text-xl font-bold">{member.initials}</div>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold font-display text-gray-900 dark:text-white mb-1 group-hover:text-[#5D3FD3] transition-colors">{member.name}</h3>
                <p className="text-sm font-semibold text-[#5D3FD3] mb-3">{member.role}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{member.desc}</p>
                <a href={`mailto:${member.email}`} className="text-xs text-gray-400 hover:text-[#5D3FD3] transition-colors block mt-2 break-all">{member.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIIRBots Section */}
      <section id="fiirbots" className="py-20 bg-[#FEF9EF] dark:bg-[#0B1120] overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 tech-border inline-block pb-4">Echipa FIIRBots</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4">Susținem studenții pasionați din echipa de robotica FIIRBots!</p>
            <a href="https://fiirbots.ro" target="_blank" rel="noopener noreferrer" className="inline-block mt-2 text-[#5D3FD3] hover:text-[#4b32b0] font-medium">Vizitează site-ul echipei FIIRBots</a>
          </div>

          <div className="relative py-12 flex justify-center items-center">
            {/* Logo Container cu efecte */}
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 bg-[#5D3FD3]/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="transform hover:scale-110 transition-transform duration-500">
                  <LogoFiirbots />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50 dark:bg-[#0f1926]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 tech-border inline-block pb-4">Proiectele Noastre</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4">Inovații care conectează educația cu tehnologia viitorului</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {projects.map((project, index) => (
              <div key={index} className="flex-none w-80 md:w-96 bg-white dark:bg-[#15253E] rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group">
                <div className={`h-48 overflow-hidden relative ${!project.image ? 'flex items-center justify-center bg-gray-200 dark:bg-gray-800' : ''}`}>
                  {project.image ? (
                    <>
                      <div className="absolute inset-0 bg-[#5D3FD3]/20 group-hover:bg-[#5D3FD3]/0 transition-colors z-10"></div>
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                    </>
                  ) : (
                    <span className="text-gray-400 font-display text-lg">COMING SOON</span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-[#89CFF0] uppercase tracking-wider mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold font-display text-gray-900 dark:text-white mb-3">{project.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{project.desc}</p>

                  {project.available ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[#5D3FD3] font-semibold text-sm hover:underline flex items-center">
                      Detalii
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </a>
                  ) : (
                    <span className="text-gray-400 font-semibold text-sm cursor-not-allowed flex items-center">Indisponibil</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#FEF9EF] dark:bg-[#0B1120] relative">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-display text-gray-900 dark:text-white mb-4 tech-border inline-block pb-4">Contactează-ne</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mt-4">Hai să construim împreună viitorul educației STEAM în România</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-[#15253E] p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Trimite-ne un mesaj</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="name">Nume complet</label>
                  <input
                    type="text" name="name" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5D3FD3] focus:border-[#5D3FD3] block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Numele tău"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
                  <input
                    type="email" name="email" id="email" required
                    value={formData.email} onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5D3FD3] focus:border-[#5D3FD3] block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="nume@exemplu.com"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="subject">Subiect</label>
                  <input
                    type="text" name="subject" id="subject" required
                    value={formData.subject} onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#5D3FD3] focus:border-[#5D3FD3] block w-full p-3 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Subiectul mesajului"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="message">Mesaj</label>
                  <textarea
                    name="message" id="message" rows="4" required
                    value={formData.message} onChange={handleChange}
                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Scrie mesajul tău aici..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full text-white bg-[#5D3FD3] hover:bg-[#4b32b0] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-colors">
                  Trimite mesajul
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Informații de contact</h3>

              <div className="flex items-start space-x-4">
                <div className="bg-[#5D3FD3]/10 p-3 rounded-lg text-[#5D3FD3]">
                  <span className="material-icons">email</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:contact@stim-ong.ro" className="text-gray-600 dark:text-gray-400 hover:text-[#5D3FD3] transition-colors">contact@stim-ong.ro</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#5D3FD3]/10 p-3 rounded-lg text-[#5D3FD3]">
                  <span className="material-icons">assignment_turned_in</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Formular 230</h4>
                  <a href="https://formular230.ro/asociatia-stim-noi-suntem-viitorul" className="text-gray-600 dark:text-gray-400 hover:text-[#5D3FD3] transition-colors break-all text-sm">
                    https://formular230.ro/asociatia-stim-noi-suntem-viitorul
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-[#5D3FD3]/10 p-3 rounded-lg text-[#5D3FD3]">
                  <span className="material-icons">share</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Social Media</h4>
                  <div className="flex space-x-4 mt-2">
                    <a href="https://linkedin.com/company/asociatiastim" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors">
                      <span className="font-display font-bold">in</span>
                    </a>
                    <a href="https://instagram.com/asociatiastim" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition-colors">
                      <span className="font-display font-bold">ig</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-[#15253E] rounded-xl text-white relative overflow-hidden">
                <div className="relative z-10 flex items-center space-x-3">
                  <div className="w-10 h-10 border-2 border-white rounded flex items-center justify-center font-display font-bold">
                    <LogoSTIM />
                  </div>
                  <span className="font-bold font-display text-lg">STIM - Noi suntem viitorul</span>
                </div>
                <div className="absolute right-0 bottom-0 opacity-10">
                  <svg height="100" viewBox="0 0 100 100" width="100">
                    <path d="M0 100 L100 0 L100 100 Z" fill="white"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#15253E] dark:bg-[#0B1120] text-gray-300 py-12 border-t border-gray-700">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <a href="#home" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 border border-white rounded flex items-center justify-center text-white font-display font-bold text-lg overflow-hidden">
                  <LogoSTIM />
                </div>
                <span className="text-xl font-bold text-white font-display">STIM</span>
              </a>
              <p className="text-sm text-gray-400 mb-4">
                Construim viitorul prin educație STEAM inovatoare și incluzivă pentru toți tinerii din România.
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-display">Linkuri rapide</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-[#5D3FD3] transition-colors">Despre noi</a></li>
                <li><a href="#fiirbots" className="hover:text-[#5D3FD3] transition-colors">Echipa FIIRBots</a></li>
                <li><a href="#projects" className="hover:text-[#5D3FD3] transition-colors">Proiecte</a></li>
                <li><a href="#contact" className="hover:text-[#5D3FD3] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-display">Proiecte</h3>
              <ul className="space-y-2 text-sm">
                {projects.map((p, i) => (
                  <li key={i}>
                    {p.available ? (
                      <a href="#projects" className="hover:text-[#5D3FD3] transition-colors">{p.title}</a>
                    ) : (
                      <span className="text-gray-500 cursor-default">{p.title} (Curând)</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 font-display">Urmărește-ne</h3>
              <div className="flex space-x-3">
                <a href="https://linkedin.com/company/asociatiastim" className="w-8 h-8 rounded-full bg-[#5D3FD3]/20 hover:bg-[#5D3FD3] flex items-center justify-center text-white transition-colors">
                  <span className="font-xs font-bold">in</span>
                </a>
                <a href="https://instagram.com/asociatiastim" className="w-8 h-8 rounded-full bg-[#5D3FD3]/20 hover:bg-[#5D3FD3] flex items-center justify-center text-white transition-colors">
                  <span className="font-xs font-bold">ig</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-xs text-gray-500">
            <p>© 2026 STIM - Noi suntem viitorul. Toate drepturile rezervate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;