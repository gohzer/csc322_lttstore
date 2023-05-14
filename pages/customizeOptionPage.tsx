import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '@/styles/customizeOptionPage.module.css';
import Head from 'next/head';
import Navbar from './navbars';
import Footer from './footer';
import { getAllComputerParts } from '@/utils/database';


const cpuComponents = {
  'Intel Core i7': {
    compatibleGPUs: ['Nvidia RTX 3080'],
    compatibleSSDs: ['Samsung 980 evo 512GB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'Intel Core i3': {
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro']
  },
  'Intel Core i5': {
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB'],
    compatibleMotherboards: ['MSI B560M Pro']
  },
  'Intel Core i9': {
    compatibleGPUs: ['Nvidia RTX 3080', 'Nvidia RTX 3070', 'Nvidia RTX 3090'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB', 'Samsung 980 evo 1TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro']
  },
  'AMD Ryzen 5': {
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'AMD Ryzen 7': {
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'AMD Ryzen 9': {
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  }
};

// console.log(cpuComponents['Intel Core i7'].compatibleSSDs);


const gpuComponents = {
  'Nvidia RTX 3080': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i9'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'Nvidia RTX 3070': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro']
  },
  'Nvidia RTX 3090': {
    compatibleCPUs: ['Intel Core i9'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB', 'Samsung 980 evo 1TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro']
  }
};


const ramComponents = {
  'Crucial Ballistix 32GB': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'Crucial Ballistix 64GB': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  },
  'Crucial Ballistix 16GB': {
    compatibleCPUs: ['Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS']
  }
};


const motherboardComponents = {
  'MSI B550 GAMING PLUS': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB']
  },
  'MSI B560M Pro': {
    compatibleCPUs: ['Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleSSDs: ['Samsung 980 evo 512GB', 'Samsung 980 evo 2TB'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB']
  }
};


const ssdComponents = {
  'Samsung 980 evo 512GB': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB']
  },
  'Samsung 980 evo 2TB': {
    compatibleCPUs: ['Intel Core i7', 'Intel Core i3', 'Intel Core i5', 'Intel Core i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'AMD Ryzen 9'],
    compatibleGPUs: ['Nvidia RTX 3070'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB']
  },
  'Samsung 980 evo 1TB': {
    compatibleCPUs: ['Intel Core i9'],
    compatibleGPUs: ['Nvidia RTX 3080', 'Nvidia RTX 3070', 'Nvidia RTX 3090'],
    compatibleMotherboards: ['MSI B550 GAMING PLUS', 'MSI B560M Pro'],
    compatiblePSUs: ['Corsair 900W PSU'],
    compatibleRAM: ['Crucial Ballistix 32GB', 'Crucial Ballistix 64GB', 'Crucial Ballistix 16GB']
  }
};







interface ComponentItem {
  name: string;
  image: string;
  cost: number;
  type: string;
}

const CustomizeOptionPage = () => {
  const router = useRouter();
  const { component: componentType } = router.query;

  const returnCompatibleComponents = (
    filteredParts: ComponentItem[],
    selectedComponents: { [key: string]: ComponentItem },
    currentComponentType: string
  ) => {
    let list: ComponentItem[] = [];
  
    if (currentComponentType === 'cpu') {
      for (let i = 0; i < filteredParts.length; i++) {
        let cpu = filteredParts[i].name;
        let selectedGpu = selectedComponents.gpu.name;
        let selectedRam = selectedComponents.ram.name;
        let selectedSsd = selectedComponents.ssd.name;
        let selectedMobo = selectedComponents.mobo.name;
  
        // Check if each component is not selected or included in the compatibility list
        if (
          (!selectedGpu || cpuComponents[cpu as keyof typeof cpuComponents].compatibleGPUs.includes(selectedGpu)) &&
          (!selectedRam || cpuComponents[cpu as keyof typeof cpuComponents].compatibleRAM.includes(selectedRam)) &&
          (!selectedSsd || cpuComponents[cpu as keyof typeof cpuComponents].compatibleSSDs.includes(selectedSsd)) &&
          (!selectedMobo || cpuComponents[cpu as keyof typeof cpuComponents].compatibleMotherboards.includes(selectedMobo))
        ) {
          list.push(filteredParts[i]);
        }
      }
    } else if (currentComponentType === 'ssd') {
      for (let i = 0; i < filteredParts.length; i++) {
        let ssd = filteredParts[i].name;
        let selectedCpu = selectedComponents.cpu.name;
        let selectedGpu = selectedComponents.gpu.name;
        let selectedRam = selectedComponents.ram.name;
        let selectedMobo = selectedComponents.mobo.name;
  
        // Check if each component is not selected or included in the compatibility list
        if (
          (!selectedCpu || ssdComponents[ssd as keyof typeof ssdComponents].compatibleCPUs.includes(selectedCpu)) &&
          (!selectedGpu || ssdComponents[ssd as keyof typeof ssdComponents].compatibleGPUs.includes(selectedGpu)) &&
          (!selectedRam || ssdComponents[ssd as keyof typeof ssdComponents].compatibleRAM.includes(selectedRam)) &&
          (!selectedMobo || ssdComponents[ssd as keyof typeof ssdComponents].compatibleMotherboards.includes(selectedMobo))
        ) {
          list.push(filteredParts[i]);
        }
      }
    } 
    
    else if (currentComponentType === 'ram') {
      for (let i = 0; i < filteredParts.length; i++) {
        let ram = filteredParts[i].name;
        let selectedCpu = selectedComponents.cpu.name;
        let selectedGpu = selectedComponents.gpu.name;
        let selectedSsd = selectedComponents.ssd.name;
        let selectedMobo = selectedComponents.mobo.name;
    
        // Check if each component is not selected or included in the compatibility list
        if (
          (!selectedCpu || ramComponents[ram as keyof typeof ramComponents].compatibleCPUs.includes(selectedCpu)) &&
          (!selectedGpu || ramComponents[ram as keyof typeof ramComponents].compatibleGPUs.includes(selectedGpu)) &&
          (!selectedSsd || ramComponents[ram as keyof typeof ramComponents].compatibleSSDs.includes(selectedSsd)) &&
          (!selectedMobo || ramComponents[ram as keyof typeof ramComponents].compatibleMotherboards.includes(selectedMobo))
        ) {
          list.push(filteredParts[i]);
        }
      }
    }
    else if (currentComponentType === 'gpu') {
      for (let i = 0; i < filteredParts.length; i++) {
        let gpu = filteredParts[i].name;
        let selectedCpu = selectedComponents.cpu.name;
        let selectedRam = selectedComponents.ram.name;
        let selectedSsd = selectedComponents.ssd.name;
        let selectedMobo = selectedComponents.mobo.name;
    
        // Check if each component is not selected or included in the compatibility list
        if (
          (!selectedCpu || gpuComponents[gpu as keyof typeof gpuComponents].compatibleCPUs.includes(selectedCpu)) &&
          (!selectedRam || gpuComponents[gpu as keyof typeof gpuComponents].compatibleRAM.includes(selectedRam)) &&
          (!selectedSsd || gpuComponents[gpu as keyof typeof gpuComponents].compatibleSSDs.includes(selectedSsd)) &&
          (!selectedMobo || gpuComponents[gpu as keyof typeof gpuComponents].compatibleMotherboards.includes(selectedMobo))
        ) {
          list.push(filteredParts[i]);
        }
      }
    }


    else if (currentComponentType === 'mobo') {
      for (let i = 0; i < filteredParts.length; i++) {
        let mobo = filteredParts[i].name;
        let selectedCpu = selectedComponents.cpu.name;
        let selectedRam = selectedComponents.ram.name;
        let selectedSsd = selectedComponents.ssd.name;
        let selectedGpu = selectedComponents.gpu.name;
    
        // Check if each component is not selected or included in the compatibility list
        if (
          (!selectedCpu || motherboardComponents[mobo as keyof typeof motherboardComponents].compatibleCPUs.includes(selectedCpu)) &&
          (!selectedRam || motherboardComponents[mobo as keyof typeof motherboardComponents].compatibleRAM.includes(selectedRam)) &&
          (!selectedSsd || motherboardComponents[mobo as keyof typeof motherboardComponents].compatibleSSDs.includes(selectedSsd)) &&
          (!selectedGpu || motherboardComponents[mobo as keyof typeof motherboardComponents].compatibleGPUs.includes(selectedGpu))
        ) {
          list.push(filteredParts[i]);
        }
      }
    }

    else if (currentComponentType === 'psu' || currentComponentType === 'case') {
      // For PSU and case, we don't need to check compatibility
      list = filteredParts;
    }
  
    console.log(list);
    return list;
  };
  
  
  


  

  const onSelectComponent = (item: ComponentItem) => {
    let selectedComponents = localStorage.getItem('selectedComponents');
    if (selectedComponents && typeof componentType === 'string') {
      let parsedComponents = JSON.parse(selectedComponents);
      parsedComponents[componentType] = item;
      localStorage.setItem('selectedComponents', JSON.stringify(parsedComponents));
      router.push(`/buildPC`);
    }
  };

  const [componentItems, setComponentItems] = useState<ComponentItem[]>([]);

  useEffect(() => {
    const fetchParts = async () => {
      if (typeof componentType === 'string') {
        let parts = await getAllComputerParts();
        console.log("parts test", parts);
        let filteredParts = parts.filter((part) => part.type === componentType.toLowerCase());
        //console.log(filteredParts[0].name);
        console.log("Filtered parts:", filteredParts);

        let selectedComponents = localStorage.getItem('selectedComponents') as string | null;
        //console.log(selectedComponents['cpu']);
        console.log(selectedComponents);

        if (selectedComponents === null || selectedComponents === JSON.stringify({cpu:{},ram:{},mobo:{},gpu:{},ssd:{},case:{},psu:{}})) {
          
          console.log("Filtered parts:", filteredParts);

          setComponentItems(filteredParts);
          //return;
          // Or you can assign a default value to selectedComponents:
          // selectedComponents = JSON.stringify({cpu: {}, gpu: {}, ssd: {}});
        }
        
        else {
        let parsedComponents = JSON.parse(selectedComponents);
        console.log(parsedComponents.ssd.name);
        let PARTS = returnCompatibleComponents(filteredParts, parsedComponents, componentType);

        console.log("Compatible parts:", PARTS); // Add this line to log the results
        setComponentItems(PARTS);
        }
      }
    };

    fetchParts();
  }, [componentType]);

  return (
    <>
      <Head>
        <title>Customize | MacroCenter</title>
      </Head>
      <Navbar />
      <h1>
        &nbsp;Welcome to the Macrocenter!&nbsp; Customize your {componentType}.
      </h1>

      <div className={styles.container}>
        <h1>&nbsp;Please choose your {componentType}:&nbsp;</h1>
        <div className={styles.grid}>
          {componentItems.map((item, index) => (
            <div className={styles.gridItem} key={index}>
              <div className={styles.component}>
                <h2 className={styles.name}>{item.name}</h2>
                <img src={item.image} alt={item.name} className={styles.image} />
                <h3>${item.cost}</h3>
              </div>
              <button className={styles.selectButton} onClick={() => onSelectComponent(item)}>
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );

          };

export default CustomizeOptionPage;
