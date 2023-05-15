
/* Next todo: need to make the compatbility test*/
import styles from '@/styles/buildPC.module.css';
import Navbar from './navbars';
import Head from 'next/head';
import Footer from './footer';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addComputer } from '@/utils/database';

interface Component {
  name: string;
  image: string;
  cost: number;
}

const defaultComponents: { [key: string]: any } = {
  cpu: {} as Component,
  ram: {} as Component,
  mobo: {} as Component,
  gpu: {} as Component,
  ssd: {} as Component,
  case: {} as Component,
  psu: {} as Component,
};

export default function BuildPC() {
  const router = useRouter();
  const [employee, setEmployee] = useState();

  const [components, setComponents] = useState<typeof defaultComponents>(() => {
    if (typeof window !== 'undefined') {
      const savedComponents = localStorage.getItem('selectedComponents');
      return savedComponents ? JSON.parse(savedComponents) : defaultComponents;
    }
    return defaultComponents;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedComponents', JSON.stringify(components));
    }
  }, [components]);

  useEffect(() => {
    const clearSelectedComponents = () => {
      localStorage.removeItem('selectedComponents');
    };

    window.addEventListener('beforeunload', clearSelectedComponents);

    return () => {
      window.removeEventListener('beforeunload', clearSelectedComponents);
    };
  }, []);

  const handleClearSelection = () => {
    setComponents(defaultComponents);
    localStorage.removeItem('selectedComponents');
  };

  const handleComputerSubmit = () => {
    // check that all components are selected
    for(const property in components) {
      let item = components[property];
      if(!item.hasOwnProperty('cost')) {
        console.log("violation")
        return
      }
    }
    console.log("valid PC! adding...")
    addComputer(
      components.cpu.id.replaceAll(/\s/g,''),
      components.mobo.id.replaceAll(/\s/g,''),
      components.ram.id.replaceAll(/\s/g,''),
      components.gpu.id.replaceAll(/\s/g,''),
      components.case.id.replaceAll(/\s/g,''),
      components.psu.id.replaceAll(/\s/g,''),
      components.ssd.id.replaceAll(/\s/g,'')
    ).then(() => {
      router.push("/")
    })
  }

  return (
    <>
      <Head>
        <title>Build | MacroCenter</title>
      </Head>
      <Navbar />
      <h1 className={styles.title}>Welcome to the Macrocenter! Build your PC here.</h1>
      <div className={styles.container}>
        <h1>Please choose your component:</h1>
        <div className={styles.grid}>
          {Object.entries(components).map(([type, component]: [string, Component], index) => (
            <div className={styles.gridItem} key={index}>
              <h2>{type.toUpperCase()}</h2>
              {component.name ? (
                <div className={styles.component}>
                  <img src={component.image} alt={component.name} className={styles.image} />
                  <h2 className={styles.name}>{component.name}</h2>
                  <h3 className={styles.name}>${component.cost}</h3>
                </div>
              ) : (
                <p>No component selected</p>
              )}
              <button
                className={styles.customizeButton}
                onClick={() => router.push(`/customizeOptionPage?component=${type}`)}
              >
                Customize
              </button>
            </div>
          ))}
          <div className={styles.gridItemSubmit}>
            <button className={styles.customizeButton} onClick={handleClearSelection}>
              Clear Selection
            </button>
            {/* TODO: make this employee only */}
            <button className={styles.customizeButton} onClick={handleComputerSubmit}>
              Add To Main Screen
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

